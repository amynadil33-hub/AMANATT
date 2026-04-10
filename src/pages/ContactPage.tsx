import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';

const ContactPage: React.FC = () => {
  const [form, setForm] = useState({ full_name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError('');
    const { error } = await supabase.from('contact_submissions').insert([form]);
    if (error) { setError('Failed to send. Please try again.'); setLoading(false); }
    else { setSuccess(true); setForm({ full_name: '', email: '', phone: '', subject: '', message: '' }); setLoading(false); }
  };

  return (
    <div style={{ backgroundColor: '#0B1121' }}>
      <section className="py-16 lg:py-20 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-label mb-4">GET IN TOUCH</p>
          <h1 className="font-serif text-4xl lg:text-6xl font-bold text-white">Contact <span className="italic text-gold">Us</span></h1>
        </div>
      </section>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-serif text-2xl font-bold text-white mb-4">Get in Touch</h2>
            <p className="text-gray-400 mb-8">Have questions about investing with Amanat? Our team is here to help.</p>
            <div className="space-y-4">
              {[['Email', 'invest@amanat.mv'], ['Phone', '+960 332 0000'], ['Address', 'Malé, Republic of Maldives'], ['Hours', 'Sunday–Thursday, 9AM–5PM MVT']].map(([k, v]) => (
                <div key={k}><p className="text-xs text-gray-500 uppercase tracking-wider">{k}</p><p className="text-sm text-white mt-1">{v}</p></div>
              ))}
            </div>
          </div>
          <div className="card-premium p-6">
            {success ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="font-serif text-xl font-bold text-white mb-2">Message Sent</h3>
                <p className="text-gray-400">We'll respond within 1-2 business days.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && <div className="p-3 rounded-lg bg-red-500/10 text-sm text-red-400">{error}</div>}
                <div><label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Full Name</label><input type="text" value={form.full_name} onChange={e => setForm({ ...form, full_name: e.target.value })} required className="input-dark" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Email</label><input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required className="input-dark" /></div>
                  <div><label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Phone</label><input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="input-dark" /></div>
                </div>
                <div><label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Subject</label><input type="text" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} required className="input-dark" /></div>
                <div><label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Message</label><textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required rows={4} className="input-dark" /></div>
                <button type="submit" disabled={loading} className="btn-gold w-full">{loading ? 'Sending...' : 'Send Message'}</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
