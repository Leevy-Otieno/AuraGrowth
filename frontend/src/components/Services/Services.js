import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../config";

// Complete 13-service master dataset with African visual assets & full descriptions
const fallbackServices = [
  {
    id: "web-app-dev",
    title: "Full-Stack Web App Development",
    description: "Architecting high-performance, enterprise-grade web applications from scratch. We engineer secure REST & GraphQL APIs, implement robust cloud database schemas, and build lightning-fast user interfaces using modern React ecosystems to handle massive, concurrent user traffic seamlessly.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    features: ["Enterprise React Architecture", "Secure Node/Express Backends", "High-Concurrency Cloud Databases"]
  },
  {
    id: "mobile-app-dev",
    title: "Mobile Application Development",
    description: "Developing cross-platform and native iOS and Android mobile solutions engineered for exceptional user retention. Leveraging React Native and Flutter, we deliver fluid gesture animations, offline-first capabilities, and frictionless deployment pipelines straight to the App Store and Google Play.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    features: ["Cross-Platform Native Speed", "Advanced Gesture Animations", "Strict App Store Compliance"]
  },
  {
    id: "cloud-consulting",
    title: "Cloud Consulting & Infrastructure",
    description: "Expert guidance and implementation for migrating to and optimizing your infrastructure on leading cloud platforms like AWS, Azure, and Google Cloud Platform. We ensure maximum uptime, zero-downtime deployments, and robust security protocols.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    features: ["Cloud Strategy & Migration", "Infrastructure-as-Code", "Cost Optimization & Security Audits"]
  },
  {
    id: "video-editing",
    title: "Video Editing & Motion Graphics",
    description: "Crafting thumb-stopping cinematic video packages optimized for algorithmic distribution. Our post-production workflow integrates dynamic kinetic typography, immersive sound design, color grading, and rapid narrative pacing designed to capture peak viewer attention in the first three seconds.",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80",
    features: ["Algorithmic Watch-Time Optimization", "Custom Motion Graphics", "Cinematic Color Grading"]
  },
  {
    id: "content-creation",
    title: "Content Creation & Production",
    description: "Building comprehensive, multi-channel storytelling engines that position your brand as an industry authority. We manage deep-dive research, multi-platform scriptwriting, structured editorial content calendars, and cross-format asset distribution designed to build organic trust.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    features: ["Strategic Content Calendars", "Authoritative Scriptwriting", "Multi-Platform Asset Syndication"]
  },
  {
    id: "graphic-design",
    title: "Graphic Design & Brand Visuals",
    description: "Translating brand identity into unforgettable visual touchpoints. Our senior creative team constructs high-converting social carousels, dynamic display ad suites, pitch decks, and rigorous visual brand systems that establish instant market authority and recognition.",
    image: "https://images.unsplash.com/photo-1542744094-3a31243364d0?auto=format&fit=crop&w=800&q=80",
    features: ["High-Converting Ad Creatives", "Cohesive Brand Identity Systems", "Engaging Social Carousels"]
  },
  {
    id: "ui-ux",
    title: "UI/UX Design & Architecture",
    description: "Eliminating digital friction through rigorous user research, interactive wireframing, and psychological user-journey mapping. We architect intuitive digital experiences that guide consumers effortlessly from initial discovery to high-value conversion points.",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80",
    features: ["Comprehensive Figma Wireframes", "Behavioral User Journey Mapping", "Conversion-Focused UX Architecture"]
  },
  {
    id: "writers",
    title: "Professional Copywriting & Content",
    description: "Leveraging persuasive copywriting frameworks and technical documentation expertise to convert casual readers into loyal brand advocates. Every sentence is meticulously tuned to balance emotional consumer hooks with deep search engine visibility.",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80",
    features: ["Conversion-Optimized Sales Pages", "Technical Documentation", "SEO-Infused Thought Leadership"]
  },
  {
    id: "social-mgmt",
    title: "Social Media Management",
    description: "Transforming passive social channels into vibrant community hubs. We manage day-to-day organic content curation, active audience engagement, comment moderation, and real-time community nurturing that builds deep consumer trust and brand affinity.",
    image: "https://images.unsplash.com/photo-1531548714889-671d8c514751?auto=format&fit=crop&w=800&q=80",
    features: ["Active Community Moderation", "Daily Cross-Platform Scheduling", "Organic Authority Building"]
  },
  {
    id: "social-boost",
    title: "Social Media Boosting & Ads",
    description: "Amplifying organic momentum using targeted social advertising algorithms. We convert high-performing organic posts into aggressive customer acquisition engines by micro-targeting precise buyer personas across demographics and interest vectors.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
    features: ["Strategic Post Amplification", "Precise Demographic Micro-Targeting", "Predictable Inbound Lead Generation"]
  },
  {
    id: "seo",
    title: "Search Engine Optimization (SEO)",
    description: "Dominating competitive search engine results pages through holistic technical audits, high-intent keyword positioning, semantic content optimization, and elite white-hat backlink acquisition strategies designed for sustainable, algorithm-proof compounding growth.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    features: ["Rigorous Technical Site Audits", "Semantic Keyword Positioning", "Authority Backlink Acquisition"]
  },
  {
    id: "ppc",
    title: "Pay-Per-Click Advertising (PPC)",
    description: "Engineering hyper-targeted paid acquisition campaigns across Google Ads and major social networks. We leverage continuous multivariate ad testing, negative keyword filtering, and advanced attribution modeling to maximize return on ad spend (ROAS) from day one.",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
    features: ["Google Ads & Social Scaling", "Multivariate Ad Testing", "Advanced ROAS Attribution Tracking"]
  },
  {
    id: "email-mgmt",
    title: "Email Marketing & Automation",
    description: "Maximizing lifetime customer value by turning your subscriber list into a reliable profit center. We architect automated behavioral welcome funnels, targeted segmentation newsletters, and automated cart-abandonment retention sequences.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    features: ["Automated Behavioral Lifecycle Funnels", "Targeted Segmentation Newsletters", "High-Retention Recovery Sequences"]
  }
];

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${api}/services`);
        if (!response.ok) throw new Error("API Error");
        const data = await response.json();
        
        // If API returns all 13 items, use DB data; otherwise merge with full fallback set
        if (Array.isArray(data) && data.length >= 13) {
          const mergedData = data.map((item, idx) => ({
            ...item,
            image: item.image || fallbackServices[idx % fallbackServices.length].image,
            features: item.features || fallbackServices[idx % fallbackServices.length].features
          }));
          setServices(mergedData);
        } else {
          setServices(fallbackServices);
        }
      } catch (err) {
        setServices(fallbackServices);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased pt-32 pb-24 relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.15),rgba(255,255,255,0))] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/80 border border-cyan-800/60 px-4 py-1.5 rounded-full inline-block shadow-lg">
            Full-Spectrum Digital Capabilities
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
            Engineering & Growth Solutions
          </h1>
          <p className="text-slate-400 text-lg sm:text-xl leading-relaxed">
            From high-scale software applications to data-driven marketing campaigns, we engineer end-to-end digital experiences.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-24">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((item, idx) => {
              const serviceId = item.id || item._id || (item.title ? item.title.toLowerCase().replace(/[^a-z0-9]/g, "-") : `service-${idx}`);
              const imageUrl = item.image || fallbackServices[idx % fallbackServices.length].image;
              
              return (
                <div
                  key={item._id || item.id || idx}
                  className="bg-slate-900/90 border border-slate-800/80 rounded-3xl overflow-hidden transition-all duration-500 ease-out hover:-translate-y-2 hover:border-cyan-500/60 hover:shadow-[0_20px_50px_rgba(14,165,233,0.2)] flex flex-col justify-between group"
                >
                  <div>
                    {/* Image Container with Zoom & Division Tag */}
                    <div className="relative h-48 w-full overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10 opacity-80" />
                      <img 
                        src={imageUrl} 
                        alt={item.title || item.serviceCardHeading}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      <span className="absolute top-4 right-4 z-20 text-[10px] font-bold uppercase tracking-wider text-white bg-slate-950/80 backdrop-blur-md border border-slate-800 px-3 py-1 rounded-full">
                        Division {idx < 9 ? `0${idx + 1}` : idx + 1}
                      </span>
                    </div>

                    <div className="p-8 pb-4">
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                        {item.title || item.serviceCardHeading}
                      </h3>

                      <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-4">
                        {item.description || item.serviceOuterDescription || item.serviceCardPara}
                      </p>

                      {item.features && (
                        <div className="space-y-2.5 mb-6 border-t border-slate-800/60 pt-5">
                          {item.features.map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-center text-xs font-semibold text-slate-300">
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-2.5 group-hover:scale-125 transition-transform" />
                              {feat}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-8 pt-0">
                    <Link
                      to={`/services/${serviceId}`}
                      className="inline-flex items-center justify-center w-full py-3.5 rounded-xl bg-slate-950 border border-slate-800 text-cyan-400 font-bold text-sm hover:bg-cyan-500 hover:text-slate-950 hover:border-cyan-500 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-cyan-500/25"
                    >
                      Explore Service Details
                      <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;