import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

type ResourceType = 'podcast' | 'interview' | 'case_study';

type ResourceItem = {
  id: string;
  type: ResourceType;
  title: string;
  slug: string | null;
  summary: string | null;
  content: string | null;
  image_url: string | null;
  publish_status: string;
  featured: boolean | null;
  author: string | null;
  category: string | null;
  duration: string | null;
  video_url: string | null;
  audio_url: string | null;
  returns_text: string | null;
  period_text: string | null;
  date_text: string | null;
  season: number | null;
  episode_number: number | null;
  created_at: string | null;
  updated_at: string | null;
};

const resourceTypeByRoute: Record<string, ResourceType> = {
  podcast: 'podcast',
  interviews: 'interview',
  'case-studies': 'case_study',
};

const resourceCopy: Record<ResourceType, { empty: string }> = {
  podcast: { empty: 'No podcast episodes are available yet. Please check back soon.' },
  interview: { empty: 'No expert interviews are available yet. Please check back soon.' },
  case_study: { empty: 'No case studies are available yet. Please check back soon.' },
};

const ResourceState: React.FC<{ message: string; tone?: 'default' | 'error' }> = ({ message, tone = 'default' }) => (
  <div className="card-premium p-6 text-center">
    <p className={`text-sm ${tone === 'error' ? 'text-red-300' : 'text-gray-400'}`}>{message}</p>
  </div>
);

const PodcastLoading: React.FC = () => (
  <div className="space-y-4">
    {[0, 1, 2].map((item) => (
      <div key={item} className="card-premium p-5 flex items-center gap-5 animate-pulse">
        <div className="w-12 h-12 rounded-full bg-gray-700 flex-shrink-0" />
        <div className="flex-1 min-w-0 space-y-2">
          <div className="h-4 bg-gray-700 rounded w-3/4" />
          <div className="h-3 bg-gray-800 rounded w-1/2" />
          <div className="h-3 bg-gray-800 rounded w-full" />
        </div>
        <div className="w-10 h-10 rounded-full bg-gray-700 flex-shrink-0" />
      </div>
    ))}
  </div>
);

const CardLoading: React.FC = () => (
  <div className="space-y-6">
    {[0, 1, 2].map((item) => (
      <div key={item} className="card-premium p-6 animate-pulse">
        <div className="h-3 bg-gray-700 rounded w-24 mb-4" />
        <div className="h-5 bg-gray-700 rounded w-3/4 mb-3" />
        <div className="h-4 bg-gray-800 rounded w-full" />
      </div>
    ))}
  </div>
);

const ResourcesPage: React.FC = () => {
  const { type } = useParams();
  const resourceType = type ? resourceTypeByRoute[type] : undefined;
  const [items, setItems] = useState<ResourceItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!resourceType) {
      return;
    }

    let isMounted = true;

    const loadResources = async () => {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('resource_items')
        .select('*')
        .eq('type', resourceType)
        .eq('publish_status', 'published');

      if (resourceType === 'podcast') {
        query = query.order('episode_number', { ascending: false, nullsFirst: false }).order('created_at', { ascending: false });
      } else {
        query = query.order('created_at', { ascending: false });
      }

      const { data, error: resourceError } = await query;

      if (!isMounted) {
        return;
      }

      if (resourceError) {
        setError('Unable to load resources right now. Please try again later.');
        setItems([]);
      } else {
        setItems((data ?? []) as ResourceItem[]);
      }

      setLoading(false);
    };

    loadResources();

    return () => {
      isMounted = false;
    };
  }, [resourceType]);

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
              { title: 'FAQ', desc: 'Answers to common questions about Amanat and investing.', href: '/faq' },
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
            <h1 className="font-serif text-4xl lg:text-6xl font-bold text-white">Amanat <span className="italic text-gold">Podcast</span></h1>
          </div>
        </section>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-gray-400 leading-relaxed mb-8">The Amanat Podcast explores Islamic finance, Maldivian real estate, and investment strategy. New episodes every two weeks. Available on Spotify, Apple Podcasts, and YouTube.</p>
          {loading ? <PodcastLoading /> : error ? <ResourceState message={error} tone="error" /> : items.length === 0 ? <ResourceState message={resourceCopy.podcast.empty} /> : (
            <div className="space-y-4">
              {items.map(ep => (
                <div key={ep.id} className="card-premium p-5 flex items-center gap-5">
                  <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-base font-bold text-white">EP {ep.episode_number ?? '—'} — {ep.title}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{ep.duration ?? 'Duration TBA'} · {ep.date_text ?? 'Date TBA'} · Season {ep.season ?? '—'}</p>
                    <p className="text-sm text-gray-400 mt-1 line-clamp-2">{ep.summary}</p>
                  </div>
                  <button className="w-10 h-10 rounded-full bg-gold flex items-center justify-center flex-shrink-0 hover:bg-gold/80 transition-colors">
                    <svg className="w-4 h-4 text-navy ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  </button>
                </div>
              ))}
            </div>
          )}
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
          {loading ? <CardLoading /> : error ? <ResourceState message={error} tone="error" /> : items.length === 0 ? <ResourceState message={resourceCopy.interview.empty} /> : (
            <div className="space-y-6">
              {items.map(i => (
                <div key={i.id} className="card-premium p-6">
                  <span className="text-xs text-gold font-semibold uppercase tracking-wider">{i.category}</span>
                  <h3 className="font-serif text-lg font-bold text-white mt-2 mb-2">{i.title}</h3>
                  <p className="text-sm text-gray-400">{i.summary}</p>
                </div>
              ))}
            </div>
          )}
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
          {loading ? <CardLoading /> : error ? <ResourceState message={error} tone="error" /> : items.length === 0 ? <ResourceState message={resourceCopy.case_study.empty} /> : (
            <div className="space-y-6">
              {items.map(c => (
                <div key={c.id} className="card-premium p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-sm text-gold font-semibold">{c.returns_text}</span>
                    <span className="text-xs text-gray-500">{c.period_text ?? c.duration}</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-white mb-2">{c.title}</h3>
                  <p className="text-sm text-gray-400">{c.summary}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default ResourcesPage;
