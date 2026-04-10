import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

const ApplyPage: React.FC = () => {
  const { user, profile } = useAuth();
  const [form, setForm] = useState({ full_name: profile?.full_name || '', email: profile?.email || '', phone: profile?.phone || '', investment_interest: '', notes: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError('');
    const { error } = await supabase.from('investment_applications').insert([{ ...form, user_id: profile?.id || null, status: 'pending' }]);
    if (error) { setError('Failed to submit. Please try again.'); setLoading(false); }
    else { setSuccess(true); setLoading(false); }
  };

  return (
    <div style={{ backgroundColor: '#0B1121' }}>
      <section className="py-16 lg:py-20 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-label mb-4">GET STARTED</p>
          <h1 className="font-serif text-4xl lg:text-6xl font-bold text-white">Apply to <span className="italic text-gold">Invest</span></h1>
        </div>
      </section>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {success ? (
          <div className="card-premium p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h2 className="font-serif text-2xl font-bold text-white mb-2">Application Submitted</h2>
            <p className="text-gray-400 mb-6">Our investment team will review your application and contact you within 2 business days.</p>
            <div className="flex justify-center gap-4">
              <Link to="/projects" className="btn-outline-gold">Browse Projects</Link>
              {user && <Link to="/portal" className="btn-gold">Go to Portal</Link>}
            </div>
          </div>
        ) : (
          <div className="card-premium p-8">
            <p className="text-gray-400 mb-6">Complete the form below to express your interest in investing with Amanat. Our team will contact you to discuss opportunities and next steps.</p>
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && <div className="p-3 rounded-lg bg-red-500/10 text-sm text-red-400">{error}</div>}
              <div><label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Full Name <span className="text-red-400">*</span></label><input type="text" value={form.full_name} onChange={e => setForm({ ...form, full_name: e.target.value })} required className="input-dark" /></div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Email <span className="text-red-400">*</span></label><input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required className="input-dark" /></div>
                <div><label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Phone</label><input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="input-dark" /></div>
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Investment Interest <span className="text-red-400">*</span></label>
                <select value={form.investment_interest} onChange={e => setForm({ ...form, investment_interest: e.target.value })} required className="input-dark">
                  <option value="">Select investment range</option>
                  <option value="250k-500k">$250,000 – $500,000</option>
                  <option value="500k-1m">$500,000 – $1,000,000</option>
                  <option value="1m-5m">$1,000,000 – $5,000,000</option>
                  <option value="5m+">$5,000,000+</option>
                </select>
              </div>
              <div><label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Additional Notes</label><textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} rows={4} className="input-dark" placeholder="Tell us about your investment goals..." /></div>
              <button type="submit" disabled={loading} className="btn-gold w-full !py-3">{loading ? 'Submitting...' : 'Submit Application'}</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplyPage;
