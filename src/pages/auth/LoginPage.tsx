import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth, DEMO_CREDS } from '@/contexts/AuthContext';

const LoginPage: React.FC = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get('type') === 'admin' ? 'admin' : 'investor';

  const [loginType, setLoginType] = useState<'investor' | 'admin'>(initialType);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await signIn(email, password);
    if (error) {
      setError(typeof error === 'object' && error !== null && 'message' in error ? (error as any).message : 'Invalid credentials. Please try again.');
      setLoading(false);
    } else {
      navigate(loginType === 'admin' ? '/admin' : '/portal');
    }
  };

  const fillDemoCredentials = (type: 'investor' | 'admin') => {
    const creds = type === 'admin' ? DEMO_CREDS.admin : DEMO_CREDS.investor;
    setEmail(creds.email);
    setPassword(creds.password);
    setLoginType(type);
  };

  const handleDemoLogin = async (type: 'investor' | 'admin') => {
    setError('');
    setLoading(true);
    const creds = type === 'admin' ? DEMO_CREDS.admin : DEMO_CREDS.investor;
    const { error } = await signIn(creds.email, creds.password);
    if (error) {
      setError('Demo login failed. Please try again.');
      setLoading(false);
    } else {
      navigate(type === 'admin' ? '/admin' : '/portal');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-20" style={{ backgroundColor: '#0B1121' }}>
      <div className="w-full max-w-lg px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="font-serif text-3xl font-bold text-white italic">Blocs</Link>
          <p className="text-gray-400 mt-2">Sign in to access your account</p>
        </div>

        {/* Login Type Tabs */}
        <div className="flex rounded-xl overflow-hidden mb-6 border" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <button
            onClick={() => setLoginType('investor')}
            className={`flex-1 py-3.5 text-sm font-semibold transition-all ${
              loginType === 'investor'
                ? 'bg-gold/10 text-gold border-b-2 border-gold'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Investor Portal
            </div>
          </button>
          <button
            onClick={() => setLoginType('admin')}
            className={`flex-1 py-3.5 text-sm font-semibold transition-all ${
              loginType === 'admin'
                ? 'bg-red-500/10 text-red-400 border-b-2 border-red-400'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Admin Dashboard
            </div>
          </button>
        </div>

        {/* Login Form */}
        <div className="card-premium p-8">
          <div className="mb-6">
            <h2 className="font-serif text-xl font-bold text-white">
              {loginType === 'investor' ? 'Investor Sign In' : 'Admin Sign In'}
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              {loginType === 'investor'
                ? 'Access your investment portfolio, track returns, and manage your account.'
                : 'Manage projects, users, KYC submissions, and platform settings.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400 flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            )}

            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="input-dark"
                placeholder={loginType === 'investor' ? 'investor@example.com' : 'admin@blocs.mv'}
              />
            </div>

            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="input-dark"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-400">
                <input type="checkbox" className="rounded border-gray-600" /> Remember me
              </label>
              <Link to="/forgot-password" className="text-sm text-gold hover:underline">Forgot password?</Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full !py-3 font-semibold rounded-lg transition-all ${
                loginType === 'admin'
                  ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30'
                  : 'btn-gold'
              }`}
            >
              {loading ? 'Signing in...' : loginType === 'investor' ? 'Sign In to Portal' : 'Sign In as Admin'}
            </button>
          </form>

          {loginType === 'investor' && (
            <p className="text-sm text-gray-400 text-center mt-6">
              Don't have an account? <Link to="/signup" className="text-gold hover:underline">Create Account</Link>
            </p>
          )}
        </div>

        {/* Demo Credentials Section */}
        <div className="mt-6 card-premium p-6" style={{ borderColor: 'rgba(201,169,97,0.15)' }}>
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-sm font-semibold text-gold">Demo Access</h3>
          </div>
          <p className="text-xs text-gray-400 mb-4">Use these sample credentials to explore the platform:</p>

          <div className="space-y-3">
            {/* Investor Demo */}
            <div className="rounded-lg p-4" style={{ backgroundColor: 'rgba(201,169,97,0.06)', border: '1px solid rgba(201,169,97,0.12)' }}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center">
                    <svg className="w-3 h-3 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold text-gold">Investor Portal</span>
                </div>
                <button
                  onClick={() => handleDemoLogin('investor')}
                  className="text-[10px] font-bold text-gold bg-gold/10 hover:bg-gold/20 px-3 py-1.5 rounded-md transition-colors"
                >
                  Quick Login
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-gray-500">Email:</span>
                  <button onClick={() => fillDemoCredentials('investor')} className="ml-1 text-gray-300 hover:text-white font-mono cursor-pointer">
                    {DEMO_CREDS.investor.email}
                  </button>
                </div>
                <div>
                  <span className="text-gray-500">Password:</span>
                  <button onClick={() => fillDemoCredentials('investor')} className="ml-1 text-gray-300 hover:text-white font-mono cursor-pointer">
                    {DEMO_CREDS.investor.password}
                  </button>
                </div>
              </div>
            </div>

            {/* Admin Demo */}
            <div className="rounded-lg p-4" style={{ backgroundColor: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.12)' }}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center">
                    <svg className="w-3 h-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold text-red-400">Admin Dashboard</span>
                </div>
                <button
                  onClick={() => handleDemoLogin('admin')}
                  className="text-[10px] font-bold text-red-400 bg-red-500/10 hover:bg-red-500/20 px-3 py-1.5 rounded-md transition-colors"
                >
                  Quick Login
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-gray-500">Email:</span>
                  <button onClick={() => fillDemoCredentials('admin')} className="ml-1 text-gray-300 hover:text-white font-mono cursor-pointer">
                    {DEMO_CREDS.admin.email}
                  </button>
                </div>
                <div>
                  <span className="text-gray-500">Password:</span>
                  <button onClick={() => fillDemoCredentials('admin')} className="ml-1 text-gray-300 hover:text-white font-mono cursor-pointer">
                    {DEMO_CREDS.admin.password}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
