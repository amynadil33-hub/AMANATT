import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  useEffect(() => {
    supabase.from('projects').select('*').order('created_at', { ascending: false })
      .then(({ data }) => { if (data) setProjects(data); setLoading(false); });
  }, []);

  const filtered = useMemo(() => {
    return projects.filter(p => {
      if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.location?.toLowerCase().includes(search.toLowerCase())) return false;
      if (statusFilter !== 'all' && p.status !== statusFilter) return false;
      if (typeFilter !== 'all' && p.category !== typeFilter) return false;
      return true;
    });
  }, [projects, search, statusFilter, typeFilter]);

  const categories = [...new Set(projects.map(p => p.category).filter(Boolean))];
  const statuses = ['all', 'ongoing', 'funded', 'upcoming', 'closed'];

  const getStatusBadge = (status: string) => {
    const cls = status === 'ongoing' ? 'badge-ongoing' : status === 'funded' ? 'badge-funded' : status === 'upcoming' ? 'badge-upcoming' : 'badge-closed';
    return <span className={cls}>{status}</span>;
  };

  return (
    <div style={{ backgroundColor: '#0B1121' }}>
      {/* Hero */}
      <section className="py-16 lg:py-20 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-label mb-4">ACTIVE PORTFOLIO</p>
          <div className="flex items-end justify-between">
            <h1 className="font-serif text-4xl lg:text-6xl font-bold text-white">
              Investment <span className="italic text-gold">Projects</span>
            </h1>
            <p className="hidden lg:block text-sm text-gray-400">Maldives-wide real estate · Shariah certified</p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="mb-6">
              <input type="text" placeholder="Search projects..." value={search} onChange={e => setSearch(e.target.value)}
                className="input-dark" />
            </div>
            <div className="mb-6">
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-400 mb-3">STATUS</p>
              {statuses.map(s => (
                <button key={s} onClick={() => setStatusFilter(s)}
                  className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm mb-1 transition-all ${statusFilter === s ? 'bg-gold/10 text-gold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                  {s === 'all' ? 'All Projects' : s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
            <div>
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-400 mb-3">ASSET TYPE</p>
              <button onClick={() => setTypeFilter('all')}
                className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm mb-1 transition-all ${typeFilter === 'all' ? 'bg-gold/10 text-gold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                All Types
              </button>
              {categories.map(c => (
                <button key={c} onClick={() => setTypeFilter(c)}
                  className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm mb-1 transition-all ${typeFilter === c ? 'bg-gold/10 text-gold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                  {c}
                </button>
              ))}
            </div>
          </aside>

          {/* Project Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid md:grid-cols-2 gap-6">
                {[1,2,3,4].map(i => (
                  <div key={i} className="card-premium h-96 animate-pulse" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-400">No projects match your filters.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {filtered.map(p => (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
