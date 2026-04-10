import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="border-t" style={{ backgroundColor: '#080D1A', borderColor: 'rgba(255,255,255,0.06)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-4 lg:mb-0">
            <Link to="/" className="font-serif text-2xl font-bold text-white italic">Blocs</Link>
            <p className="text-sm text-gray-400 mt-3 leading-relaxed max-w-xs">
              Premium fractional ownership across the Maldives atolls. Asset-backed, Shariah-certified.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <span className="text-xs font-semibold text-gold tracking-wide">Shariah Certified</span>
              <span className="text-xs text-gray-500">|</span>
              <span className="text-xs text-gray-500">CMDA Regulated</span>
            </div>
          </div>

          {/* Invest */}
          <div>
            <h4 className="text-xs font-sans font-semibold tracking-[0.15em] uppercase text-gray-400 mb-4">Invest</h4>
            <ul className="space-y-2.5">
              <li><Link to="/projects" className="text-sm text-gray-400 hover:text-white transition-colors">Projects</Link></li>
              <li><Link to="/invest/real-estate" className="text-sm text-gray-400 hover:text-white transition-colors">Real Estate</Link></li>
              <li><Link to="/invest/vacation-rentals" className="text-sm text-gray-400 hover:text-white transition-colors">Vacation Rentals</Link></li>
              <li><Link to="/invest/private-credit" className="text-sm text-gray-400 hover:text-white transition-colors">Private Credit</Link></li>
              <li><Link to="/invest/bonds-sukuks" className="text-sm text-gray-400 hover:text-white transition-colors">Bonds & Sukuks</Link></li>
              <li><Link to="/calculator" className="text-sm text-gray-400 hover:text-white transition-colors">Calculator</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-sans font-semibold tracking-[0.15em] uppercase text-gray-400 mb-4">Company</h4>
            <ul className="space-y-2.5">
              <li><Link to="/about/who-we-are" className="text-sm text-gray-400 hover:text-white transition-colors">Who We Are</Link></li>
              <li><Link to="/about/objectives" className="text-sm text-gray-400 hover:text-white transition-colors">Our Objectives</Link></li>
              <li><Link to="/about/mission-vision" className="text-sm text-gray-400 hover:text-white transition-colors">Mission & Vision</Link></li>
              <li><Link to="/about/corporate" className="text-sm text-gray-400 hover:text-white transition-colors">Corporate Info</Link></li>
              <li><Link to="/about/press" className="text-sm text-gray-400 hover:text-white transition-colors">Press & Media</Link></li>
              <li><Link to="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Investor Relations */}
          <div>
            <h4 className="text-xs font-sans font-semibold tracking-[0.15em] uppercase text-gray-400 mb-4">Investor Relations</h4>
            <ul className="space-y-2.5">
              <li><Link to="/about/investors" className="text-sm text-gray-400 hover:text-white transition-colors">Our Investors</Link></li>
              <li><Link to="/about/principles" className="text-sm text-gray-400 hover:text-white transition-colors">Investment Principles</Link></li>
              <li><Link to="/about/returns" className="text-sm text-gray-400 hover:text-white transition-colors">Historical Returns</Link></li>
              <li><Link to="/about/risk-disclosures" className="text-sm text-gray-400 hover:text-white transition-colors">Risk Disclosures</Link></li>
              <li><Link to="/faq" className="text-sm text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-sans font-semibold tracking-[0.15em] uppercase text-gray-400 mb-4">Resources</h4>
            <ul className="space-y-2.5">
              <li><Link to="/resources/podcast" className="text-sm text-gray-400 hover:text-white transition-colors">Podcast</Link></li>
              <li><Link to="/resources/interviews" className="text-sm text-gray-400 hover:text-white transition-colors">Expert Interviews</Link></li>
              <li><Link to="/resources/case-studies" className="text-sm text-gray-400 hover:text-white transition-colors">Case Studies</Link></li>
              <li><Link to="/apply" className="text-sm text-gray-400 hover:text-white transition-colors">Apply to Invest</Link></li>
            </ul>
          </div>
        </div>

        {/* Risk Disclaimer */}
        <div className="rounded-xl p-5 mb-8" style={{ backgroundColor: 'rgba(201,169,97,0.06)', borderLeft: '3px solid #C9A961' }}>
          <p className="text-xs text-gray-400 leading-relaxed">
            <span className="text-gold font-semibold">Risk Disclaimer:</span> All investments carry risk. Past performance is not indicative of future results. 
            The value of investments and income from them may go down as well as up. Capital is not guaranteed. Blocs investments are 
            illiquid and suitable only for qualified investors who can bear the economic risk of a complete loss. All investment structures 
            are Shariah-certified under AAOIFI standards and regulated by the Maldives Capital Market Authority (CMDA).
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-6 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <p className="text-xs text-gray-500 mb-3 md:mb-0">
            &copy; {new Date().getFullYear()} Blocs Investment Platform. All rights reserved. Developed by Musalhu Advertising.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/about/risk-disclosures" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link to="/about/risk-disclosures" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">Terms of Service</Link>
            <Link to="/about/risk-disclosures" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
