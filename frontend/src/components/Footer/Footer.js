import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 py-12 relative z-10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          
          {/* Copyright Text */}
          <p className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} AuraGrowth Digital Marketing. All Rights Reserved.
          </p>

          {/* Social Media Logos */}
          <div className="flex items-center gap-4">
            <a 
              href="#social" 
              className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:border-cyan-500/50 hover:bg-blue-600/10 transition-all duration-300 group"
              aria-label="Social Link"
            >
              <img 
                className="w-5 h-5 object-contain filter brightness-0 invert opacity-70 group-hover:opacity-100 transition-opacity"
                src="https://res.cloudinary.com/dpcfyn3si/image/upload/v1706617641/Wabeler/ktzoghgtys5x4al7o3wb.png"
                alt="social-logo" 
              />
            </a>

            <a 
              href="#social" 
              className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:border-cyan-500/50 hover:bg-blue-600/10 transition-all duration-300 group"
              aria-label="Social Link"
            >
              <img 
                className="w-5 h-5 object-contain filter brightness-0 invert opacity-70 group-hover:opacity-100 transition-opacity"
                src="https://res.cloudinary.com/dpcfyn3si/image/upload/v1706617641/Wabeler/nmdcgqxcn2b60f7fokbq.png"
                alt="social-logo" 
              />
            </a>

            <a 
              href="#social" 
              className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:border-cyan-500/50 hover:bg-blue-600/10 transition-all duration-300 group"
              aria-label="Social Link"
            >
              <img 
                className="w-5 h-5 object-contain filter brightness-0 invert opacity-70 group-hover:opacity-100 transition-opacity"
                src="https://res.cloudinary.com/dpcfyn3si/image/upload/v1706617641/Wabeler/ulntztj0icjfivajoctb.png"
                alt="social-logo" 
              />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;