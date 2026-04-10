import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { demoInvestments, demoTransactions } from '@/data/demoData';

const PortalDashboard: React.FC = () => {
  const { profile, isDemo } = useAuth();
  const [investments, setInvestments] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [kycStatus, setKycStatus] = useState<string>('not_started');

  useEffect(() => {
    if (isDemo) {
      setInvestments(demoInvestments);
      setTransactions(demoTransactions.slice(0, 5));
      setKycStatus('approved');
      return;
    }
    if (!profile?.id) return;
    supabase.from('investments').select('*, projects(title, expected_return, status)').eq('user_id', profile.id).then(({ data }) => { if (data) setInvestments(data); });
    supabase.from('transactions').select('*').eq('user_id', profile.id).order('created_at', { ascending: false }).limit(5).then(({ data }) => { if (data) setTransactions(data); });
    supabase.from('kyc_submissions').select('status').eq('user_id', profile.id).order('created_at', { ascending: false }).limit(1).then(({ data }) => { if (data?.[0]) setKycStatus(data[0].status); });
  }, [profile?.id, isDemo]);

  const totalInvested = investments.reduce((s, i) => s + (i.amount || 0), 0);
  const expectedReturn = investments.reduce((s, i) => s + (i.expected_return || 0), 0);

  const kycBadge = (status: string) => {
    const map: Record<string, string> = { approved: 'badge-funded', submitted: 'badge-ongoing', under_review: 'badge-ongoing', draft: 'badge-upcoming', rejected: 'bg-red-500/10 text-red-400 px-3 py-1 rounded-full text-xs font-semibold', not_started: 'badge-closed' };
    return <span className={map[status] || 'badge-closed'}>{status.replace('_', ' ')}</span>;
  };

  return (
    <div>
      {/* Demo Banner */}
      {isDemo && (
        <div className="mb-6 rounded-xl p-4 flex items-center gap-3" style={{ backgroundColor: 'rgba(201,169,97,0.08)', border: '1px solid rgba(201,169,97,0.2)' }}>
          <svg className="w-5 h-5 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-gold">You are viewing the <strong>Investor Portal</strong> in demo mode. Data shown is sample data for demonstration purposes.</p>
        </div>
      )}

      {/* Welcome */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-white mb-1">Welcome back, <span className="text-gold">{profile?.full_name || 'Investor'}</span></h1>
        <p className="text-gray-400">Your investor dashboard overview</p>
      </div>

      {/* KPI Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="card-premium p-5">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total Invested</p>
          <p className="font-serif text-2xl font-bold text-white">${totalInvested.toLocaleString()}</p>
        </div>
        <div className="card-premium p-5">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Expected Returns</p>
          <p className="font-serif text-2xl font-bold text-gold">${expectedReturn.toLocaleString()}</p>
        </div>
        <div className="card-premium p-5">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Active Investments</p>
          <p className="font-serif text-2xl font-bold text-white">{investments.length}</p>
        </div>
        <div className="card-premium p-5">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">KYC Status</p>
          <div className="mt-1">{kycBadge(kycStatus)}</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <Link to="/portal/kyc" className="card-premium p-5 group hover:border-gold/30">
          <h3 className="font-serif text-base font-bold text-white group-hover:text-gold transition-colors">Complete KYC</h3>
          <p className="text-xs text-gray-400 mt-1">Verify your identity to unlock full investment access</p>
        </Link>
        <Link to="/projects" className="card-premium p-5 group hover:border-gold/30">
          <h3 className="font-serif text-base font-bold text-white group-hover:text-gold transition-colors">Browse Projects</h3>
          <p className="text-xs text-gray-400 mt-1">Explore available investment opportunities</p>
        </Link>
        <Link to="/portal/membership" className="card-premium p-5 group hover:border-gold/30">
          <h3 className="font-serif text-base font-bold text-white group-hover:text-gold transition-colors">Membership Card</h3>
          <p className="text-xs text-gray-400 mt-1">View your digital investor membership card</p>
        </Link>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Active Investments */}
        <div className="card-premium p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-lg font-bold text-white">Active Investments</h2>
            <Link to="/portal/investments" className="text-xs text-gold hover:underline">View All</Link>
          </div>
          {investments.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-sm">No investments yet</p>
              <Link to="/projects" className="text-sm text-gold hover:underline mt-2 inline-block">Browse Projects</Link>
            </div>
          ) : (
            <div className="space-y-3">
              {investments.slice(0, 4).map(inv => (
                <div key={inv.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <div>
                    <p className="text-sm font-semibold text-white">{inv.projects?.title || 'Investment'}</p>
                    <p className="text-xs text-gray-400">${(inv.amount || 0).toLocaleString()}</p>
                  </div>
                  <span className="text-xs text-gold">{inv.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Transactions */}
        <div className="card-premium p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-lg font-bold text-white">Recent Transactions</h2>
            <Link to="/portal/transactions" className="text-xs text-gold hover:underline">View All</Link>
          </div>
          {transactions.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-sm">No transactions yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {transactions.map(t => (
                <div key={t.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <div>
                    <p className="text-sm font-semibold text-white capitalize">{t.type}</p>
                    <p className="text-xs text-gray-400">{new Date(t.created_at).toLocaleDateString()}</p>
                  </div>
                  <span className={`text-sm font-semibold ${t.type === 'return' ? 'text-green-400' : 'text-white'}`}>${(t.amount || 0).toLocaleString()}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortalDashboard;
