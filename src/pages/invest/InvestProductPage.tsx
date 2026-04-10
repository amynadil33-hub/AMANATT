import React from 'react';
import { useParams, Link } from 'react-router-dom';

const products: Record<string, { label: string; title: string; titleGold: string; intro: string; features: { t: string; d: string }[]; cta: string }> = {
  'real-estate': {
    label: 'INVESTMENT PRODUCT', title: 'Introduction to', titleGold: 'Real Estate', cta: 'Browse Projects',
    intro: 'Blocs enables qualified investors to own fractional stakes in premium Maldivian real estate developments. Each project is independently valued, legally structured through SPVs, and certified under AAOIFI Shariah standards.',
    features: [
      { t: 'Fractional Ownership', d: 'Own a fixed-value stake in premium real estate. Each Bloc represents proportional ownership in the underlying asset.' },
      { t: 'Shariah Structure', d: 'All investments structured as Musharakah (partnership) or Ijarah (lease). No interest charged or received.' },
      { t: 'Asset-Backed Returns', d: 'Returns generated from rental income and asset appreciation — secured against real property.' },
    ]
  },
  'vacation-rentals': {
    label: 'INVESTMENT PRODUCT', title: 'Vacation', titleGold: 'Rentals', cta: 'View Rental Projects',
    intro: 'Invest in Maldives resort and villa income pools — high-yield tourism assets generating premium rental returns from one of the world\'s most sought-after destinations.',
    features: [
      { t: 'Tourism Income', d: 'Maldives attracts 1.8M+ tourists annually. Resort occupancy rates consistently exceed 75% across premium properties.' },
      { t: 'Seasonal Yield', d: 'Peak season (November–April) generates premium rates. Year-round demand from diverse global markets.' },
      { t: 'Managed Operations', d: 'Professional resort management handles all operations. Investors receive passive income distributions.' },
    ]
  },
  'private-credit': {
    label: 'INVESTMENT PRODUCT', title: 'Private', titleGold: 'Credit Fund', cta: 'Apply to Invest',
    intro: 'The Blocs Private Credit Fund provides Murabaha and Ijarah financing to institutional real estate developers across the Maldives. Investors earn fixed profit-share returns secured against first-charge property assets.',
    features: [
      { t: 'Murabaha Structure', d: 'The fund purchases assets on behalf of borrowers and re-sells at a disclosed profit margin. Compliant with AAOIFI FAS 28. No interest charged or received.' },
      { t: 'First-Charge Security', d: 'All credit facilities are secured by first-ranking mortgages over Maldivian real estate assets, providing robust downside protection.' },
      { t: 'Predictable Monthly Returns', d: 'Fixed profit-share rates of 8–10% p.a. distributed monthly — income stability not available in equity-based investments.' },
    ]
  },
  'bonds-sukuks': {
    label: 'INVESTMENT PRODUCT', title: 'Bonds &', titleGold: 'Sukuks', cta: 'Subscribe to Sukuk',
    intro: 'Blocs issues AAOIFI-certified Sukuk Al-Ijarah backed by income-generating Maldivian real assets — a Shariah-compliant alternative to conventional bonds.',
    features: [
      { t: 'Sukuk Al-Ijarah', d: 'Each sukuk represents undivided proportional ownership in a lease asset. Investors receive lease rental income as their return — not interest.' },
      { t: 'AAOIFI Certified', d: 'All sukuk structures are reviewed and certified under AAOIFI Standard 17. Independent Shariah audit conducted annually by Al-Baraka SSB.' },
      { t: 'Secondary Market Q4 2026', d: 'Blocs sukuk are structured for secondary market trading on the Maldives Capital Market secondary platform launching Q4 2026.' },
    ]
  },
};

const InvestProductPage: React.FC = () => {
  const { product } = useParams();
  const p = products[product || 'real-estate'];
  if (!p) return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0B1121' }}><p className="text-gray-400">Product not found</p></div>;

  return (
    <div style={{ backgroundColor: '#0B1121' }}>
      <section className="py-16 lg:py-20 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-label mb-4">{p.label}</p>
          <h1 className="font-serif text-4xl lg:text-6xl font-bold text-white">
            {p.title} <span className="italic text-gold">{p.titleGold}</span>
          </h1>
        </div>
      </section>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="card-premium p-8 mb-12">
          <p className="text-gray-400 leading-relaxed text-lg mb-6">{p.intro}</p>
          <Link to="/apply" className="btn-gold">{p.cta} →</Link>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          {p.features.map(f => (
            <div key={f.t} className="card-premium p-6">
              <h3 className="font-serif text-lg font-bold text-white mb-2">{f.t}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{f.d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InvestProductPage;
