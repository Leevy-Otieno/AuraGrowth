import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import api from '../../config';

// All digital marketing, creative production, and online tool services
const fallbackServices = [
 
 {
    id: "web-app-dev",
    title: "Full-Stack Web App Development",
    description: "Custom, scalable web applications built with modern frameworks like React, Node.js, and cloud backends.",
    icon: "🌐",
    features: ["Custom Web Apps", "REST & GraphQL", "Cloud Databases"]
  },
  {
    id: "mobile-app-dev",
    title: "Mobile Application Development",
    description: "Cross-platform and native iOS & Android apps built for exceptional user retention.",
    icon: "📱",
    features: ["iOS & Android", "React Native", "App Store Launch"]
  },
   {
    id: "video-editing",
    title: "Video Editing & Motion Graphics",
    description: "High-retention cinematic video editing for YouTube, Reels, TikTok, and commercial ads.",
    icon: "🎥",
    features: ["Reels & TikToks", "Motion Graphics", "Color Grading"]
  },
  {
    id: "content-creation",
    title: "Content Creation & Production",
    description: "End-to-end strategic content creation, scripting, and brand storytelling.",
    icon: "🎬",
    features: ["Scriptwriting", "Content Calendars", "Multi-Platform Assets"]
  },
  {
    id: "graphic-design",
    title: "Graphic Design & Brand Visuals",
    description: "Stunning visual assets, social media carousels, ad banners, and brand kits.",
    icon: "🎨",
    features: ["Social Carousels", "Ad Creative Sets", "Brand Identity"]
  },
  {
    id: "ui-ux",
    title: "UI/UX Design & Web Architecture",
    description: "User-centered interface design, wireframing, and modern web experiences.",
    icon: "💻",
    features: ["Figma Wireframes", "User Journey Mapping", "Responsive UI"]
  },
  {
    id: "writers",
    title: "Professional Copywriting & Content",
    description: "Persuasive SEO copywriting, blog articles, whitepapers, and sales pages.",
    icon: "✍️",
    features: ["SEO Copywriting", "Sales Pages", "Thought Leadership"]
  },
  {
    id: "seo",
    title: "Search Engine Optimization (SEO)",
    description: "Dominating search engine results pages to drive sustainable organic traffic.",
    icon: "🔍",
    features: ["Technical Audits", "Keyword Strategy", "Backlink Acquisition"]
  },
  {
    id: "ppc",
    title: "Pay-Per-Click Advertising (PPC)",
    description: "Laser-targeted Google Ads and multi-channel paid acquisition campaigns.",
    icon: "⚡",
    features: ["Google Ads", "Negative Keyword Filtering", "ROAS Scaling"]
  },
  {
    id: "social-mgmt",
    title: "Social Media Management",
    description: "End-to-end community building, organic content curation, and daily scheduling.",
    icon: "📱",
    features: ["Community Management", "Daily Scheduling", "Platform Growth"]
  },
  {
    id: "social-boost",
    title: "Social Media Boosting & Ads",
    description: "Strategic paid post promotions and high-ROI social advertising campaigns.",
    icon: "🚀",
    features: ["Post Amplification", "Audience Targeting", "Engagement Optimization"]
  },
  {
    id: "email-mgmt",
    title: "Email Marketing & Automation",
    description: "Automated lifecycle funnels, newsletter campaigns, and retention sequences.",
    icon: "✉️",
    features: ["Automated Funnels", "Behavioral Triggers", "Retention Email"]
  }
];

const ServicesPage = () => {
  const [servicesList, setServicesList] = useState(fallbackServices);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Attempt to fetch services from backend; fall back automatically if offline/empty
    fetch(`${api}/services`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          // Map backend items if available, or keep rich fallback array
          setServicesList(data);
        } else {
          setServicesList(fallbackServices);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.warn("Backend unreached, displaying optimized services list.", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-blue-600 selection:text-white pt-32 pb-24">
      
      {/* Background Radial Glow */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.15),rgba(255,255,255,0))] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/60 border border-cyan-800/50 px-4 py-1.5 rounded-full inline-block">
            Our Expertise
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Full-Spectrum Digital Solutions
          </h1>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            From high-retention video editing and UI/UX design to enterprise SEO and targeted ad campaigns, we engineer growth for modern brands.
          </p>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <ClipLoader color="#38bdf8" loading={loading} size={60} />
            <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Loading Services...</p>
          </div>
        ) : (
          /* Grid of Services */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesList.map((service) => (
              <div 
                key={service.id}
                className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-blue-500/50 rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 group relative overflow-hidden"
              >
                {/* Accent Hover Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="space-y-6">
                  {/* Icon & Title */}
                  <div className="flex items-center gap-4">
                    <span className="text-4xl p-3 bg-slate-950 border border-slate-800 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </span>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {service.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {service.description}
                  </p>

                  {/* Feature Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {service.features.map((feat, idx) => (
                      <span 
                        key={idx}
                        className="text-xs bg-slate-950 border border-slate-800/80 text-slate-300 px-3 py-1 rounded-lg"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Explore Button */}
                <div className="pt-8">
                  <Link
                    to={`/services/${service.id}`}
                    className="inline-flex items-center justify-between w-full px-5 py-3 rounded-xl bg-slate-950 border border-slate-800 text-cyan-400 hover:text-white hover:bg-blue-600 hover:border-blue-500 text-sm font-semibold transition-all duration-300 group/btn"
                  >
                    <span>Explore Service</span>
                    <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default ServicesPage;