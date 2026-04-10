import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CalculatorPage: React.FC = () => {
  const [amount, setAmount] = useState(500000);
  const [rate, setRate] = useState(9.4);
  const [years, setYears] = useState(5);

  const totalReturn = amount * (rate / 100) * years;
  const totalValue = amount + totalReturn;
  const annualIncome = amount * (rate / 100);
  const quarterlyIncome = annualIncome / 4;

  return (
    <div style={{ backgroundColor: '#0B1121' }}>
      <section className="py-16 lg:py-20 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-label mb-4">TOOLS</p>
          <h1 className="font-serif text-4xl lg:text-6xl font-bold text-white">Investment <span className="italic text-gold">Calculator</span></h1>
        </div>
      </section>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="card-premium p-6 space-y-6">
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Investment Amount (USD)</label>
              <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} className="input-dark" min={0} step={50000} />
              <input type="range" min={100000} max={10000000} step={50000} value={amount} onChange={e => setAmount(Number(e.target.value))} className="w-full mt-2 accent-[#C9A961]" />
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Expected Return (% p.a.)</label>
              <input type="number" value={rate} onChange={e => setRate(Number(e.target.value))} className="input-dark" min={0} max={20} step={0.1} />
              <input type="range" min={5} max={15} step={0.1} value={rate} onChange={e => setRate(Number(e.target.value))} className="w-full mt-2 accent-[#C9A961]" />
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Holding Period (Years)</label>
              <input type="number" value={years} onChange={e => setYears(Number(e.target.value))} className="input-dark" min={1} max={15} />
              <input type="range" min={1} max={15} step={1} value={years} onChange={e => setYears(Number(e.target.value))} className="w-full mt-2 accent-[#C9A961]" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="card-premium p-6">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total Projected Value</p>
              <p className="font-serif text-4xl font-bold text-gold">${totalValue.toLocaleString()}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="card-premium p-5"><p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total Return</p><p className="font-serif text-2xl font-bold text-white">${totalReturn.toLocaleString()}</p></div>
              <div className="card-premium p-5"><p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Annual Income</p><p className="font-serif text-2xl font-bold text-white">${annualIncome.toLocaleString()}</p></div>
              <div className="card-premium p-5"><p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Quarterly Income</p><p className="font-serif text-2xl font-bold text-white">${quarterlyIncome.toLocaleString()}</p></div>
              <div className="card-premium p-5"><p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Return on Investment</p><p className="font-serif text-2xl font-bold text-gold">{((totalReturn / amount) * 100).toFixed(1)}%</p></div>
            </div>
            <div className="rounded-xl p-4" style={{ backgroundColor: 'rgba(201,169,97,0.06)', borderLeft: '3px solid #C9A961' }}>
              <p className="text-xs text-gray-400">Projections are estimates based on stated return rates. Actual returns may vary. Past performance is not indicative of future results.</p>
            </div>
            <Link to="/apply" className="btn-gold w-full text-center block">Apply to Invest</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorPage;
