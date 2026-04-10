import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams();
  const { user } = useAuth();
  const [project, setProject] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [investAmount, setInvestAmount] = useState(1);

  useEffect(() => {
    if (!slug) return;
    supabase.from('projects').select('*').eq('slug', slug).single()
      .then(({ data }) => {
        if (data) {
          setProject(data);
          setInvestAmount(1);
          supabase.from('projects').select('*').neq('id', data.id).limit(3)
            .then(({ data: rel }) => { if (rel) setRelated(rel); });
        }
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0B1121' }}><p className="text-gray-400">Loading...</p></div>;
  if (!project) return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0B1121' }}><p className="text-gray-400">Project not found.</p></div>;

  const fundedPct = project.funding_goal > 0 ? Math.round((project.funded_amount / project.funding_goal) * 100) : 0;
  const estimatedReturn = (investAmount * (project.minimum_investment || 0) * (project.expected_return || 0) / 100);

  return (
    <div style={{ backgroundColor: '#0B1121' }}>
      {/* Hero */}
      <section className="relative h-64 lg:h-80 overflow-hidden">
        <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1121] via-[#0B1121]/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-3">
              <span className="px-2 py-1 rounded text-xs bg-white/10 backdrop-blur text-white">Shariah Certified</span>
              <span className={project.status === 'ongoing' ? 'badge-ongoing' : project.status === 'funded' ? 'badge-funded' : 'badge-upcoming'}>{project.status}</span>
            </div>
            <h1 className="font-serif text-3xl lg:text-5xl font-bold text-white">{project.title}</h1>
            <p className="text-gray-300 mt-2">{project.location} · {project.category}</p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {[
                { label: 'Expected Return', value: `${project.expected_return}% p.a.`, gold: true },
                { label: 'Holding Period', value: project.duration },
                { label: 'Minimum Investment', value: `$${(project.minimum_investment || 0).toLocaleString()}` },
                { label: 'Risk Level', value: project.risk_level },
              ].map((m, i) => (
                <div key={i} className="card-premium p-4">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{m.label}</p>
                  <p className={`font-serif text-xl font-bold ${m.gold ? 'text-gold' : 'text-white'}`}>{m.value}</p>
                </div>
              ))}
            </div>

            {/* Funding Progress */}
            <div className="card-premium p-6 mb-8">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-white">Funding Progress</p>
                <p className="text-sm text-gold font-semibold">{fundedPct}%</p>
              </div>
              <div className="h-3 rounded-full bg-white/5 mb-3">
                <div className="h-full rounded-full bg-gold transition-all" style={{ width: `${fundedPct}%` }} />
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>${(project.funded_amount / 1000000).toFixed(1)}M raised</span>
                <span>${(project.funding_goal / 1000000).toFixed(1)}M goal</span>
              </div>
            </div>

            {/* Overview */}
            <div className="mb-10">
              <h2 className="font-serif text-2xl font-bold text-white mb-4">Investment Overview</h2>
              <p className="text-gray-400 leading-relaxed">{project.description}</p>
            </div>

            {/* Details Grid */}
            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              <div className="card-premium p-5">
                <h3 className="font-serif text-lg font-bold text-white mb-3">Financial Structure</h3>
                <div className="space-y-3">
                  <div className="flex justify-between"><span className="text-sm text-gray-400">Profit Share Model</span><span className="text-sm text-white">{project.profit_share}</span></div>
                  <div className="flex justify-between"><span className="text-sm text-gray-400">Distribution</span><span className="text-sm text-white">Quarterly</span></div>
                  <div className="flex justify-between"><span className="text-sm text-gray-400">Structure</span><span className="text-sm text-white">SPV / Musharakah</span></div>
                  <div className="flex justify-between"><span className="text-sm text-gray-400">Currency</span><span className="text-sm text-white">USD</span></div>
                </div>
              </div>
              <div className="card-premium p-5">
                <h3 className="font-serif text-lg font-bold text-white mb-3">Project Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between"><span className="text-sm text-gray-400">Location</span><span className="text-sm text-white">{project.location}</span></div>
                  <div className="flex justify-between"><span className="text-sm text-gray-400">Asset Type</span><span className="text-sm text-white">{project.category}</span></div>
                  <div className="flex justify-between"><span className="text-sm text-gray-400">Duration</span><span className="text-sm text-white">{project.duration}</span></div>
                  <div className="flex justify-between"><span className="text-sm text-gray-400">Risk Level</span><span className="text-sm text-white">{project.risk_level}</span></div>
                </div>
              </div>
            </div>

            {/* Risk Disclosure */}
            <div className="rounded-xl p-5 mb-10" style={{ backgroundColor: 'rgba(201,169,97,0.06)', borderLeft: '3px solid #C9A961' }}>
              <p className="text-xs text-gold font-semibold mb-2">RISK DISCLOSURE</p>
              <p className="text-xs text-gray-400 leading-relaxed">
                Past performance is not indicative of future results. All investments carry risk including the potential loss of principal. 
                This investment is illiquid and suitable only for qualified investors. Returns are projected and not guaranteed.
              </p>
            </div>
          </div>

          {/* Investment Panel */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="card-premium p-6 lg:sticky lg:top-24">
              <h3 className="font-serif text-lg font-bold text-white mb-4">Invest in This Project</h3>
              <div className="mb-4">
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Number of Amanat</label>
                <div className="flex items-center gap-3">
                  <button onClick={() => setInvestAmount(Math.max(1, investAmount - 1))} className="w-10 h-10 rounded-lg border border-gray-700 text-white hover:border-gold transition-colors flex items-center justify-center">-</button>
                  <span className="font-serif text-2xl font-bold text-white flex-1 text-center">{investAmount}</span>
                  <button onClick={() => setInvestAmount(investAmount + 1)} className="w-10 h-10 rounded-lg border border-gray-700 text-white hover:border-gold transition-colors flex items-center justify-center">+</button>
                </div>
              </div>
              <div className="space-y-3 mb-6 py-4 border-y" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Investment Amount</span>
                  <span className="text-sm font-semibold text-white">${(investAmount * (project.minimum_investment || 0)).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Est. Annual Return</span>
                  <span className="text-sm font-semibold text-gold">${estimatedReturn.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Return Rate</span>
                  <span className="text-sm font-semibold text-gold">{project.expected_return}% p.a.</span>
                </div>
              </div>
              {user ? (
                <Link to="/apply" className="btn-gold w-full text-center block">Apply to Invest</Link>
              ) : (
                <div>
                  <Link to="/login" className="btn-gold w-full text-center block mb-3">Sign In to Invest</Link>
                  <p className="text-xs text-gray-500 text-center">Don't have an account? <Link to="/signup" className="text-gold">Register</Link></p>
                </div>
              )}
            </div>
          </aside>
        </div>

        {/* Related Projects */}
        {related.length > 0 && (
          <section className="mt-16 pt-12 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <h2 className="font-serif text-2xl font-bold text-white mb-8">Related Projects</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map(p => (
                <Link key={p.id} to={`/projects/${p.slug}`} className="card-premium p-0 overflow-hidden group">
                  <div className="h-40 overflow-hidden">
                    <img src={p.image_url} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-lg font-bold text-white mb-1">{p.title}</h3>
                    <p className="text-sm text-gray-400">{p.location}</p>
                    <p className="text-sm text-gold font-semibold mt-2">{p.expected_return}% p.a.</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailPage;
