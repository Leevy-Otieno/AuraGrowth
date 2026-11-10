
import React, { useState } from 'react';
import auraLogo from '../../assets/auragrowth.jpg';
import brian from '../../assets/brianleso.jpeg';
import leevy from '../../assets/leevy.jpeg';
import luka from '../../assets/luka.jpeg';
import tyresse from '../../assets/tyresse.jpeg';

// --- EMBEDDED SVG ICONS (Zero external dependencies) ---
const SparklesIcon = () => (
  <svg className="w-4 h-4 text-cyan-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const TrendingUpIcon = () => (
  <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const TargetIcon = () => (
  <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0-6C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
  </svg>
);

const ZapIcon = () => (
  <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const BarChartIcon = () => (
  <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-5 h-5 text-cyan-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const AboutUsPage = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', service: 'SEO Strategy', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* Background Radial Glow */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.15),rgba(255,255,255,0))] pointer-events-none" />

      {/* 1. NAVBAR SECTION */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <a href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-0.5 shadow-lg shadow-blue-500/20 group-hover:shadow-cyan-500/40 transition-shadow">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <img 
                                  src={auraLogo} 
                                  alt="weblogo" 
                                  className="h-9 w-auto object-contain transform group-hover:scale-105 transition-transform duration-300"
                                />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-extrabold text-white tracking-tight leading-none">
                  Aura<span className="text-cyan-400">Growth</span>
                </span>
                <span className="text-[10px] tracking-widest text-slate-400 font-semibold uppercase">We Make Brands Impossible to Ignore</span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="/" className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors">Home</a>
              <a href="#who-we-are" className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors">Who We Are</a>
              <a href="#history" className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors">Our History</a>
              <a href="#team" className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors">Meet The Team</a>
              <a href="#contact" className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors">Contact</a>
            </nav>

            {/* Header CTA Button */}
            <div className="hidden md:block">
              <a 
                href="#contact" 
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-sm font-semibold shadow-md shadow-blue-600/20 transition-all duration-300 transform hover:-translate-y-0.5 inline-block"
              >
                Get Started
              </a>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setNavOpen(!navOpen)}
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              >
                {navOpen ? '✕' : '☰'}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {navOpen && (
          <div className="md:hidden bg-slate-950 border-b border-slate-800 px-4 pt-4 pb-6 space-y-3">
            <a href="/" onClick={() => setNavOpen(false)} className="block text-slate-300 hover:text-cyan-400 font-medium text-sm py-1">Home</a>
            <a href="#who-we-are" onClick={() => setNavOpen(false)} className="block text-slate-300 hover:text-cyan-400 font-medium text-sm py-1">Who We Are</a>
            <a href="#history" onClick={() => setNavOpen(false)} className="block text-slate-300 hover:text-cyan-400 font-medium text-sm py-1">Our History</a>
            <a href="#team" onClick={() => setNavOpen(false)} className="block text-slate-300 hover:text-cyan-400 font-medium text-sm py-1">Meet The Team</a>
            <a 
              href="#contact" 
              onClick={() => setNavOpen(false)} 
              className="block w-full text-center py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold text-sm shadow-md"
            >
              Get Started
            </a>
          </div>
        )}
      </header>

      {/* 2. HERO SECTION */}
      <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/30 text-blue-400 text-xs sm:text-sm font-semibold tracking-wide">
                <SparklesIcon />
                <span>Award-Winning Digital Marketing Agency</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Accelerate Your Business With <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">AuraGrowth</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Welcome to AuraGrowth Marketing. We are dedicated to delivering exceptional results and cultivating enduring relationships. Our mission is to empower businesses, elevate marketing strategies, and achieve unparalleled success in the digital realm.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a 
                  href="#contact" 
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold shadow-lg shadow-blue-500/25 hover:shadow-cyan-500/40 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
                >
                  <span>Empower Your Business</span>
                  <ArrowRightIcon />
                </a>
                <a 
                  href="#who-we-are" 
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-200 font-semibold transition-all duration-300 flex items-center justify-center"
                >
                  <span>Discover Our Story</span>
                </a>
              </div>

              {/* Metrics */}
              <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0 text-left">
                <div>
                  <p className="text-2xl font-bold text-blue-400">100%</p>
                  <p className="text-xs text-slate-400">Data-Driven Strategy</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-cyan-400">10+</p>
                  <p className="text-xs text-slate-400">Certified Experts</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-indigo-400">2024</p>
                  <p className="text-xs text-slate-400">Founded Year</p>
                </div>
              </div>
            </div>

            {/* Right Featured Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl group">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80" 
                  alt="Digital Marketing Team" 
                  className="w-full h-[420px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 flex items-center gap-4 shadow-xl">
                  <div className="p-3 bg-blue-600/20 rounded-lg">
                    <TrendingUpIcon />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm">Growth-Oriented Campaigns</h4>
                    <p className="text-xs text-slate-300">Driving positive, measurable impact for global clients.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. WHO WE ARE */}
      <section id="who-we-are" className="py-20 bg-slate-900/60 border-y border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-400">Who We Are</h2>
            <h3 className="text-3xl sm:text-4xl font-bold text-white">Your Trusted Digital Marketing Partner</h3>
            <p className="text-slate-300 leading-relaxed">
              At AuraGrowth Marketing, every pulse resonates with the promise of unparalleled success. We take pride in being the trusted partner for businesses seeking to thrive in the digital landscape, whether you're a burgeoning startup or a well-established franchise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800/80 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1.5 group">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                <TargetIcon />
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">Strategic Planning</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Bespoke web and digital strategies aligned perfectly with your high-level strategic objectives to drive long-term ROI.
              </p>
            </div>

            <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800/80 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1.5 group">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-6 group-hover:bg-cyan-600 transition-colors duration-300">
                <ZapIcon />
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">Creative Innovation</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Engaging digital campaigns, compelling copywriting, and vibrant creative assets that captivate your target audience.
              </p>
            </div>

            <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800/80 hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1.5 group">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors duration-300">
                <BarChartIcon />
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">Technical Mastery</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Full-spectrum data-driven web marketing, SEO optimization, analytics, and precision execution across channels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FOUNDER & HISTORY */}
      <section id="history" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Image Grid */}
            <div className="lg:col-span-6 order-2 lg:order-1 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img 
                  src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80" 
                  alt="Strategy Session" 
                  className="rounded-xl object-cover h-64 w-full border border-slate-800 shadow-md hover:opacity-90 transition-opacity"
                />
                <div className="p-6 bg-gradient-to-br from-blue-900/40 to-slate-900 rounded-xl border border-blue-500/30">
                  <p className="text-3xl font-bold text-white mb-1">2024</p>
                  <p className="text-xs text-slate-300 uppercase font-semibold">Founded Year</p>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="p-6 bg-gradient-to-br from-cyan-900/40 to-slate-900 rounded-xl border border-cyan-500/30">
                  <p className="text-3xl font-bold text-white mb-1">Global</p>
                  <p className="text-xs text-slate-300 uppercase font-semibold">Vision & Reach</p>
                </div>
                <img 
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80" 
                  alt="Modern Workplace" 
                  className="rounded-xl object-cover h-64 w-full border border-slate-800 shadow-md hover:opacity-90 transition-opacity"
                />
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                Dedicated to Your Success Since Day One
              </h2>

              <p className="text-slate-300 leading-relaxed">
                Founded in 2024 by <span className="text-blue-400 font-semibold">Leevy Otieno</span>, AuraGrowth Marketing was ignited by a deep-seated passion for business and technology. Recognizing the transformative power of the digital landscape, Leevy Otieno set out to harness its potential to drive positive change for brands.
              </p>

              <p className="text-slate-300 leading-relaxed">
                What began as a solitary endeavor driven by high passion and problem-solving skills has evolved into a dynamic, full-service digital marketing agency catering to enterprises worldwide. As we expand our global horizons, customer satisfaction remains our ultimate goal.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <CheckIcon />
                  <span className="text-slate-200 text-sm">Passion-driven strategy and customer-first execution</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckIcon />
                  <span className="text-slate-200 text-sm">Expanding services to empower international markets</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckIcon />
                  <span className="text-slate-200 text-sm">Seamless campaign development for enterprises & startups</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. MEET OUR TEAM */}
      <section id="team" className="py-20 bg-slate-900/60 border-t border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-400">Premier Digital Marketing Partners</h2>
            <h3 className="text-3xl sm:text-4xl font-bold text-white">Meet The Main Team Leaders</h3>
            <p className="text-slate-300">
              Our dedicated team consists of over 10 highly skilled professionals who excel in strategic planning, creative innovation, and technical mastery to ensure the success of your digital campaigns.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden hover:border-blue-500/50 transition-all duration-300 group">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={leevy}
                  alt="Leevy Otieno" 
                  className="w-full h-full object-contain transform transition-transform duration-500 ease-out group-hover:scale-125 z-10"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              </div>
              <div className="p-6 text-center">
                <h4 className="text-lg font-bold text-white">Leevy Otieno</h4>
                <p className="text-xs text-blue-400 font-semibold mb-3">Founder & Lead Strategist</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Passionate about technology, driving innovation, and scaling global digital strategies.
                </p>
              </div>
            </div>
            <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden hover:border-blue-500/50 transition-all duration-300 group">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={tyresse}
                  alt="Tyresse Abdi" 
                  className="w-full h-full object-contain transform transition-transform duration-500 ease-out group-hover:scale-125 z-10"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              </div>
              <div className="p-6 text-center">
                <h4 className="text-lg font-bold text-white">Tyresse Abdi</h4>
                <p className="text-xs text-blue-400 font-semibold mb-3">Creative & Content Strategist</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Crafting compelling narratives and visual content that resonate with audiences and drive engagement.
                 
                </p>
              </div>
            </div>

            <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden hover:border-cyan-500/50 transition-all duration-300 group">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={brian} 
                  alt="Brian Otieno" 
                 className="w-full h-full object-contain transform transition-transform duration-500 ease-out group-hover:scale-125 z-10"
  />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              </div>
              <div className="p-6 text-center">
                <h4 className="text-lg font-bold text-white">Brian Otieno</h4>
                <p className="text-xs text-cyan-400 font-semibold mb-3">AI Engineer</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Specializing in data-driven search strategies and high-converting funnel design.
                </p>
              </div>
            </div>

            <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden hover:border-indigo-500/50 transition-all duration-300 group">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={luka} 
                  alt="Luka Mwendwa" 
                  className="w-full h-full object-contain transform transition-transform duration-500 ease-out group-hover:scale-125 z-10"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              </div>
              <div className="p-6 text-center">
                <h4 className="text-lg font-bold text-white">Luka Mwendwa</h4>
                <p className="text-xs text-indigo-400 font-semibold mb-3">Finance, accounting, risk and Asset management</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Crafting narrative campaigns that resonate emotionally and visually with audiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION FORM */}
      <section id="contact" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-950/90 via-slate-900 to-slate-950 rounded-3xl border border-blue-500/30 p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
              
              <div className="lg:col-span-6 space-y-6">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                  Looking to Increase Your Business?
                </h2>

                <p className="text-slate-300 leading-relaxed">
                  Whether you're seeking assistance with strategy, content marketing, search engine optimization, or any other aspect, we're here to lend a hand. Let us know your needs, and we'll promptly respond to help you elevate your business to new heights.
                </p>
              </div>

              <div className="lg:col-span-6 bg-slate-950/80 p-8 rounded-2xl border border-slate-800 shadow-xl">
                {submitted ? (
                  <div className="text-center py-12 space-y-4">
                    <h3 className="text-2xl font-bold text-white">Message Received!</h3>
                    <p className="text-slate-300 text-sm">
                      Thank you for reaching out. An AuraGrowth specialist will respond to you shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <h3 className="text-xl font-bold text-white mb-2">Request a Free Consultation</h3>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Your Name</label>
                      <input 
                        type="text" 
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700/80 text-white focus:outline-none focus:border-blue-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Email Address</label>
                      <input 
                        type="email" 
                        required
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700/80 text-white focus:outline-none focus:border-blue-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Service Requested</label>
                      <select 
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700/80 text-white focus:outline-none focus:border-blue-500 text-sm"
                      >
                        <option>Search Engine Optimization (SEO)</option>
                        <option>Content & Brand Strategy</option>
                        <option>Pay-Per-Click Marketing (PPC)</option>
                        <option>Web Solutions & Architecture</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Message</label>
                      <textarea 
                        rows={3}
                        required
                        placeholder="Tell us about your business goals..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700/80 text-white focus:outline-none focus:border-blue-500 text-sm"
                      ></textarea>
                    </div>

                    <button 
                      type="submit"
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold shadow-lg shadow-blue-600/30 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                    >
                      <span>Get Started Now</span>
                      <ArrowRightIcon />
                    </button>
                  </form>
                )}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 border-t border-slate-800 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} Aura Growth Marketing. Founded by Leevy Otieno. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutUsPage;
