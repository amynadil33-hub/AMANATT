import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

const tiers = [
  { name: 'Platinum', min: '$5,000,000', benefits: ['Dedicated relationship manager', 'Priority access to new projects', 'Monthly private investor briefings', 'Customised profit-share negotiations', 'Annual Shariah audit report', 'Airport lounge access (partner)'] },
  { name: 'Gold', min: '$1,000,000 – $4,999,999', benefits: ['Shared relationship manager', 'Early access to new listings', 'Quarterly investor calls', 'Enhanced reporting dashboard', 'Annual portfolio review'] },
  { name: 'Silver', min: '$250,000 – $999,999', benefits: ['Standard investor support', 'Access to all listed projects', 'Quarterly performance reports', 'Digital membership card', 'Investor community access'] },
];

const MembershipPage: React.FC = () => {
  const { profile } = useAuth();
  const [flipped, setFlipped] = useState(false);
  const [displayName, setDisplayName] = useState(profile?.full_name || 'INVESTOR');
  const tier = profile?.membership_tier || 'Silver';
  const memberNumber = `AMANAT •••• •••• ${String(profile?.id || '0000').slice(-4).toUpperCase()}`;
  const joinYear = profile?.created_at ? new Date(profile.created_at).getFullYear() : new Date().getFullYear();

  return (
    <div>
      <p className="section-label mb-2">INVESTOR MEMBERSHIP</p>
      <h1 className="font-serif text-3xl font-bold text-white mb-1">Your <span className="text-gold">Membership Card</span></h1>
      <p className="text-gray-400 mb-8">Your Amanat membership card grants access to the platform, identifies your investor tier, and serves as proof of your Shariah-certified investment status.</p>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Card */}
        <div>
          <div onClick={() => setFlipped(!flipped)} className="cursor-pointer">
            <div className={`relative w-full max-w-md mx-auto transition-transform duration-700 ${flipped ? '' : ''}`} style={{ aspectRatio: '1.6/1' }}>
              {/* Front */}
              {!flipped ? (
                <div className="absolute inset-0 rounded-2xl p-6 flex flex-col justify-between" style={{ background: 'linear-gradient(135deg, #0F1629 0%, #1A2340 50%, #0F1629 100%)', border: '1px solid rgba(201,169,97,0.2)' }}>
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-xl font-bold text-white italic">Amanat</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-gold tracking-wider">SHARIAH CERTIFIED</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gold/20 text-gold">{tier.toUpperCase()}</span>
                    </div>
                  </div>
                  <div>
                    <div className="w-10 h-7 rounded bg-gold/30 mb-4" />
                    <p className="font-mono text-sm text-gray-300 tracking-[0.3em] mb-1">{memberNumber}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-white tracking-wider">{displayName.toUpperCase()}</p>
                      <div className="text-right">
                        <p className="text-[10px] text-gray-500">MEMBER SINCE</p>
                        <p className="text-sm font-semibold text-white">{joinYear}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 rounded-2xl p-6 flex flex-col justify-between" style={{ background: 'linear-gradient(135deg, #1A2340 0%, #0F1629 100%)', border: '1px solid rgba(201,169,97,0.2)' }}>
                  <div className="h-10 bg-gray-700 rounded -mx-6 mt-2" />
                  <div>
                    <p className="text-[10px] text-gray-500 mb-1">INVESTOR ID</p>
                    <p className="text-xs text-gray-300 font-mono">{profile?.id || 'N/A'}</p>
                    <p className="text-[10px] text-gray-500 mt-3 leading-relaxed">This card certifies the holder as a verified investor on the Amanat platform. All investments are Shariah-certified under AAOIFI standards.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">Click card to flip</p>
          <div className="flex justify-center gap-3 mt-4">
            <button className="btn-outline-gold !py-2 !px-4 !text-xs">Print Card</button>
            <button className="btn-gold !py-2 !px-4 !text-xs">Download PNG</button>
          </div>
          <div className="card-premium p-5 mt-6">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">CUSTOMISE CARD</p>
            <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Display Name</label>
            <input type="text" value={displayName} onChange={e => setDisplayName(e.target.value)} className="input-dark" placeholder="Name on card" />
          </div>
        </div>

        {/* Tiers */}
        <div className="space-y-4">
          <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-2">MEMBERSHIP TIERS</p>
          {tiers.map(t => (
            <div key={t.name} className={`card-premium p-6 ${t.name === tier ? 'border-gold/30' : ''}`}>
              <h3 className="font-serif text-xl font-bold text-gold text-center mb-1">{t.name}</h3>
              <p className="text-xs text-gray-400 text-center mb-4">Investment {t.min}</p>
              <ul className="space-y-2">
                {t.benefits.map(b => (
                  <li key={b} className="flex items-center gap-2 text-sm text-gray-300">
                    <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MembershipPage;
