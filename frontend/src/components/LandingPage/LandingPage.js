import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../config";

// --- EMBEDDED SVG ICONS (Zero external dependencies) ---
const ArrowRightIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const AdIcon = () => (
  <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
  </svg>
);

const CodeIcon = () => (
  <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

const SocialIcon = () => (
  <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const ContentIcon = () => (
  <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
  </svg>
);

const StrategyIcon = () => (
  <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg className="w-5 h-5 text-cyan-400 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
  </svg>
);

const LandingPage = () => {
  const [latestBlogs, setLatestBlogs] = useState([]);

  useEffect(() => {
    // Fetch blog data from the API
    fetch(`${api}/blogs`)
      .then((response) => response.json())
      .then((data) => setLatestBlogs(data.slice(0, 3)))
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);

  const handleScroll = () => {
    const targetElement = document.getElementById('blogs');
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  const services = [
    {
      title: "Search Engine Optimization",
      desc: "We help you improve your Google ranking and increase your organic (non-paid) website traffic. SEO is more than just incorporating keywords.",
      icon: <SearchIcon />,
      borderHover: "hover:border-blue-500/50"
    },
    {
      title: "Search Engine Advertising",
      desc: "Search engine advertising, also known as pay-per-click advertising, helps you reach new customers and guarantees consistent traffic flow.",
      icon: <AdIcon />,
      borderHover: "hover:border-cyan-500/50"
    },
    {
      title: "Web Development & Design",
      desc: "Websites are the essence of your online presence. We create functional, customized websites with integrated SEO and lead tools.",
      icon: <CodeIcon />,
      borderHover: "hover:border-indigo-500/50"
    },
    {
      title: "Social Media Marketing",
      desc: "We help you with social media management and advertising to scale your business and reach new prospective clients.",
      icon: <SocialIcon />,
      borderHover: "hover:border-blue-500/50"
    },
    {
      title: "Content Marketing",
      desc: "Content marketing increases online visibility and brand awareness. We offer effective SEO copywriting that resonates with your audience.",
      icon: <ContentIcon />,
      borderHover: "hover:border-cyan-500/50"
    },
    {
      title: "Digital Marketing Strategy",
      desc: "Get your own digital marketing strategy built from scratch. Schedule a free consultation to get started today.",
      icon: <StrategyIcon />,
      borderHover: "hover:border-indigo-500/50"
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* Background Radial Glow */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.15),rgba(255,255,255,0))] pointer-events-none" />

      {/* 1. HERO / INTRO SECTION */}
      <section id="intro" className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Title & CTA */}
            <div className="lg:col-span-6 text-center lg:text-left space-y-6">
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
                Identify. <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">Create.</span> Disrupt.
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                In other words, we help your brand get the traction and reach it deserves. Find more customers and unearth new opportunities for growth.
              </p>

              <div className="pt-2 flex justify-center lg:justify-start">
                <Link
                  to="/contactus"
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold shadow-lg shadow-blue-600/30 hover:shadow-cyan-500/40 transition-all duration-300 transform hover:-translate-y-0.5 inline-flex items-center gap-2 group"
                >
                  <span>Let's Talk</span>
                  <ArrowRightIcon />
                </Link>
              </div>
            </div>

            {/* Right Column: Hero Image */}
            <div className="lg:col-span-6 flex justify-center relative">
              <div className="relative w-full max-w-lg">
                <div className="absolute inset-0 bg-blue-500/10 rounded-3xl blur-2xl" />
                <img
                  src="https://res.cloudinary.com/dpcfyn3si/image/upload/v1706954714/uploads/rai/cygmbowumcgiihfqj7vq.png"
                  alt="Digital Agency Web Illustration"
                  className="relative w-full h-auto object-contain transform hover:scale-105 transition-transform duration-700 drop-shadow-2xl"
                />
              </div>
            </div>

          </div>

          {/* Scroll Down Indicator */}
          <div
            id="scrollDown"
            onClick={handleScroll}
            className="mt-20 flex flex-col items-center justify-center cursor-pointer group space-y-2 opacity-80 hover:opacity-100 transition-opacity"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400 group-hover:text-cyan-400 transition-colors">
              Scroll down
            </span>
            <div className="p-2 rounded-full bg-slate-900 border border-slate-800 shadow-md">
              <ChevronDownIcon />
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHAT WE DO SECTION */}
      <section id="whatWeDo" className="py-20 bg-slate-900/60 border-y border-slate-800/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-400">Our Capabilities</h2>
            <h3 className="text-3xl sm:text-4xl font-bold text-white">What We Do</h3>
            <p className="text-slate-300">
              Discover our comprehensive suite of data-driven marketing services tailored to scale your brand.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className={`bg-slate-950 p-8 rounded-2xl border border-slate-800/80 ${service.borderHover} transition-all duration-300 hover:-translate-y-1.5 shadow-xl group`}
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:bg-blue-600/20 transition-colors">
                  {service.icon}
                </div>
                <h4 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {service.title}
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Explore More Button */}
          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold transition-all duration-300 hover:border-blue-500/50 shadow-md"
            >
              <span>Explore Our Services</span>
              <ArrowRightIcon />
            </Link>
          </div>

        </div>
      </section>

      {/* 3. LATEST BLOGS SECTION */}
      <section id="blogs" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-400">Insights & Articles</h2>
            <h3 className="text-3xl sm:text-4xl font-bold text-white">Latest Blogs</h3>
            <p className="text-slate-300">
              Stay ahead of the curve with expert strategies, industry news, and digital marketing insights.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestBlogs.map((blog, index) => (
              <div 
                key={index}
                className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1.5 shadow-xl flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={blog.imageUrl}
                      alt={blog.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                  </div>
                  <div className="p-6">
                    <h4 className="text-lg font-bold text-white mb-4 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                      {blog.title}
                    </h4>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0">
                  <Link
                    to="/blog"
                    className="inline-flex items-center justify-center w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold text-sm shadow-md shadow-blue-600/20 transition-all duration-300"
                  >
                    <span>Read More</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
};

export default LandingPage;