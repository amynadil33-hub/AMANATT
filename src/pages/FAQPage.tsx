import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/lib/supabase';

const FAQPage: React.FC = () => {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [openId, setOpenId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    supabase.from('faq_items').select('*').order('sort_order')
      .then(({ data }) => { if (data) setFaqs(data); });
  }, []);

  const categories = ['all', ...new Set(faqs.map(f => f.category).filter(Boolean))];

  const filtered = useMemo(() => {
    return faqs.filter(f => {
      if (search && !f.question.toLowerCase().includes(search.toLowerCase()) && !f.answer.toLowerCase().includes(search.toLowerCase())) return false;
      if (activeCategory !== 'all' && f.category !== activeCategory) return false;
      return true;
    });
  }, [faqs, search, activeCategory]);

  return (
    <div style={{ backgroundColor: '#0B1121' }}>
      <section className="py-16 lg:py-20 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-label mb-4">SUPPORT</p>
          <h1 className="font-serif text-4xl lg:text-6xl font-bold text-white">
            Frequently Asked <span className="italic text-gold">Questions</span>
          </h1>
        </div>
      </section>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <input type="text" placeholder="Search questions..." value={search} onChange={e => setSearch(e.target.value)} className="input-dark mb-6" />
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(c => (
            <button key={c} onClick={() => setActiveCategory(c)}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${activeCategory === c ? 'bg-gold/10 text-gold' : 'text-gray-400 hover:text-white bg-white/5'}`}>
              {c === 'all' ? 'All' : c}
            </button>
          ))}
        </div>
        <div className="space-y-3">
          {filtered.map(f => (
            <div key={f.id} className="card-premium overflow-hidden">
              <button onClick={() => setOpenId(openId === f.id ? null : f.id)} className="w-full flex items-center justify-between p-5 text-left">
                <span className="font-serif text-base font-semibold text-white pr-4">{f.question}</span>
                <svg className={`w-5 h-5 text-gold flex-shrink-0 transition-transform ${openId === f.id ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openId === f.id && (
                <div className="px-5 pb-5">
                  <p className="text-sm text-gray-400 leading-relaxed">{f.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
