import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { demoUsers, demoKycSubmissions, demoProjects, demoAllInvestments, demoContactSubmissions, demoApplications, demoSupportTickets } from '@/data/demoData';

const AdminDashboard: React.FC = () => {
  const { isDemo } = useAuth();
  const [stats, setStats] = useState({ users: 0, projects: 0, kyc: 0, contacts: 0, applications: 0, tickets: 0 });
  const [recentUsers, setRecentUsers] = useState<any[]>([]);
  const [recentKyc, setRecentKyc] = useState<any[]>([]);

  useEffect(() => {
    if (isDemo) {
      setStats({
        users: demoUsers.length,
        projects: demoProjects.length,
        kyc: demoKycSubmissions.filter(k => k.status === 'submitted' || k.status === 'under_review').length,
        contacts: demoContactSubmissions.length,
        applications: demoApplications.length,
        tickets: demoSupportTickets.filter(t => t.status === 'open').length,
      });
      setRecentUsers(demoUsers.slice(0, 5));
      setRecentKyc(demoKycSubmissions.slice(0, 5));
      return;
    }

    Promise.all([
      supabase.from('profiles').select('id', { count: 'exact', head: true }),
      supabase.from('projects').select('id', { count: 'exact', head: true }),
      supabase.from('kyc_submissions').select('id', { count: 'exact', head: true }).in('status', ['submitted', 'under_review']),
      supabase.from('contact_submissions').select('id', { count: 'exact', head: true }),
      supabase.from('investment_applications').select('id', { count: 'exact', head: true }),
      supabase.from('support_tickets').select('id', { count: 'exact', head: true }).eq('status', 'open'),
    ]).then(([u, p, k, c, a, t]) => {
      setStats({ users: u.count || 0, projects: p.count || 0, kyc: k.count || 0, contacts: c.count || 0, applications: a.count || 0, tickets: t.count || 0 });
    });
    supabase.from('profiles').select('*').order('created_at', { ascending: false }).limit(5).then(({ data }) => { if (data) setRecentUsers(data); });
    supabase.from('kyc_submissions').select('*, profiles(full_name, email)').order('created_at', { ascending: false }).limit(5).then(({ data }) => { if (data) setRecentKyc(data); });
  }, [isDemo]);

  const kpis = [
    { label: 'Total Users', value: stats.users, color: 'text-white' },
    { label: 'Active Projects', value: stats.projects, color: 'text-gold' },
    { label: 'Pending KYC', value: stats.kyc, color: 'text-blue-400' },
    { label: 'Contact Forms', value: stats.contacts, color: 'text-white' },
    { label: 'Applications', value: stats.applications, color: 'text-gold' },
    { label: 'Open Tickets', value: stats.tickets, color: 'text-red-400' },
  ];

  return (
    <div>
      {/* Demo Banner */}
      {isDemo && (
        <div className="mb-6 rounded-xl p-4 flex items-center gap-3" style={{ backgroundColor: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)' }}>
          <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-red-400">You are viewing the <strong>Admin Dashboard</strong> in demo mode. Data shown is sample data for demonstration purposes.</p>
        </div>
      )}

      <h1 className="font-serif text-3xl font-bold text-white mb-1">Admin <span className="text-gold">Overview</span></h1>
      <p className="text-gray-400 mb-8">Platform management dashboard</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {kpis.map(k => (
          <div key={k.label} className="card-premium p-5">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{k.label}</p>
            <p className={`font-serif text-3xl font-bold ${k.color}`}>{k.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="card-premium p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-lg font-bold text-white">Recent Users</h2>
            <Link to="/admin/users" className="text-xs text-gold hover:underline">View All</Link>
          </div>
          <div className="space-y-3">
            {recentUsers.map(u => (
              <div key={u.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold text-xs font-bold">{(u.full_name || u.email || 'U').charAt(0).toUpperCase()}</div>
                  <div><p className="text-sm text-white">{u.full_name || 'No name'}</p><p className="text-xs text-gray-500">{u.email}</p></div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded ${u.role === 'admin' ? 'bg-red-500/10 text-red-400' : 'bg-blue-500/10 text-blue-400'}`}>{u.role}</span>
              </div>
            ))}
            {recentUsers.length === 0 && <p className="text-sm text-gray-500 text-center py-4">No users yet</p>}
          </div>
        </div>

        <div className="card-premium p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-lg font-bold text-white">Recent KYC Submissions</h2>
            <Link to="/admin/kyc" className="text-xs text-gold hover:underline">View All</Link>
          </div>
          <div className="space-y-3">
            {recentKyc.map(k => (
              <div key={k.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                <div><p className="text-sm text-white">{(k.profiles as any)?.full_name || k.profiles?.full_name || 'Unknown'}</p><p className="text-xs text-gray-500">{(k.profiles as any)?.email || k.profiles?.email}</p></div>
                <span className={k.status === 'submitted' ? 'badge-ongoing' : k.status === 'approved' ? 'badge-funded' : 'badge-upcoming'}>{k.status}</span>
              </div>
            ))}
            {recentKyc.length === 0 && <p className="text-sm text-gray-500 text-center py-4">No KYC submissions yet</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
