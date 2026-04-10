import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

const trustMetrics = [
  { value: '$84.2M', label: 'Assets under management' },
  { value: '318', label: 'Verified investors' },
  { value: '7', label: 'Live projects' },
  { value: '9.4%', label: 'Avg. projected return p.a.' },
];

const steps = [
  { num: '01', title: 'Browse Projects', desc: 'Explore certified real estate projects across all Maldivian atolls — from Malé to Addu. Every project carries Shariah certification.' },
  { num: '02', title: 'Select Blocs', desc: 'Choose your investment units. Each Bloc is a fixed-value ownership stake — from $250,000 to $10M per unit.' },
  { num: '03', title: 'Complete KYC', desc: 'Full identity and accreditation verification. Secure, fast, and compliant with Maldives Capital Market regulations.' },
  { num: '04', title: 'Receive Profit Share', desc: 'Your share of rental income and asset gains, distributed quarterly or semi-annually — never riba, always halal.' },
];

const investProducts = [
  { title: 'Real Estate Investment', desc: 'Fractional ownership in premium Maldivian commercial and residential developments.', href: '/invest/real-estate' },
  { title: 'Vacation Rentals', desc: 'Maldives resort & villa income pools — high-yield tourism assets.', href: '/invest/vacation-rentals' },
  { title: 'Private Credit Fund', desc: 'Murabaha financing for institutional real estate projects.', href: '/invest/private-credit' },
  { title: 'Bonds & Sukuks', desc: 'AAOIFI-certified sukuk backed by Maldivian real assets.', href: '/invest/bonds-sukuks' },
];

const whyInvest = [
  { title: 'Shariah Certified', desc: 'All structures reviewed and certified under AAOIFI standards by an independent Shariah Supervisory Board.' },
  { title: 'Asset-Backed Security', desc: 'Every investment is secured against real property assets with independent trustees and full insurance.' },
  { title: 'Regulatory Compliance', desc: 'Fully regulated by the Maldives Capital Market Authority (CMDA) with transparent reporting.' },
  { title: 'Proven Returns', desc: 'Historical average net returns of 7.2% to 12.1% p.a. across our diversified project portfolio.' },
  { title: 'Due Diligence', desc: 'Rigorous project selection with independent valuations, legal review, and environmental assessments.' },
  { title: 'Diversification', desc: 'Access multiple asset classes across different atolls, sectors, and risk profiles.' },
];

const faqPreview = [
  { q: 'What is Blocs and how does it work?', a: 'Blocs is a Shariah-compliant fractional real estate investment platform based in the Maldives. We enable qualified investors to own fractional stakes in premium real estate projects across Maldivian atolls.' },
  { q: 'What is the minimum investment amount?', a: 'Minimum investment varies by project, typically ranging from $250,000 to $2,000,000 per Bloc. Each project listing clearly states the minimum investment requirement.' },
  { q: 'How are returns distributed?', a: 'Returns are distributed quarterly or semi-annually depending on the project structure. Distributions include rental income and asset appreciation gains, structured as profit-share — never interest.' },
  { q: 'Is Blocs regulated?', a: 'Yes. Blocs operates under the regulatory framework of the Maldives Capital Market Authority (CMDA) and all investment structures are certified by an independent Shariah Supervisory Board under AAOIFI standards.' },
];

