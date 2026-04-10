import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Link } from 'react-router-dom';
import { demoPortfolioEntries, demoInvestments } from '@/data/demoData';

const PortfolioPage: React.FC = () => {
  const { profile, isDemo } = useAuth();
  const [entries, setEntries] = useState<any[]>([]);
  const [investments, setInvestments] = useState<any[]>([]);

  useEffect(() => {
    if (isDemo) {
      setEntries(demoPortfolioEntries);
      setInvestments(demoInvestments);
      return;
    }
    if (!profile?.id) return;
    supabase.from('portfolio_entries').select('*, projects(title, category, status, image_url)').eq('user_id', profile.id).then(({ data }) => { if (data) setEntries(data); });
    supabase.from('investments').select('*, projects(title, expected_return)').eq('user_id', profile.id).then(({ data }) => { if (data) setInvestments(data); });
  }, [profile?.id, isDemo]);

  const totalValue = entries.reduce((s, e) => s + (e.current_value || 0), 0);
  const totalReturn = entries.reduce((s, e) => s + (e.return_to_date || 0), 0);
  const totalInvested = investments.reduce((s, i) => s + (i.amount || 0), 0);

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-white mb-1">My <span className="text-gold">Portfolio</span></h1>
      <p className="text-gray-400 mb-8">Your investment holdings and performance overview</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="card-premium p-5"><p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total Invested</p><p className="font-serif text-2xl font-bold text-white">${totalInvested.toLocaleString()}</p></div>
        <div className="card-premium p-5"><p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Current Value</p><p className="font-serif text-2xl font-bold text-gold">${totalValue.toLocaleString()}</p></div>
        <div className="card-premium p-5"><p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total Returns</p><p className="font-serif text-2xl font-bold text-green-400">${totalReturn.toLocaleString()}</p></div>
        <div className="card-premium p-5"><p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Active Holdings</p><p className="font-serif text-2xl font-bold text-white">{entries.length}</p></div>
      </div>

      {entries.length === 0 && investments.length === 0 ? (
        <div className="card-premium p-12 text-center">
          <h3 className="font-serif text-xl font-bold text-white mb-2">No Portfolio Holdings Yet</h3>
          <p className="text-gray-400 mb-6">Start investing to build your portfolio. Browse available projects to find opportunities.</p>
          <Link to="/projects" className="btn-gold">Browse Projects</Link>
        </div>
      ) : (
        <div className="card-premium overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                {['Project', 'Category', 'Invested', 'Current Value', 'Return', 'Allocation', 'Status'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs text-gray-500 uppercase tracking-wider font-semibold">{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {entries.map(e => (
                  <tr key={e.id} className="border-b" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
                    <td className="px-4 py-3 font-semibold text-white">{e.projects?.title || '—'}</td>
                    <td className="px-4 py-3 text-gray-400">{e.projects?.category || '—'}</td>
                    <td className="px-4 py-3 text-white">—</td>
                    <td className="px-4 py-3 text-white">${(e.current_value || 0).toLocaleString()}</td>
                    <td className="px-4 py-3 text-green-400">${(e.return_to_date || 0).toLocaleString()}</td>
                    <td className="px-4 py-3 text-gray-300">{e.allocation_percent || 0}%</td>
                    <td className="px-4 py-3"><span className="badge-funded">{e.projects?.status || 'active'}</span></td>
                  </tr>
                ))}
                {investments.map(i => (
                  <tr key={i.id} className="border-b" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
                    <td className="px-4 py-3 font-semibold text-white">{i.projects?.title || '—'}</td>
                    <td className="px-4 py-3 text-gray-400">—</td>
                    <td className="px-4 py-3 text-white">${(i.amount || 0).toLocaleString()}</td>
                    <td className="px-4 py-3 text-white">—</td>
                    <td className="px-4 py-3 text-gold">{i.projects?.expected_return || 0}% p.a.</td>
                    <td className="px-4 py-3 text-gray-300">—</td>
                    <td className="px-4 py-3"><span className="badge-ongoing">{i.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioPage;
