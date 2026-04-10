import React from 'react';
import { useParams, Link } from 'react-router-dom';

const podcastEpisodes = [
  { ep: 24, title: 'The Future of Sukuk in Indian Ocean Markets', duration: '48 min', date: '8 April 2026', season: 3, desc: 'CEO Yusuf Al-Hamdan discusses the growing sukuk market with AAOIFI\'s Secretary-General and the head of Islamic capital markets at Maldives Stock Exchange.' },
  { ep: 23, title: 'Maldives Resort Real Estate: A Deep Dive into Valuations', duration: '52 min', date: '25 March 2026', season: 3, desc: 'JLL\'s Head of Maldives Hospitality Valuations discusses the drivers of resort asset appreciation and what investors should look for in due diligence.' },
  { ep: 22, title: 'Shariah Compliance in Practice: A Conversation with our Shariah Board', duration: '44 min', date: '10 March 2026', season: 3, desc: 'Dr. Ahmed Rasheed sits down with two members of Al-Baraka\'s Shariah Supervisory Board to discuss how structures are reviewed and certified.' },
  { ep: 21, title: 'Building Generational Wealth: Islamic Finance for Families', duration: '39 min', date: '24 February 2026', season: 3, desc: 'How Maldivian families can use Blocs and Musharakah structures to build and preserve inter-generational wealth in compliance with Islamic inheritance law.' },
  { ep: 20, title: 'Fractional Real Estate: Global Trends and the Maldives Opportunity', duration: '56 min', date: '7 February 2026', season: 3, desc: 'A comparative study of fractional real estate platforms in Dubai, Malaysia, and the Maldives — what\'s working, what isn\'t, and where the opportunity lies.' },
];

const interviews = [
  { title: 'Dr. Aisha Didi on Islamic Finance Regulation in the Maldives', category: 'Regulation', desc: 'Former CMDA Commissioner discusses the evolving regulatory framework for Islamic capital markets.' },
  { title: 'Mohamed Waheed: Building Sustainable Resorts', category: 'Development', desc: 'Leading Maldivian architect on sustainable resort design and its impact on property valuations.' },
  { title: 'Sheikh Abdullah Al-Manea on AAOIFI Standards', category: 'Shariah', desc: 'Senior Shariah scholar explains the certification process and common compliance challenges.' },
  { title: 'Sarah Chen: Family Office Allocation to Maldives Real Estate', category: 'Investment', desc: 'Hong Kong-based family office advisor on why Asian investors are increasing Maldives exposure.' },
];

const caseStudies = [
  { title: 'Hulhumale Residences: From Development to Exit', returns: '7.9% avg.', duration: '4 Years', desc: 'How 200 premium apartments in Hulhumale Phase II delivered consistent returns and a successful exit for 42 investors.' },
  { title: 'North Malé Office Park: Commercial Real Estate Returns', returns: '8.9% avg.', duration: '5 Years (Ongoing)', desc: 'Analysis of the commercial office market in Greater Malé and how this project has outperformed initial projections.' },
  { title: 'Baa Atoll Luxury Villas: Ultra-Premium Tourism Assets', returns: '12.1% avg.', duration: '6 Years', desc: 'Inside the development of 24 exclusive villas within UNESCO Biosphere Reserve — the highest-returning project in our portfolio.' },
];

const ResourcesPage: React.FC = () => {
  const { type } = useParams();

  if (!type) {
    return (
      <div style={{ backgroundColor: '#0B1121' }}>
        <section className="py-16 lg:py-20 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="section-label mb-4">RESOURCES</p>
            <h1 className="font-serif text-4xl lg:text-6xl font-bold text-white">Insights & <span className="italic text-gold">Education</span></h1>
          </div>
        </section>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { title: 'Podcast', desc: 'Islamic finance, Maldivian real estate, and investment strategy.', href: '/resources/podcast' },
              { title: 'Expert Interviews', desc: 'In-depth conversations with industry leaders and scholars.', href: '/resources/interviews' },
              { title: 'Case Studies', desc: 'Detailed analysis of completed projects and returns.', href: '/resources/case-studies' },
              { title: 'FAQ', desc: 'Answers to common questions about Blocs and investing.', href: '/faq' },
            ].map(r => (
              <Link key={r.title} to={r.href} className="card-premium p-6 group">
                <h3 className="font-serif text-xl font-bold text-white mb-2 group-hover:text-gold transition-colors">{r.title}</h3>
                <p className="text-sm text-gray-400 mb-4">{r.desc}</p>
                <span className="text-sm text-gold font-semibold">Explore →</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === 'podcast') {
    return (
      <div style={{ backgroundColor: '#0B1121' }}>
        <section className="py-16 lg:py-20 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="section-label mb-4">RESOURCES</p>
            <h1 className="font-serif text-4xl lg:text-6xl font-bold text-white">Blocs <span className="italic text-gold">Podcast</span></h1>
          </div>
        </section>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-gray-400 leading-relaxed mb-8">The Blocs Podcast explores Islamic finance, Maldivian real estate, and investment strategy. New episodes every two weeks. Available on Spotify, Apple Podcasts, and YouTube.</p>
          <div className="space-y-4">
            {podcastEpisodes.map(ep => (
              <div key={ep.ep} className="card-premium p-5 flex items-center gap-5">
                <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif text-base font-bold text-white">EP {ep.ep} — {ep.title}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{ep.duration} · {ep.date} · Season {ep.season}</p>
                  <p className="text-sm text-gray-400 mt-1 line-clamp-2">{ep.desc}</p>
                </div>
                <button className="w-10 h-10 rounded-full bg-gold flex items-center justify-center flex-shrink-0 hover:bg-gold/80 transition-colors">
                  <svg className="w-4 h-4 text-navy ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === 'interviews') {
    return (
      <div style={{ backgroundColor: '#0B1121' }}>
        <section className="py-16 lg:py-20 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="section-label mb-4">RESOURCES</p>
            <h1 className="font-serif text-4xl lg:text-6xl font-bold text-white">Expert <span className="italic text-gold">Interviews</span></h1>
          </div>
        </section>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-6">
            {interviews.map(i => (
              <div key={i.title} className="card-premium p-6">
                <span className="text-xs text-gold font-semibold uppercase tracking-wider">{i.category}</span>
                <h3 className="font-serif text-lg font-bold text-white mt-2 mb-2">{i.title}</h3>
                <p className="text-sm text-gray-400">{i.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === 'case-studies') {
    return (
      <div style={{ backgroundColor: '#0B1121' }}>
        <section className="py-16 lg:py-20 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="section-label mb-4">RESOURCES</p>
            <h1 className="font-serif text-4xl lg:text-6xl font-bold text-white">Investment <span className="italic text-gold">Case Studies</span></h1>
          </div>
        </section>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-6">
            {caseStudies.map(c => (
              <div key={c.title} className="card-premium p-6">
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-sm text-gold font-semibold">{c.returns}</span>
                  <span className="text-xs text-gray-500">{c.duration}</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-white mb-2">{c.title}</h3>
                <p className="text-sm text-gray-400">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default ResourcesPage;
