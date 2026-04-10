import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const adminNav = [
  { label: 'Overview', path: '/admin', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
  { label: 'Manage Users', path: '/admin/users', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
  { label: 'Manage Projects', path: '/admin/projects', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
  { label: 'Investments', path: '/admin/investments', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { label: 'Transactions', path: '/admin/transactions', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
  { label: 'KYC Review', path: '/admin/kyc', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
  { label: 'Forms & Leads', path: '/admin/forms', icon: 'M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8' },
  { label: 'Content', path: '/admin/content', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
  { label: 'Notifications', path: '/admin/notifications', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' },
  { label: 'Settings', path: '/admin/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
];

const AdminLayout: React.FC = () => {
  const { user, profile, signOut, isAdmin, isDemo } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Allow access if user is admin OR if demo admin
  const hasAccess = user && (isAdmin || (isDemo && profile?.role === 'admin'));

  if (!hasAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0B1121' }}>
        <div className="text-center">
          <h2 className="font-serif text-2xl text-white mb-4">Admin Access Required</h2>
          <p className="text-gray-400 mb-6">You do not have permission to access this area.</p>
          <div className="flex gap-3 justify-center">
            <Link to="/" className="btn-gold">Return Home</Link>
            <Link to="/login?type=admin" className="px-5 py-2.5 rounded-lg text-sm font-semibold border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors">Admin Login</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#0B1121' }}>
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 border-r transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`} style={{ backgroundColor: '#080D1A', borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="flex flex-col h-full">
          <div className="p-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <Link to="/" className="font-serif text-xl font-bold text-white italic">Blocs</Link>
            <p className="text-xs text-red-400 mt-1 font-semibold">Admin Dashboard {isDemo && <span className="text-gold">(Demo)</span>}</p>
          </div>
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            {adminNav.map((item) => (
              <Link key={item.path} to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm mb-1 transition-all ${
                  location.pathname === item.path ? 'bg-white/5 text-gold' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}>
                <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} /></svg>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 text-xs font-bold">
                {(profile?.full_name || 'A').charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white truncate">{profile?.full_name || 'Admin'}</p>
                <p className="text-xs text-gray-500 truncate">{profile?.email}</p>
              </div>
            </div>
            <button onClick={() => { signOut(); navigate('/'); }} className="text-xs text-gray-500 hover:text-white transition-colors">Sign Out</button>
          </div>
        </div>
      </aside>
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}
      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-30 border-b px-4 lg:px-8 h-14 flex items-center justify-between" style={{ backgroundColor: '#0B1121', borderColor: 'rgba(255,255,255,0.06)' }}>
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-400 hover:text-white">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <Link to="/" className="text-xs text-gray-500 hover:text-white transition-colors">Back to Website</Link>
          <div className="flex items-center gap-3">
            <span className="text-xs text-red-400 font-semibold">Admin: {profile?.full_name || profile?.email}</span>
            {isDemo && <span className="text-[10px] bg-red-500/10 text-red-400 px-2 py-0.5 rounded font-semibold">DEMO</span>}
          </div>
        </header>
        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
