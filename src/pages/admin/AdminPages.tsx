import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import {
  demoUsers, demoProjects, demoAllInvestments, demoAllTransactions,
  demoKycSubmissions, demoContactSubmissions, demoApplications, demoSupportTickets
} from '@/data/demoData';

export const AdminUsers: React.FC = () => {
  const { isDemo } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  useEffect(() => {
    if (isDemo) { setUsers(demoUsers); return; }
    supabase.from('profiles').select('*').order('created_at', { ascending: false }).then(({ data }) => { if (data) setUsers(data); });
  }, [isDemo]);
  const filtered = users.filter(u => !search || u.full_name?.toLowerCase().includes(search.toLowerCase()) || u.email?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-white mb-6">Manage <span className="text-gold">Users</span></h1>
      <input type="text" placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)} className="input-dark mb-6 max-w-md" />
      <div className="card-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              {['Name', 'Email', 'Role', 'Tier', 'Joined', 'Actions'].map(h => <th key={h} className="text-left px-4 py-3 text-xs text-gray-500 uppercase tracking-wider">{h}</th>)}
            </tr></thead>
            <tbody>
              {filtered.map(u => (
                <tr key={u.id} className="border-b" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
                  <td className="px-4 py-3 text-white font-semibold">{u.full_name || '—'}</td>
                  <td className="px-4 py-3 text-gray-400">{u.email}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded text-xs ${u.role === 'admin' ? 'bg-red-500/10 text-red-400' : 'bg-blue-500/10 text-blue-400'}`}>{u.role}</span></td>
                  <td className="px-4 py-3 text-gold text-xs">{u.membership_tier}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{new Date(u.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-3"><button className="text-xs text-gold hover:underline">View</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export const AdminProjects: React.FC = () => {
  const { isDemo } = useAuth();
  const [projects, setProjects] = useState<any[]>([]);
  useEffect(() => {
    if (isDemo) { setProjects(demoProjects); return; }
    supabase.from('projects').select('*').order('created_at', { ascending: false }).then(({ data }) => { if (data) setProjects(data); });
  }, [isDemo]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-3xl font-bold text-white">Manage <span className="text-gold">Projects</span></h1>
        <button className="btn-gold !text-xs">Add Project</button>
      </div>
      <div className="card-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              {['Project', 'Category', 'Status', 'Funded', 'Return', 'Actions'].map(h => <th key={h} className="text-left px-4 py-3 text-xs text-gray-500 uppercase tracking-wider">{h}</th>)}
            </tr></thead>
            <tbody>
              {projects.map(p => (
                <tr key={p.id} className="border-b" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
                  <td className="px-4 py-3 text-white font-semibold">{p.title}</td>
                  <td className="px-4 py-3 text-gray-400">{p.category}</td>
                  <td className="px-4 py-3"><span className={p.status === 'ongoing' ? 'badge-ongoing' : p.status === 'funded' ? 'badge-funded' : 'badge-upcoming'}>{p.status}</span></td>
                  <td className="px-4 py-3 text-gray-300">{p.funding_goal ? `${Math.round((p.funded_amount / p.funding_goal) * 100)}%` : '—'}</td>
                  <td className="px-4 py-3 text-gold">{p.expected_return}%</td>
                  <td className="px-4 py-3"><button className="text-xs text-gold hover:underline mr-3">Edit</button><button className="text-xs text-gray-400 hover:underline">Archive</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export const AdminInvestments: React.FC = () => {
  const { isDemo } = useAuth();
  const [investments, setInvestments] = useState<any[]>([]);
  useEffect(() => {
    if (isDemo) { setInvestments(demoAllInvestments); return; }
    supabase.from('investments').select('*, profiles(full_name, email), projects(title)').order('created_at', { ascending: false }).then(({ data }) => { if (data) setInvestments(data); });
  }, [isDemo]);

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-white mb-6">Manage <span className="text-gold">Investments</span></h1>
      <div className="card-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              {['Investor', 'Project', 'Amount', 'Status', 'Date'].map(h => <th key={h} className="text-left px-4 py-3 text-xs text-gray-500 uppercase tracking-wider">{h}</th>)}
            </tr></thead>
            <tbody>
              {investments.map(i => (
                <tr key={i.id} className="border-b" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
                  <td className="px-4 py-3 text-white">{(i.profiles as any)?.full_name || '—'}</td>
                  <td className="px-4 py-3 text-gray-400">{(i.projects as any)?.title || '—'}</td>
                  <td className="px-4 py-3 text-white font-semibold">${(i.amount || 0).toLocaleString()}</td>
                  <td className="px-4 py-3"><span className="badge-ongoing">{i.status}</span></td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{new Date(i.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
              {investments.length === 0 && <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-500">No investments recorded</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export const AdminTransactions: React.FC = () => {
  const { isDemo } = useAuth();
  const [txns, setTxns] = useState<any[]>([]);
  useEffect(() => {
    if (isDemo) { setTxns(demoAllTransactions); return; }
    supabase.from('transactions').select('*, profiles(full_name)').order('created_at', { ascending: false }).then(({ data }) => { if (data) setTxns(data); });
  }, [isDemo]);

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-white mb-6">Manage <span className="text-gold">Transactions</span></h1>
      <div className="card-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              {['User', 'Type', 'Amount', 'Status', 'Date'].map(h => <th key={h} className="text-left px-4 py-3 text-xs text-gray-500 uppercase tracking-wider">{h}</th>)}
            </tr></thead>
            <tbody>
              {txns.map(t => (
                <tr key={t.id} className="border-b" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
                  <td className="px-4 py-3 text-white">{(t.profiles as any)?.full_name || '—'}</td>
                  <td className="px-4 py-3 text-gray-400 capitalize">{t.type}</td>
                  <td className="px-4 py-3 text-white font-semibold">${(t.amount || 0).toLocaleString()}</td>
                  <td className="px-4 py-3"><span className="badge-ongoing">{t.status}</span></td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{new Date(t.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
              {txns.length === 0 && <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-500">No transactions</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export const AdminKYC: React.FC = () => {
  const { isDemo } = useAuth();
  const [submissions, setSubmissions] = useState<any[]>([]);
  useEffect(() => {
    if (isDemo) { setSubmissions(demoKycSubmissions); return; }
    supabase.from('kyc_submissions').select('*, profiles(full_name, email)').order('created_at', { ascending: false }).then(({ data }) => { if (data) setSubmissions(data); });
  }, [isDemo]);

  const updateStatus = async (id: string, status: string) => {
    if (isDemo) {
      setSubmissions(submissions.map(s => s.id === id ? { ...s, status } : s));
      return;
    }
    await supabase.from('kyc_submissions').update({ status, reviewed_at: new Date().toISOString() }).eq('id', id);
    setSubmissions(submissions.map(s => s.id === id ? { ...s, status } : s));
  };

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-white mb-6">KYC <span className="text-gold">Review</span></h1>
      <div className="space-y-4">
        {submissions.map(s => (
          <div key={s.id} className="card-premium p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm font-semibold text-white">{s.profiles?.full_name || 'Unknown'}</p>
                <p className="text-xs text-gray-500">{s.profiles?.email}</p>
              </div>
              <span className={s.status === 'submitted' ? 'badge-ongoing' : s.status === 'approved' ? 'badge-funded' : s.status === 'rejected' ? 'bg-red-500/10 text-red-400 px-3 py-1 rounded-full text-xs font-semibold' : 'badge-upcoming'}>{s.status}</span>
            </div>
            <p className="text-xs text-gray-400 mb-3">Submitted: {s.submitted_at ? new Date(s.submitted_at).toLocaleDateString() : 'Draft'}</p>
            {(s.status === 'submitted' || s.status === 'under_review') && (
              <div className="flex gap-2">
                <button onClick={() => updateStatus(s.id, 'approved')} className="btn-gold !py-1.5 !px-3 !text-xs">Approve</button>
                <button onClick={() => updateStatus(s.id, 'rejected')} className="px-3 py-1.5 rounded-lg text-xs border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors">Reject</button>
                <button onClick={() => updateStatus(s.id, 'under_review')} className="btn-outline-gold !py-1.5 !px-3 !text-xs">Mark Under Review</button>
              </div>
            )}
          </div>
        ))}
        {submissions.length === 0 && <div className="card-premium p-12 text-center"><p className="text-gray-400">No KYC submissions</p></div>}
      </div>
    </div>
  );
};

export const AdminForms: React.FC = () => {
  const { isDemo } = useAuth();
  const [contacts, setContacts] = useState<any[]>([]);
  const [apps, setApps] = useState<any[]>([]);
  const [tickets, setTickets] = useState<any[]>([]);
  const [tab, setTab] = useState('contacts');

  useEffect(() => {
    if (isDemo) {
      setContacts(demoContactSubmissions);
      setApps(demoApplications);
      setTickets(demoSupportTickets);
      return;
    }
    supabase.from('contact_submissions').select('*').order('created_at', { ascending: false }).then(({ data }) => { if (data) setContacts(data); });
    supabase.from('investment_applications').select('*').order('created_at', { ascending: false }).then(({ data }) => { if (data) setApps(data); });
    supabase.from('support_tickets').select('*, profiles(full_name)').order('created_at', { ascending: false }).then(({ data }) => { if (data) setTickets(data); });
  }, [isDemo]);

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-white mb-6">Forms & <span className="text-gold">Leads</span></h1>
      <div className="flex gap-2 mb-6">
        {[['contacts', `Contact Forms (${contacts.length})`], ['apps', `Applications (${apps.length})`], ['tickets', `Support Tickets (${tickets.length})`]].map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)} className={`px-4 py-2 rounded-lg text-sm ${tab === k ? 'bg-gold/10 text-gold' : 'bg-white/5 text-gray-400'}`}>{l}</button>
        ))}
      </div>
      <div className="card-premium overflow-hidden">
        {tab === 'contacts' && (
          <div className="divide-y" style={{ divideColor: 'rgba(255,255,255,0.04)' }}>
            {contacts.map(c => (
              <div key={c.id} className="p-4"><p className="text-sm font-semibold text-white">{c.full_name} — {c.subject}</p><p className="text-xs text-gray-400 mt-1">{c.message}</p><p className="text-xs text-gray-500 mt-1">{c.email} · {new Date(c.created_at).toLocaleDateString()}</p></div>
            ))}
            {contacts.length === 0 && <p className="p-8 text-center text-gray-500">No contact submissions</p>}
          </div>
        )}
        {tab === 'apps' && (
          <div className="divide-y" style={{ divideColor: 'rgba(255,255,255,0.04)' }}>
            {apps.map(a => (
              <div key={a.id} className="p-4"><p className="text-sm font-semibold text-white">{a.full_name}</p><p className="text-xs text-gray-400 mt-1">Interest: {a.investment_interest} · {a.email}</p><p className="text-xs text-gray-500 mt-1">{new Date(a.created_at).toLocaleDateString()}</p></div>
            ))}
            {apps.length === 0 && <p className="p-8 text-center text-gray-500">No applications</p>}
          </div>
        )}
        {tab === 'tickets' && (
          <div className="divide-y" style={{ divideColor: 'rgba(255,255,255,0.04)' }}>
            {tickets.map(t => (
              <div key={t.id} className="p-4"><p className="text-sm font-semibold text-white">{t.subject}</p><p className="text-xs text-gray-400 mt-1">{t.message}</p><p className="text-xs text-gray-500 mt-1">{t.profiles?.full_name} · {t.status} · {new Date(t.created_at).toLocaleDateString()}</p></div>
            ))}
            {tickets.length === 0 && <p className="p-8 text-center text-gray-500">No support tickets</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export const AdminContent: React.FC = () => (
  <div>
    <h1 className="font-serif text-3xl font-bold text-white mb-6">Content <span className="text-gold">Manager</span></h1>
    <p className="text-gray-400 mb-6">Manage resource items, podcast entries, FAQ, and case studies.</p>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {['FAQ Items', 'Podcast Episodes', 'Expert Interviews', 'Case Studies', 'Resource Articles', 'Press Releases'].map(t => (
        <div key={t} className="card-premium p-5"><h3 className="font-serif text-base font-bold text-white mb-1">{t}</h3><p className="text-xs text-gray-400">Manage {t.toLowerCase()}</p><button className="text-xs text-gold mt-3 hover:underline">Manage →</button></div>
      ))}
    </div>
  </div>
);

export const AdminNotifications: React.FC = () => {
  const [form, setForm] = useState({ title: '', body: '', type: 'info' });
  const [sent, setSent] = useState(false);

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-white mb-6"><span className="text-gold">Notifications</span></h1>
      <div className="card-premium p-6 max-w-lg">
        <h3 className="font-serif text-lg font-bold text-white mb-4">Send Notification</h3>
        {sent ? (
          <div className="text-center py-4"><p className="text-green-400 mb-3">Notification created</p><button onClick={() => setSent(false)} className="btn-outline-gold !text-xs">Send Another</button></div>
        ) : (
          <div className="space-y-4">
            <div><label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Title</label><input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="input-dark" /></div>
            <div><label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Message</label><textarea value={form.body} onChange={e => setForm({ ...form, body: e.target.value })} rows={3} className="input-dark" /></div>
            <button onClick={() => setSent(true)} className="btn-gold">Send to All Users</button>
          </div>
        )}
      </div>
    </div>
  );
};

export const AdminSettings: React.FC = () => (
  <div>
    <h1 className="font-serif text-3xl font-bold text-white mb-6">Admin <span className="text-gold">Settings</span></h1>
    <div className="space-y-6 max-w-lg">
      <div className="card-premium p-6">
        <h3 className="font-serif text-lg font-bold text-white mb-4">Platform Settings</h3>
        <div className="space-y-4">
          <div><label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Platform Name</label><input type="text" defaultValue="Blocs" className="input-dark" /></div>
          <div><label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Support Email</label><input type="email" defaultValue="invest@blocs.mv" className="input-dark" /></div>
          <button className="btn-gold !text-xs">Save Settings</button>
        </div>
      </div>
    </div>
  </div>
);
