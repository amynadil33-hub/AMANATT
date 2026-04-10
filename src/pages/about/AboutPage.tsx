import React from 'react';
import { useParams, Link } from 'react-router-dom';

const pages: Record<string, { label: string; title: string; titleGold: string; breadcrumb: string; content: React.ReactNode }> = {
  'who-we-are': {
    label: 'COMPANY', title: 'Who We', titleGold: 'Are', breadcrumb: 'Who We Are',
    content: (
      <div className="space-y-8">
        <p className="text-gray-400 leading-relaxed text-lg">Amanat is the Maldives' premier Shariah-compliant fractional real estate investment platform. Founded in 2019, we bridge the gap between institutional-quality property assets and qualified individual investors seeking halal, asset-backed returns.</p>
        <p className="text-gray-400 leading-relaxed">Our platform enables investors to acquire fractional ownership stakes — called "Amanat" — in premium real estate developments across the Maldivian atolls. Every project is independently valued, legally structured through Special Purpose Vehicles, and certified under AAOIFI Shariah standards.</p>
        <div className="grid sm:grid-cols-3 gap-6 mt-10">
          {[{ v: '2019', l: 'Year Founded' }, { v: 'Malé', l: 'Headquarters' }, { v: '45+', l: 'Team Members' }].map(s => (
            <div key={s.l} className="card-premium p-5 text-center"><p className="font-serif text-3xl font-bold text-gold">{s.v}</p><p className="text-xs text-gray-400 mt-1">{s.l}</p></div>
          ))}
        </div>
        <div className="card-premium p-6 mt-8">
          <h3 className="font-serif text-xl font-bold text-white mb-4">Leadership Team</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {[{ name: 'Yusuf Al-Hamdan', role: 'Chief Executive Officer' }, { name: 'Dr. Ahmed Rasheed', role: 'Chief Investment Officer' }, { name: 'Fatima Hassan', role: 'Head of Compliance' }, { name: 'Ibrahim Naseer', role: 'Head of Operations' }].map(p => (
              <div key={p.name} className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold text-sm font-bold">{p.name.charAt(0)}</div>
                <div><p className="text-sm font-semibold text-white">{p.name}</p><p className="text-xs text-gray-400">{p.role}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  },
  'objectives': {
    label: 'COMPANY', title: 'Our', titleGold: 'Objectives', breadcrumb: 'Our Objectives',
    content: (
      <div className="space-y-6">
        {['Democratize access to premium Maldivian real estate for qualified investors worldwide', 'Maintain the highest standards of Shariah compliance across all investment structures', 'Deliver consistent, risk-adjusted returns through rigorous project selection and management', 'Build a transparent, regulated platform that sets the standard for Islamic real estate investment', 'Support sustainable development across the Maldives through responsible capital allocation', 'Establish a liquid secondary market for fractional real estate ownership by Q4 2026'].map((o, i) => (
          <div key={i} className="card-premium p-5 flex items-start gap-4">
            <span className="font-serif text-2xl font-bold text-gold/40">{String(i + 1).padStart(2, '0')}</span>
            <p className="text-gray-300 leading-relaxed">{o}</p>
          </div>
        ))}
      </div>
    )
  },
  'mission-vision': {
    label: 'COMPANY', title: 'Mission, Vision &', titleGold: 'Values', breadcrumb: 'Mission, Vision & Values',
    content: (
      <div className="space-y-10">
        <div className="card-premium p-8">
          <p className="section-label mb-3">OUR MISSION</p>
          <p className="text-xl text-gray-300 leading-relaxed font-serif">To provide qualified investors with transparent, Shariah-compliant access to premium Maldivian real estate through fractional ownership — delivering consistent returns while upholding the highest standards of Islamic finance.</p>
        </div>
        <div className="card-premium p-8">
          <p className="section-label mb-3">OUR VISION</p>
          <p className="text-xl text-gray-300 leading-relaxed font-serif">To become the leading Islamic real estate investment platform in the Indian Ocean region, setting the global standard for Shariah-compliant fractional property ownership.</p>
        </div>
        <div>
          <p className="section-label mb-6">OUR VALUES</p>
          <div className="grid sm:grid-cols-2 gap-6">
            {[{ t: 'Integrity', d: 'We operate with complete transparency and honesty in all dealings.' }, { t: 'Compliance', d: 'Shariah compliance is non-negotiable — every structure is independently certified.' }, { t: 'Excellence', d: 'We pursue the highest standards in project selection, management, and reporting.' }, { t: 'Trust', d: 'We build lasting relationships through consistent performance and open communication.' }].map(v => (
              <div key={v.t} className="card-premium p-6">
                <h3 className="font-serif text-lg font-bold text-gold mb-2">{v.t}</h3>
                <p className="text-sm text-gray-400">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  },
  'corporate': {
    label: 'COMPANY', title: 'Corporate', titleGold: 'Information', breadcrumb: 'Corporate Information',
    content: (
      <div className="space-y-8">
        <div className="card-premium p-6">
          <h3 className="font-serif text-xl font-bold text-white mb-4">Company Details</h3>
          <div className="space-y-3">
            {[['Legal Name', 'Amanat Investment Holdings Pvt Ltd'], ['Registration', 'C-0892/2019 (Maldives)'], ['Regulator', 'Maldives Capital Market Authority (CMDA)'], ['Shariah Board', 'Al-Baraka Shariah Supervisory Board'], ['Auditor', 'Deloitte Maldives'], ['Headquarters', 'Malé, Republic of Maldives']].map(([k, v]) => (
              <div key={k} className="flex justify-between py-2 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                <span className="text-sm text-gray-400">{k}</span><span className="text-sm text-white">{v}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card-premium p-6">
          <h3 className="font-serif text-xl font-bold text-white mb-4">Documents</h3>
          <div className="space-y-3">
            {['Annual Report 2025', 'Shariah Compliance Certificate', 'CMDA License', 'Company Memorandum'].map(d => (
              <div key={d} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                <span className="text-sm text-gray-300">{d}</span>
                <button className="text-xs text-gold hover:underline">Download PDF</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  },
  'investors': {
    label: 'INVESTOR RELATIONS', title: 'Our', titleGold: 'Investors', breadcrumb: 'Our Investors',
    content: (
      <div className="space-y-10">
        <p className="text-gray-400 leading-relaxed text-lg">Amanat serves 318 verified investors across 24 countries — from Maldivian nationals to international family offices and GCC institutional investors.</p>
        <div className="grid sm:grid-cols-3 gap-6">
          {[{ t: 'Individual HNWIs', d: 'High-net-worth individuals seeking Shariah-compliant passive income and real estate exposure. Minimum $250,000.' }, { t: 'Family Offices', d: 'Multi-generational wealth management vehicles seeking diversified, long-term Islamic real estate exposure. Typical: $2M–$20M.' }, { t: 'Institutional Investors', d: 'Islamic banks, takaful companies, and sovereign wealth funds allocating to Shariah-compliant alternative real estate.' }].map(c => (
            <div key={c.t} className="card-premium p-6">
              <h3 className="font-serif text-lg font-bold text-white mb-2">{c.t}</h3>
              <p className="text-sm text-gray-400">{c.d}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[{ v: '318', l: 'Total Investors' }, { v: '24', l: 'Countries' }, { v: '47%', l: 'Maldivian nationals' }, { v: '$84M', l: 'Under management' }].map(s => (
            <div key={s.l} className="card-premium p-5 text-center"><p className="font-serif text-3xl font-bold text-gold">{s.v}</p><p className="text-xs text-gray-400 mt-1">{s.l}</p></div>
          ))}
        </div>
      </div>
    )
  },
  'principles': {
    label: 'INVESTOR RELATIONS', title: 'Investment', titleGold: 'Principles', breadcrumb: 'Investment Principles',
    content: (
      <div className="space-y-6">
        {[{ t: 'Shariah Compliance First', d: 'Every investment structure must be independently certified under AAOIFI standards. No exceptions.' }, { t: 'Asset-Backed Security', d: 'All investments are secured against real property assets. No speculative or derivative instruments.' }, { t: 'Rigorous Due Diligence', d: 'Independent valuations, legal review, environmental assessment, and market analysis for every project.' }, { t: 'Transparent Governance', d: 'Regular reporting, independent audits, and full disclosure of fees, risks, and performance.' }, { t: 'Capital Preservation', d: 'Conservative underwriting with focus on downside protection and sustainable income generation.' }, { t: 'Diversification', d: 'Portfolio diversification across asset types, geographies, and risk profiles within the Maldives.' }].map((p, i) => (
          <div key={i} className="card-premium p-6">
            <h3 className="font-serif text-lg font-bold text-white mb-2">{p.t}</h3>
            <p className="text-sm text-gray-400">{p.d}</p>
          </div>
        ))}
      </div>
    )
  },
  'returns': {
    label: 'INVESTOR RELATIONS', title: 'Historical', titleGold: 'Returns', breadcrumb: 'Historical Returns',
    content: (
      <div className="space-y-10">
        <div className="rounded-xl p-5" style={{ backgroundColor: 'rgba(201,169,97,0.08)', borderLeft: '3px solid #C9A961' }}>
          <p className="text-sm text-gold">Past performance is not indicative of future results. All figures represent actual net profit distributions after fund manager fees. Capital is not guaranteed.</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[{ v: '7.2%', l: '2022 avg. net return' }, { v: '8.6%', l: '2023 avg. net return' }, { v: '9.1%', l: '2024 avg. net return' }, { v: '9.4%', l: '2025 avg. net return' }].map(s => (
            <div key={s.l} className="card-premium p-5 text-center"><p className="font-serif text-3xl font-bold text-gold">{s.v}</p><p className="text-xs text-gray-400 mt-1">{s.l}</p></div>
          ))}
        </div>
        <div>
          <p className="section-label mb-4">RETURNS BY PROJECT</p>
          <div className="card-premium overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                  {['Project', 'Type', '2022', '2023', '2024', '2025', 'Avg.', 'Status'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs text-gray-500 uppercase tracking-wider font-semibold">{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {[
                    { name: 'Malé Business Tower', type: 'Commercial', y: ['—', '—', '9.0%', '9.4%'], avg: '9.2%', status: 'Active' },
                    { name: 'Hulhumale Residences', type: 'Residential', y: ['7.2%', '7.8%', '8.1%', '8.3%'], avg: '7.9%', status: 'Exited' },
                    { name: 'Addu City Mixed', type: 'Mixed-Use', y: ['—', '—', '—', '9.8%'], avg: '9.8%', status: 'Active' },
                    { name: 'North Malé Office Park', type: 'Commercial', y: ['7.5%', '8.9%', '9.2%', '10.1%'], avg: '8.9%', status: 'Active' },
                  ].map((r, i) => (
                    <tr key={i} className="border-b" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
                      <td className="px-4 py-3 font-semibold text-white">{r.name}</td>
                      <td className="px-4 py-3 text-gray-400">{r.type}</td>
                      {r.y.map((v, j) => <td key={j} className="px-4 py-3 text-gray-300">{v}</td>)}
                      <td className="px-4 py-3 text-gold font-semibold">{r.avg}</td>
                      <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded text-xs ${r.status === 'Active' ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-gray-400'}`}>{r.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  },
  'risk-disclosures': {
    label: 'INVESTOR RELATIONS', title: 'Full Risk', titleGold: 'Disclosures', breadcrumb: 'Risk Disclosures',
    content: (
      <div className="space-y-6">
        <div className="rounded-xl p-5 bg-red-500/5 border border-red-500/10">
          <p className="text-sm text-red-400 font-semibold mb-2">Important Notice</p>
          <p className="text-sm text-gray-400">This page contains important risk disclosures. All prospective and current investors should read these disclosures carefully before making any investment decisions.</p>
        </div>
        {[
          { t: 'Market Risk', d: 'Real estate values can fluctuate due to economic conditions, interest rates, and market sentiment. The Maldivian property market may be affected by tourism cycles, climate events, and regulatory changes.' },
          { t: 'Liquidity Risk', d: 'Amanat investments are illiquid. There is currently no secondary market for fractional ownership units. Investors should be prepared to hold investments for the full stated duration.' },
          { t: 'Capital Risk', d: 'Capital is not guaranteed. Investors may lose some or all of their invested capital. Past performance is not indicative of future results.' },
          { t: 'Currency Risk', d: 'Investments are denominated in USD. Investors whose base currency is not USD may be exposed to exchange rate fluctuations.' },
          { t: 'Regulatory Risk', d: 'Changes in Maldivian law, tax regulations, or capital market rules could affect investment returns or the ability to operate the platform.' },
          { t: 'Concentration Risk', d: 'All investments are concentrated in Maldivian real estate. Geographic and sector concentration may increase risk.' },
        ].map((r, i) => (
          <div key={i} className="card-premium p-6">
            <h3 className="font-serif text-lg font-bold text-white mb-2">{r.t}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{r.d}</p>
          </div>
        ))}
      </div>
    )
  },
  'press': {
    label: 'COMPANY', title: 'Press &', titleGold: 'Media', breadcrumb: 'Press & Media',
    content: (
      <div className="space-y-6">
        <p className="text-gray-400 leading-relaxed">Latest news, press releases, and media coverage about Amanat and the Maldivian real estate investment market.</p>
        {[
          { date: 'March 2026', title: 'Amanat Announces $15M Ari Atoll Resort Development', desc: 'New luxury resort project opens for investment with projected 10.2% annual returns.' },
          { date: 'January 2026', title: 'Amanat Surpasses $84M in Assets Under Management', desc: 'Platform milestone reflects growing investor confidence in Shariah-compliant real estate.' },
          { date: 'November 2025', title: 'CMDA Approves Amanat Secondary Market Framework', desc: 'Regulatory approval paves the way for secondary trading of fractional ownership units in Q4 2026.' },
          { date: 'September 2025', title: 'Amanat Partners with Al-Baraka for Enhanced Shariah Oversight', desc: 'New partnership strengthens independent Shariah governance and certification processes.' },
        ].map((n, i) => (
          <div key={i} className="card-premium p-6">
            <p className="text-xs text-gold mb-2">{n.date}</p>
            <h3 className="font-serif text-lg font-bold text-white mb-2">{n.title}</h3>
            <p className="text-sm text-gray-400">{n.desc}</p>
          </div>
        ))}
      </div>
    )
  },
};

const AboutPage: React.FC = () => {
  const { section } = useParams();
  const page = pages[section || 'who-we-are'];
  if (!page) return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0B1121' }}><p className="text-gray-400">Page not found</p></div>;

  return (
    <div style={{ backgroundColor: '#0B1121' }}>
      <section className="py-16 lg:py-20 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-400">About Us</span>
          </div>
          <p className="section-label mb-4">{page.label}</p>
          <h1 className="font-serif text-4xl lg:text-6xl font-bold text-white">
            {page.title} <span className="italic text-gold">{page.titleGold}</span>
          </h1>
        </div>
      </section>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {page.content}
      </div>
    </div>
  );
};

export default AboutPage;
