import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

export interface Profile {
  id: string;
  auth_user_id: string;
  full_name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin' | string;
  membership_tier: string;
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  isDemo: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>;
  isAdmin: boolean;
  isCustomer: boolean;
}

// Demo user profiles
const DEMO_INVESTOR_PROFILE: Profile = {
  id: 'demo-investor-001',
  auth_user_id: 'demo-investor-auth-001',
  full_name: 'Ahmed Rasheed',
  email: 'investor@amanat.mv',
  phone: '+960 7771234',
  role: 'customer',
  membership_tier: 'Gold',
  created_at: '2024-03-15T10:00:00Z',
};

const DEMO_ADMIN_PROFILE: Profile = {
  id: 'demo-admin-001',
  auth_user_id: 'demo-admin-auth-001',
  full_name: 'Ibrahim Waheed',
  email: 'admin@amanat.mv',
  phone: '+960 7775678',
  role: 'admin',
  membership_tier: 'Platinum',
  created_at: '2023-01-10T10:00:00Z',
};

const DEMO_CREDENTIALS = {
  investor: { email: 'investor@amanat.mv', password: 'investor123' },
  admin: { email: 'admin@amanat.mv', password: 'admin123' },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const DEMO_CREDS = DEMO_CREDENTIALS;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);

  // Check for persisted demo session on mount
  useEffect(() => {
    const demoRole = localStorage.getItem('amanat-demo-role');
    if (demoRole === 'customer') {
      setProfile(DEMO_INVESTOR_PROFILE);
      setUser({ id: DEMO_INVESTOR_PROFILE.auth_user_id, email: DEMO_INVESTOR_PROFILE.email } as User);
      setIsDemo(true);
      setLoading(false);
      return;
    }
    if (demoRole === 'admin') {
      setProfile(DEMO_ADMIN_PROFILE);
      setUser({ id: DEMO_ADMIN_PROFILE.auth_user_id, email: DEMO_ADMIN_PROFILE.email } as User);
      setIsDemo(true);
      setLoading(false);
      return;
    }

    // Real Supabase auth
    let mounted = true;

    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!mounted) return;
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          await fetchProfile(session.user.id);
        }
      } catch (e) {
        console.error('Error initializing auth:', e);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    initAuth();

    let subscription: { unsubscribe: () => void } | null = null;
    try {
      const { data } = supabase.auth.onAuthStateChange((_event, session) => {
        if (!mounted) return;
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          fetchProfile(session.user.id);
        } else {
          setProfile(null);
        }
        setLoading(false);
      });
      subscription = data.subscription;
    } catch (e) {
      console.error('Error setting up auth listener:', e);
      if (mounted) setLoading(false);
    }

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('auth_user_id', userId)
        .single();
      if (!error && data) setProfile(data);
    } catch (e) {
      console.error('Error fetching profile:', e);
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } }
      });
      return { error };
    } catch (e) {
      return { error: e };
    }
  };

  const signIn = async (email: string, password: string) => {
    // Check demo credentials first
    if (email === DEMO_CREDENTIALS.investor.email && password === DEMO_CREDENTIALS.investor.password) {
      setProfile(DEMO_INVESTOR_PROFILE);
      setUser({ id: DEMO_INVESTOR_PROFILE.auth_user_id, email: DEMO_INVESTOR_PROFILE.email } as User);
      setIsDemo(true);
      localStorage.setItem('amanat-demo-role', 'customer');
      return { error: null };
    }
    if (email === DEMO_CREDENTIALS.admin.email && password === DEMO_CREDENTIALS.admin.password) {
      setProfile(DEMO_ADMIN_PROFILE);
      setUser({ id: DEMO_ADMIN_PROFILE.auth_user_id, email: DEMO_ADMIN_PROFILE.email } as User);
      setIsDemo(true);
      localStorage.setItem('amanat-demo-role', 'admin');
      return { error: null };
    }

    // Real Supabase auth
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      return { error };
    } catch (e) {
      return { error: e };
    }
  };

  const signOut = async () => {
    if (isDemo) {
      setUser(null);
      setSession(null);
      setProfile(null);
      setIsDemo(false);
      localStorage.removeItem('amanat-demo-role');
      return;
    }
    try {
      await supabase.auth.signOut();
      setProfile(null);
    } catch (e) {
      console.error('Error signing out:', e);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      return { error };
    } catch (e) {
      return { error: e };
    }
  };

  return (
    <AuthContext.Provider value={{
      user, session, profile, loading, isDemo,
      signUp, signIn, signOut, resetPassword,
      isAdmin: profile?.role === 'admin',
      isCustomer: profile?.role === 'customer',
    }}>
      {children}
    </AuthContext.Provider>
  );
};
