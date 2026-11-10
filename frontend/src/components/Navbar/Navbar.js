import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import auraLogo from '../../assets/auragrowth.jpg';

// Rotating promotional headlines for the agency ticker
const promoTexts = [
  "⚡ We Make Brands Impossible To Ignore",
  "Designed and develoeped by Leevy Otieno",
  "🚀 High-ROAS Paid Ad Campaigns",
  "💻 Custom Full-Stack Applications",
  "📈 Data-Driven Growth Marketing",
  "🎨 High-Converting Visual Systems",
  "Designed to Elevate Your Brand's Presence",
  "🌐 Cutting-Edge Web Development Solutions",
  "📊 Analytics & Insights for Smarter Decisions",
  "💡 Innovative Strategies for Maximum Impact",

];

const NavigationBar = () => {
  const [isNavOpen, setNavOpen] = useState(false);
  const [promoIndex, setPromoIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const location = useLocation();

  // Auto-rotate promotional advertising text every 3.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setPromoIndex((prevIndex) => (prevIndex + 1) % promoTexts.length);
        setFade(true);
      }, 300);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  const handleToggle = () => {
    setNavOpen(!isNavOpen);
  };

  const handleNavLinkClick = () => {
    setNavOpen(false);
  };

  const navItems = [
    { id: '', path: '/', label: 'Home' },
    { id: 'blog', path: '/blog', label: 'Blog' },
    { id: 'services', path: '/services', label: 'Services' },
    { id: 'about', path: '/about', label: 'About Us' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* FAR-LEFT LOGO & DYNAMIC PROMO BADGE */}
          <div className="flex items-center gap-4 lg:gap-6">
            {/* Logo pinned to the far left */}
            <Link to="/" className="flex items-center gap-3 group shrink-0" onClick={handleNavLinkClick}>
              <div className="relative overflow-hidden rounded-xl p-1 bg-gradient-to-r from-blue-600/30 via-cyan-500/30 to-indigo-600/30 group-hover:from-blue-500 group-hover:to-cyan-400 transition-all duration-300 shadow-lg shadow-blue-900/25">
                <img 
                  src={auraLogo} 
                  alt="AuraGrowth Logo" 
                  className="h-9 w-auto object-contain transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-lg font-extrabold text-white tracking-tight leading-none group-hover:text-cyan-400 transition-colors">
                  AURA<span className="text-cyan-400">GROWTH</span>
                </span>
                <span className="text-[10px] tracking-widest text-slate-400 font-semibold uppercase">
                  We Make Brands Impossible to Ignore
                </span>
              </div>
            </Link>

            {/* Desktop & Tablet Animated Advertising Badge */}
            <div className="hidden xl:flex items-center">
              <div className="relative group cursor-pointer overflow-hidden rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-1 backdrop-blur-md shadow-[0_0_15px_rgba(14,165,233,0.15)] hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(14,165,233,0.35)] transition-all duration-300">
                <div className="flex items-center space-x-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                  </span>

                  <span
                    className={`text-xs font-bold bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent transform transition-all duration-500 ease-in-out inline-block group-hover:scale-105 ${
                      fade
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-2"
                    }`}
                  >
                    {promoTexts[promoIndex]}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={handleNavLinkClick}
                  className={`relative px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 group ${
                    isActive 
                      ? 'text-cyan-400 bg-blue-950/60' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2.5px] bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full shadow-[0_0_8px_#38bdf8]" />
                  )}
                  {!isActive && (
                    <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-cyan-400 transition-all duration-300 group-hover:w-1/2 group-hover:left-1/4 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Contact CTA */}
          <div className="hidden md:block">
            <Link
              to="/contactus"
              onClick={handleNavLinkClick}
              className="relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-lg shadow-blue-600/30 hover:shadow-cyan-500/40 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group overflow-hidden"
            >
              <span className="absolute top-0 right-0 w-8 h-full bg-white/20 skew-x-12 -translate-x-32 group-hover:translate-x-32 transition-transform duration-1000 ease-in-out" />
              <span>Contact Us</span>
              <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden">
            <button
              onClick={handleToggle}
              type="button"
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/50 focus:outline-none transition-colors"
              aria-expanded={isNavOpen}
              aria-label="Toggle navigation"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center relative">
                <span className={`block w-5 h-0.5 bg-current transform transition-all duration-300 ease-in-out ${isNavOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`} />
                <span className={`block w-5 h-0.5 bg-current transform transition-all duration-300 ease-in-out ${isNavOpen ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`block w-5 h-0.5 bg-current transform transition-all duration-300 ease-in-out ${isNavOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`} />
              </div>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-slate-950/95 border-b border-slate-800/90 ${
          isNavOpen ? 'max-h-[30rem] opacity-100 py-4' : 'max-h-0 opacity-0 py-0'
        }`}
      >
        <div className="px-4 space-y-2">
          {/* Mobile Animated Advertising Badge */}
          <div className="py-2.5 px-3 bg-cyan-950/40 rounded-xl border border-cyan-500/30 mb-3 flex items-center space-x-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-xs font-bold text-cyan-400 transition-all duration-300">
              {promoTexts[promoIndex]}
            </span>
          </div>

          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={handleNavLinkClick}
                className={`block px-4 py-3 rounded-xl text-base font-semibold transition-all duration-200 ${
                  isActive 
                    ? 'text-cyan-400 bg-blue-950/80 border border-blue-500/30' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          <div className="pt-2">
            <Link
              to="/contactus"
              onClick={handleNavLinkClick}
              className="block w-full text-center px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-base shadow-lg shadow-blue-600/30"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavigationBar;