import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Link } from 'react-router-dom';
import { demoInvestments, demoTransactions, demoNotifications } from '@/data/demoData';

export const InvestmentsPage: React.FC = () => {
  const { profile, isDemo } = useAuth();
  const [investments, setInvestments] = useState<any[]>([]);
  useEffect(() => {
    if (isDemo) { setInvestments(demoInvestments); return; }
    if (profile?.id) supabase.from('investments').select('*, projects(title, category, status, expected_return, image_url)').eq('user_id', profile.id).then(({ data }) => { if (data) setInvestments(data); });
  }, [profile?.id, isDemo]);

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-white mb-1">My <span className="text-gold">Investments</span></h1>
      <p className="text-gray-400 mb-8">Track all your investment positions</p>
      {investments.length === 0 ? (
        <div className="card-premium p-12 text-center"><h3 className="font-serif text-xl font-bold text-white mb-2">No Investments Yet</h3><p className="text-gray-400 mb-6">Start investing to see your positions here.</p><Link to="/projects" className="btn-gold">Browse Projects</Link></div>
      ) : (
        <div className="space-y-4">
          {investments.map(i => (
            <div key={i.id} className="card-premium p-5 flex items-center gap-5">
              {i.projects?.image_url && <img src={i.projects.image_url} alt="" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />}
              <div className="flex-1">
                <h3 className="font-serif text-base font-bold text-white">{i.projects?.title || 'Investment'}</h3>
                <p className="text-xs text-gray-400">{i.projects?.category} · {new Date(i.invested_at).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-white">${(i.amount || 0).toLocaleString()}</p>
                <p className="text-xs text-gold">{i.projects?.expected_return}% p.a.</p>
              </div>
              <span className="badge-ongoing">{i.status}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const TransactionsPage: React.FC = () => {
  const { profile, isDemo } = useAuth();
  const [txns, setTxns] = useState<any[]>([]);
  const [filter, setFilter] = useState('all');
  useEffect(() => {
    if (isDemo) { setTxns(demoTransactions); return; }
    if (profile?.id) supabase.from('transactions').select('*').eq('user_id', profile.id).order('created_at', { ascending: false }).then(({ data }) => { if (data) setTxns(data); });
  }, [profile?.id, isDemo]);
  const filtered = filter === 'all' ? txns : txns.filter(t => t.type === filter);

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-white mb-1"><span className="text-gold">Transactions</span></h1>
      <p className="text-gray-400 mb-6">All deposits, withdrawals, and distributions</p>
      <div className="flex gap-2 mb-6">
        {['all', 'deposit', 'withdrawal', 'return', 'fee'].map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-lg text-xs ${filter === f ? 'bg-gold/10 text-gold' : 'bg-white/5 text-gray-400'}`}>{f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}</button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <div className="card-premium p-12 text-center"><p className="text-gray-400">No transactions found</p></div>
      ) : (
        <div className="card-premium overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              {['Date', 'Type', 'Amount', 'Status', 'Reference'].map(h => <th key={h} className="text-left px-4 py-3 text-xs text-gray-500 uppercase tracking-wider">{h}</th>)}
            </tr></thead>
            <tbody>
              {filtered.map(t => (
                <tr key={t.id} className="border-b" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
                  <td className="px-4 py-3 text-gray-300">{new Date(t.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-white capitalize">{t.type}</td>
                  <td className={`px-4 py-3 font-semibold ${t.type === 'return' ? 'text-green-400' : t.type === 'withdrawal' ? 'text-red-400' : 'text-white'}`}>${(t.amount || 0).toLocaleString()}</td>
                  <td className="px-4 py-3"><span className="badge-ongoing">{t.status}</span></td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{t.reference || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export const DocumentsPage: React.FC = () => {
  const { isDemo } = useAuth();

  if (isDemo) {
    const docs = [
      { name: 'Investment Agreement — Malé Waterfront Residences', type: 'Contract', date: '2024-07-15' },
      { name: 'Investment Agreement — Addu City Commercial Hub', type: 'Contract', date: '2024-03-20' },
      { name: 'Investment Agreement — Baa Atoll Luxury Villas', type: 'Contract', date: '2024-02-10' },
      { name: 'Q3 2024 Quarterly Statement', type: 'Statement', date: '2024-10-05' },
      { name: 'Q1 2025 Quarterly Statement', type: 'Statement', date: '2025-01-05' },
      { name: '2024 Annual Tax Statement', type: 'Tax', date: '2025-02-01' },
      { name: 'KYC Approval Certificate', type: 'KYC', date: '2024-03-16' },
    ];
    return (
      <div>
        <h1 className="font-serif text-3xl font-bold text-white mb-1"><span className="text-gold">Documents</span></h1>
        <p className="text-gray-400 mb-8">Your uploaded documents, contracts, and statements</p>
        <div className="card-premium overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              {['Document', 'Type', 'Date', 'Action'].map(h => <th key={h} className="text-left px-4 py-3 text-xs text-gray-500 uppercase tracking-wider">{h}</th>)}
            </tr></thead>
            <tbody>
              {docs.map((d, i) => (
                <tr key={i} className="border-b" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
                  <td className="px-4 py-3 text-white font-semibold">{d.name}</td>
                  <td className="px-4 py-3"><span className="px-2 py-0.5 rounded text-xs bg-white/5 text-gray-300">{d.type}</span></td>
                  <td className="px-4 py-3 text-gray-400 text-xs">{d.date}</td>
                  <td className="px-4 py-3"><button className="text-xs text-gold hover:underline">Download</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-white mb-1"><span className="text-gold">Documents</span></h1>
      <p className="text-gray-400 mb-8">Your uploaded documents, contracts, and statements</p>
      <div className="card-premium p-12 text-center">
        <h3 className="font-serif text-xl font-bold text-white mb-2">No Documents Yet</h3>
        <p className="text-gray-400">Documents will appear here once you complete KYC or make investments.</p>
      </div>
    </div>
  );
};

export const NotificationsPage: React.FC = () => {
  const { profile, isDemo } = useAuth();
  const [notifs, setNotifs] = useState<any[]>([]);
  useEffect(() => {
    if (isDemo) { setNotifs(demoNotifications); return; }
    if (profile?.id) supabase.from('notifications').select('*').eq('user_id', profile.id).order('created_at', { ascending: false }).then(({ data }) => { if (data) setNotifs(data); });
  }, [profile?.id, isDemo]);

  const markRead = async (id: string) => {
    if (isDemo) {
      setNotifs(notifs.map(n => n.id === id ? { ...n, read_status: true } : n));
      return;
    }
    await supabase.from('notifications').update({ read_status: true }).eq('id', id);
    setNotifs(notifs.map(n => n.id === id ? { ...n, read_status: true } : n));
  };

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-white mb-1"><span className="text-gold">Notifications</span></h1>
      <p className="text-gray-400 mb-8">Alerts and updates about your account</p>
      {notifs.length === 0 ? (
        <div className="card-premium p-12 text-center"><p className="text-gray-400">No notifications</p></div>
      ) : (
        <div className="space-y-3">
          {notifs.map(n => (
            <div key={n.id} onClick={() => !n.read_status && markRead(n.id)} className={`card-premium p-5 cursor-pointer ${!n.read_status ? 'border-gold/20' : ''}`}>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-white">{n.title}</h3>
                  <p className="text-xs text-gray-400 mt-1">{n.body}</p>
                </div>
                {!n.read_status && <span className="w-2 h-2 rounded-full bg-gold flex-shrink-0 mt-1" />}
              </div>
              <p className="text-xs text-gray-500 mt-2">{new Date(n.created_at).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const ProfilePage: React.FC = () => {
  const { profile, isDemo } = useAuth();
  const [form, setForm] = useState({ full_name: profile?.full_name || '', phone: profile?.phone || '' });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    if (isDemo) {
      setSaving(true);
      setTimeout(() => { setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 3000); }, 800);
      return;
    }
    if (!profile?.id) return;
    setSaving(true);
    await supabase.from('profiles').update({ full_name: form.full_name, phone: form.phone, updated_at: new Date().toISOString() }).eq('id', profile.id);
    setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-white mb-1">Profile <span className="text-gold">Settings</span></h1>
      <p className="text-gray-400 mb-8">Manage your personal details and preferences</p>
      <div className="card-premium p-6 max-w-lg space-y-5">
        <div><label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Full Name</label><input type="text" value={form.full_name} onChange={e => setForm({ ...form, full_name: e.target.value })} className="input-dark" /></div>
        <div><label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Email</label><input type="email" value={profile?.email || ''} disabled className="input-dark opacity-50" /></div>
        <div><label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Phone</label><input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="input-dark" /></div>
        <div><label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Membership Tier</label><input type="text" value={profile?.membership_tier || 'Silver'} disabled className="input-dark opacity-50" /></div>
        <div className="flex items-center gap-3">
          <button onClick={handleSave} disabled={saving} className="btn-gold">{saving ? 'Saving...' : 'Save Changes'}</button>
          {saved && <span className="text-sm text-green-400">Saved successfully</span>}
        </div>
      </div>
    </div>
  );
};

export const SupportPage: React.FC = () => {
  const { profile, isDemo } = useAuth();
  const [form, setForm] = useState({ subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (isDemo) {
      setTimeout(() => { setSuccess(true); setLoading(false); setForm({ subject: '', message: '' }); }, 800);
      return;
    }
    if (!profile?.id) return;
    await supabase.from('support_tickets').insert([{ user_id: profile.id, ...form, status: 'open' }]);
    setSuccess(true); setLoading(false); setForm({ subject: '', message: '' });
  };

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-white mb-1"><span className="text-gold">Support</span></h1>
      <p className="text-gray-400 mb-8">Need help? Submit a support ticket or check our FAQ.</p>
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="card-premium p-6">
          {success ? (
            <div className="text-center py-8">
              <h3 className="font-serif text-xl font-bold text-white mb-2">Ticket Submitted</h3>
              <p className="text-gray-400 mb-4">We'll respond within 24 hours.</p>
              <button onClick={() => setSuccess(false)} className="btn-outline-gold">Submit Another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Subject</label><input type="text" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} required className="input-dark" /></div>
              <div><label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Message</label><textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required rows={5} className="input-dark" /></div>
              <button type="submit" disabled={loading} className="btn-gold w-full">{loading ? 'Sending...' : 'Submit Ticket'}</button>
            </form>
          )}
        </div>
        <div>
          <h3 className="font-serif text-lg font-bold text-white mb-4">Quick Links</h3>
          <div className="space-y-3">
            <Link to="/faq" className="card-premium p-4 block hover:border-gold/30 transition-all"><p className="text-sm text-white font-semibold">FAQ</p><p className="text-xs text-gray-400">Find answers to common questions</p></Link>
            <Link to="/contact" className="card-premium p-4 block hover:border-gold/30 transition-all"><p className="text-sm text-white font-semibold">Contact Us</p><p className="text-xs text-gray-400">Reach our team directly</p></Link>
            <Link to="/about/risk-disclosures" className="card-premium p-4 block hover:border-gold/30 transition-all"><p className="text-sm text-white font-semibold">Risk Disclosures</p><p className="text-xs text-gray-400">Important investment risk information</p></Link>
          </div>
        </div>
      </div>
    </div>
  );
};
