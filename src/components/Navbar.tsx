import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Navbar: React.FC = () => {
  const { user, signOut, isAdmin, isDemo, profile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleDropdownEnter = (name: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setActiveDropdown(name);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 200);
  };

  useEffect(() => { setMobileOpen(false); setActiveDropdown(null); }, [location.pathname]);

  const investNowItems = [
    { label: 'Introduction to Real Estate', desc: 'Foundations, Shariah structures & how Blocs works', href: '/invest/real-estate' },
    { label: 'Vacation Rentals', desc: 'Maldives resort & villa income pools — high-yield tourism assets', href: '/invest/vacation-rentals' },
    { label: 'Private Credit Fund', desc: 'Murabaha financing for institutional real estate projects', href: '/invest/private-credit' },
    { label: 'Bonds & Sukuks', desc: 'AAOIFI-certified sukuk backed by Maldivian real assets', href: '/invest/bonds-sukuks' },
  ];

  const aboutItems = [
    { group: 'COMPANY', items: [
      { label: 'Who We Are', href: '/about/who-we-are' },
      { label: 'Our Objectives', href: '/about/objectives' },
      { label: 'Mission, Vision & Values', href: '/about/mission-vision' },
      { label: 'Corporate Info', href: '/about/corporate' },
      { label: 'Press', href: '/about/press' },
    ]},
    { group: 'INVESTOR RELATIONS', items: [
      { label: 'Our Investors', href: '/about/investors' },
      { label: 'Investment Principles', href: '/about/principles' },
      { label: 'Historical Returns', href: '/about/returns' },
      { label: 'Full Risk Disclosures', href: '/about/risk-disclosures' },
    ]},
  ];

  const resourceItems = [
    { label: 'Podcast', href: '/resources/podcast' },
    { label: 'Expert Interviews', href: '/resources/interviews' },
    { label: 'Case Studies', href: '/resources/case-studies' },
    { label: 'FAQ', href: '/faq' },
  ];

  const isAdminUser = isAdmin || (isDemo && profile?.role === 'admin');

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b" style={{ backgroundColor: '#0B1121', borderColor: 'rgba(255,255,255,0.06)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="font-serif text-2xl font-bold text-white italic">Blocs</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link to="/" className="px-3 py-2 text-sm font-sans text-gray-300 hover:text-white transition-colors">Home</Link>
            <Link to="/projects" className="px-3 py-2 text-sm font-sans text-gray-300 hover:text-white transition-colors">Projects</Link>

            {/* Invest Now Dropdown */}
            <div className="relative" onMouseEnter={() => handleDropdownEnter('invest')} onMouseLeave={handleDropdownLeave}>
              <button className="px-3 py-2 text-sm font-sans text-gray-300 hover:text-white transition-colors flex items-center gap-1">
                Invest Now
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              {activeDropdown === 'invest' && (
                <div className="absolute top-full left-0 mt-1 w-96 rounded-xl border p-4 shadow-2xl" style={{ backgroundColor: '#151C2F', borderColor: 'rgba(255,255,255,0.08)' }}>
                  <p className="section-label mb-3">INVESTMENT PRODUCTS</p>
                  {investNowItems.map((item) => (
                    <Link key={item.href} to={item.href} className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                      <div>
                        <p className="text-sm font-semibold text-white">{item.label}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* About Us Dropdown */}
            <div className="relative" onMouseEnter={() => handleDropdownEnter('about')} onMouseLeave={handleDropdownLeave}>
              <button className="px-3 py-2 text-sm font-sans text-gray-300 hover:text-white transition-colors flex items-center gap-1">
                About Us
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              {activeDropdown === 'about' && (
                <div className="absolute top-full left-0 mt-1 w-72 rounded-xl border p-4 shadow-2xl" style={{ backgroundColor: '#151C2F', borderColor: 'rgba(255,255,255,0.08)' }}>
                  {aboutItems.map((group) => (
                    <div key={group.group} className="mb-3 last:mb-0">
                      <p className="section-label mb-2">{group.group}</p>
                      {group.items.map((item) => (
                        <Link key={item.href} to={item.href} className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">{item.label}</Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div className="relative" onMouseEnter={() => handleDropdownEnter('resources')} onMouseLeave={handleDropdownLeave}>
              <button className="px-3 py-2 text-sm font-sans text-gray-300 hover:text-white transition-colors flex items-center gap-1">
                Resources
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              {activeDropdown === 'resources' && (
                <div className="absolute top-full left-0 mt-1 w-56 rounded-xl border p-3 shadow-2xl" style={{ backgroundColor: '#151C2F', borderColor: 'rgba(255,255,255,0.08)' }}>
                  {resourceItems.map((item) => (
                    <Link key={item.href} to={item.href} className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">{item.label}</Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/calculator" className="px-3 py-2 text-sm font-sans text-gray-300 hover:text-white transition-colors">Calculator</Link>
            {user && <Link to="/portal" className="px-3 py-2 text-sm font-sans text-gray-300 hover:text-white transition-colors">Portfolio</Link>}
            {isAdminUser && <Link to="/admin" className="px-3 py-2 text-sm font-sans text-red-400 hover:text-red-300 transition-colors">Admin</Link>}
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center space-x-3">
            <span className="text-xs font-sans font-semibold text-gold tracking-wide">Shariah Certified</span>
            {user ? (
              <div className="flex items-center gap-3">
                {isDemo && <span className="text-[10px] bg-gold/10 text-gold px-2 py-0.5 rounded font-semibold">DEMO</span>}
                <Link to="/portal" className="btn-outline-gold !py-2 !px-4 !text-xs">My Portal</Link>
                <button onClick={() => { signOut(); navigate('/'); }} className="text-sm text-gray-400 hover:text-white transition-colors">Sign Out</button>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-sm font-sans text-gray-300 hover:text-white transition-colors">Login</Link>
                <Link to="/apply" className="btn-gold !py-2 !px-5 !text-xs">Apply Now</Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-gray-300 hover:text-white p-2">
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t" style={{ backgroundColor: '#0B1121', borderColor: 'rgba(255,255,255,0.06)' }}>
          <div className="px-4 py-4 space-y-2">
            <Link to="/" className="block py-2 text-sm text-gray-300 hover:text-white">Home</Link>
            <Link to="/projects" className="block py-2 text-sm text-gray-300 hover:text-white">Projects</Link>
            <Link to="/invest/real-estate" className="block py-2 text-sm text-gray-300 hover:text-white">Real Estate Investment</Link>
            <Link to="/invest/vacation-rentals" className="block py-2 text-sm text-gray-300 hover:text-white">Vacation Rentals</Link>
            <Link to="/invest/private-credit" className="block py-2 text-sm text-gray-300 hover:text-white">Private Credit Fund</Link>
            <Link to="/invest/bonds-sukuks" className="block py-2 text-sm text-gray-300 hover:text-white">Bonds & Sukuks</Link>
            <Link to="/about/who-we-are" className="block py-2 text-sm text-gray-300 hover:text-white">About Us</Link>
            <Link to="/resources/podcast" className="block py-2 text-sm text-gray-300 hover:text-white">Resources</Link>
            <Link to="/faq" className="block py-2 text-sm text-gray-300 hover:text-white">FAQ</Link>
            <Link to="/contact" className="block py-2 text-sm text-gray-300 hover:text-white">Contact</Link>
            <Link to="/calculator" className="block py-2 text-sm text-gray-300 hover:text-white">Calculator</Link>
            {user ? (
              <>
                <Link to="/portal" className="block py-2 text-sm text-gold">My Portal</Link>
                {isAdminUser && <Link to="/admin" className="block py-2 text-sm text-red-400">Admin Dashboard</Link>}
                <button onClick={() => { signOut(); navigate('/'); }} className="block py-2 text-sm text-gray-400">Sign Out</button>
              </>
            ) : (
              <div className="flex gap-3 pt-3">
                <Link to="/login" className="btn-outline-gold !py-2 !px-4 !text-xs flex-1 text-center">Login</Link>
                <Link to="/apply" className="btn-gold !py-2 !px-4 !text-xs flex-1 text-center">Apply Now</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