const HomePage: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    supabase.from('projects').select('*').order('created_at', { ascending: false }).limit(4)
      .then(({ data }) => { if (data) setProjects(data); });
  }, []);

  const getStatusBadge = (status: string) => {
    const cls = status === 'ongoing' ? 'badge-ongoing' : status === 'funded' ? 'badge-funded' : status === 'upcoming' ? 'badge-upcoming' : 'badge-closed';
    return <span className={cls}>{status}</span>;
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center" style={{ backgroundColor: '#0B1121' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <p className="section-label mb-6">SHARIAH-COMPLIANT REAL ESTATE · MALDIVES</p>
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[0.95] mb-2">
            OWN REAL
          </h1>
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold italic leading-[0.95] mb-8" style={{ color: '#C9A961' }}>
            ESTATE
          </h1>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[0.95] mb-8">
            IN BLOCKS
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mb-10 leading-relaxed">
            Premium fractional ownership across the Maldives atolls. Asset-backed, interest-free, and governed by AAOIFI Shariah standards.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/projects" className="btn-gold">Browse Projects</Link>
            <Link to="/calculator" className="btn-outline-gold">Calculate Returns</Link>
            <Link to="/apply" className="btn-ghost">Apply to Invest</Link>
          </div>
        </div>
      </section>

      {/* Trust Metrics */}
      <section className="border-y" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x" style={{ divideColor: 'rgba(255,255,255,0.06)' }}>
            {trustMetrics.map((m, i) => (
              <div key={i} className="py-8 lg:py-10 px-6">
                <p className="font-serif text-3xl lg:text-4xl font-bold text-gold">{m.value}</p>
                <p className="text-sm text-gray-400 mt-1">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: '#0E1525' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-label mb-4">HOW IT WORKS</p>
          <h2 className="font-serif text-3xl lg:text-5xl font-bold text-white mb-2">
            Four Steps to <span className="italic text-gold">Ownership</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">
            {steps.map((s) => (
              <div key={s.num} className="border-l pl-6" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                <p className="font-serif text-4xl font-bold text-gray-700 mb-4">{s.num}</p>
                <h3 className="font-serif text-lg font-bold text-white mb-2">{s.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: '#0B1121' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="section-label mb-4">ACTIVE PORTFOLIO</p>
              <h2 className="font-serif text-3xl lg:text-5xl font-bold text-white">
                Featured <span className="italic text-gold">Projects</span>
              </h2>
            </div>
            <Link to="/projects" className="btn-outline-gold hidden sm:inline-flex">View All Projects</Link>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((p) => (
              <Link key={p.id} to={`/projects/${p.slug}`} className="card-premium p-0 overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <img src={p.image_url} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 right-3">{getStatusBadge(p.status)}</div>
                  <div className="absolute top-3 left-3 px-2 py-1 rounded text-xs bg-white/10 backdrop-blur text-white">Shariah</div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold text-white mb-1">{p.title}</h3>
                  <p className="text-sm text-gray-400 mb-4">{p.location} · {p.category}</p>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">Bloc Size</p>
                      <p className="text-sm font-semibold text-white">${(p.minimum_investment || 0).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">Total Value</p>
                      <p className="text-sm font-semibold text-white">${(p.funding_goal || 0).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">Expected Return</p>
                      <p className="text-sm font-semibold text-gold">{p.expected_return}% p.a.</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">Profit Share</p>
                      <p className="text-sm font-semibold text-white">{p.profit_share}</p>
                    </div>
                  </div>
                  {p.funding_goal > 0 && (
                    <div className="mb-3">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>{Math.round((p.funded_amount / p.funding_goal) * 100)}% funded</span>
                        <span>${(p.funded_amount / 1000000).toFixed(1)}M raised</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/5">
                        <div className="h-full rounded-full bg-gold" style={{ width: `${Math.min(100, (p.funded_amount / p.funding_goal) * 100)}%` }} />
                      </div>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{p.duration}</span>
                    <span className="text-sm text-gold font-semibold group-hover:translate-x-1 transition-transform">View details →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 sm:hidden text-center">
            <Link to="/projects" className="btn-outline-gold">View All Projects</Link>
          </div>
        </div>
      </section>

      {/* Investment Products */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: '#0E1525' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-label mb-4">INVESTMENT PRODUCTS</p>
          <h2 className="font-serif text-3xl lg:text-5xl font-bold text-white mb-12">
            Ways to <span className="italic text-gold">Invest</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {investProducts.map((p) => (
              <Link key={p.title} to={p.href} className="card-premium p-6 group">
                <h3 className="font-serif text-lg font-bold text-white mb-2 group-hover:text-gold transition-colors">{p.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">{p.desc}</p>
                <span className="text-sm text-gold font-semibold">Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Invest */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: '#0B1121' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-label mb-4">WHY BLOCS</p>
          <h2 className="font-serif text-3xl lg:text-5xl font-bold text-white mb-12">
            Why Invest <span className="italic text-gold">With Us</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyInvest.map((w) => (
              <div key={w.title} className="card-premium p-6">
                <h3 className="font-serif text-lg font-bold text-white mb-2">{w.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: '#0E1525' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="section-label mb-4">ABOUT BLOCS</p>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-6">
                Institutional-Grade <span className="italic text-gold">Real Estate</span> Investment
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Blocs is the Maldives' premier Shariah-compliant fractional real estate investment platform. We bridge the gap between institutional-quality property assets and qualified individual investors.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                Founded with a mission to democratize access to premium Maldivian real estate, we combine rigorous due diligence, regulatory compliance, and transparent governance to deliver consistent, halal returns.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/about/who-we-are" className="btn-outline-gold">Who We Are</Link>
                <Link to="/about/investors" className="btn-ghost">Our Investors</Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="card-premium p-5 text-center">
                <p className="font-serif text-3xl font-bold text-gold">2019</p>
                <p className="text-xs text-gray-400 mt-1">Founded</p>
              </div>
              <div className="card-premium p-5 text-center">
                <p className="font-serif text-3xl font-bold text-gold">24</p>
                <p className="text-xs text-gray-400 mt-1">Countries</p>
              </div>
              <div className="card-premium p-5 text-center">
                <p className="font-serif text-3xl font-bold text-gold">$84M</p>
                <p className="text-xs text-gray-400 mt-1">AUM</p>
              </div>
              <div className="card-premium p-5 text-center">
                <p className="font-serif text-3xl font-bold text-gold">100%</p>
                <p className="text-xs text-gray-400 mt-1">Shariah Compliant</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Preview */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: '#0B1121' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-label mb-4">RESOURCES</p>
          <h2 className="font-serif text-3xl lg:text-5xl font-bold text-white mb-12">
            Insights & <span className="italic text-gold">Education</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link to="/resources/podcast" className="card-premium p-6 group">
              <p className="text-xs text-gold font-semibold uppercase tracking-wider mb-3">Podcast</p>
              <h3 className="font-serif text-xl font-bold text-white mb-2 group-hover:text-gold transition-colors">The Blocs Podcast</h3>
              <p className="text-sm text-gray-400 leading-relaxed">Islamic finance, Maldivian real estate, and investment strategy. New episodes every two weeks.</p>
            </Link>
            <Link to="/resources/interviews" className="card-premium p-6 group">
              <p className="text-xs text-gold font-semibold uppercase tracking-wider mb-3">Interviews</p>
              <h3 className="font-serif text-xl font-bold text-white mb-2 group-hover:text-gold transition-colors">Expert Interviews</h3>
              <p className="text-sm text-gray-400 leading-relaxed">In-depth conversations with industry leaders, Shariah scholars, and market analysts.</p>
            </Link>
            <Link to="/resources/case-studies" className="card-premium p-6 group">
              <p className="text-xs text-gold font-semibold uppercase tracking-wider mb-3">Case Studies</p>
              <h3 className="font-serif text-xl font-bold text-white mb-2 group-hover:text-gold transition-colors">Investment Case Studies</h3>
              <p className="text-sm text-gray-400 leading-relaxed">Detailed analysis of completed projects, returns achieved, and lessons learned.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: '#0E1525' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-label mb-4">FAQ</p>
          <h2 className="font-serif text-3xl lg:text-5xl font-bold text-white mb-12">
            Frequently Asked <span className="italic text-gold">Questions</span>
          </h2>
          <div className="max-w-3xl space-y-3">
            {faqPreview.map((f, i) => (
              <div key={i} className="card-premium overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left">
                  <span className="font-serif text-base font-semibold text-white pr-4">{f.q}</span>
                  <svg className={`w-5 h-5 text-gold flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="text-sm text-gray-400 leading-relaxed">{f.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link to="/faq" className="btn-outline-gold">View All FAQs</Link>
          </div>
        </div>
      </section>

      {/* CTA Block */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: '#0B1121' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="section-label mb-4">GET STARTED</p>
          <h2 className="font-serif text-3xl lg:text-5xl font-bold text-white mb-6">
            Begin Your Investment <span className="italic text-gold">Journey</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
            Join 318 verified investors across 24 countries. Apply today and gain access to premium Shariah-compliant real estate opportunities in the Maldives.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/apply" className="btn-gold !px-8 !py-4 !text-base">Apply to Invest</Link>
            <Link to="/signup" className="btn-outline-gold !px-8 !py-4 !text-base">Create Account</Link>
            <Link to="/contact" className="btn-ghost !px-8 !py-4 !text-base">Schedule Consultation</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
