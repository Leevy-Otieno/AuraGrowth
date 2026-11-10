

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../config";

// Comprehensive master map containing rich, detailed content for all 12 services
const serviceDetailsMap = {
  "web-app-dev": {
    title: "Full-Stack Web App Development",
    subtitle: "Custom, Scalable Web Applications Built for High Performance",
    description: "Architecting high-performance, enterprise-grade web applications from scratch. We engineer secure REST & GraphQL APIs, implement robust cloud database schemas, and build lightning-fast user interfaces using modern React ecosystems to handle massive, concurrent user traffic seamlessly.",
    innerHeading: "Engineered for Enterprise Scalability",
    innerDescription: "We write clean, modular, maintainable code with strict security standards, automated CI/CD pipelines, and seamless cloud deployments on AWS, Vercel, or MongoDB Atlas. Our solutions ensure maximum uptime and lightning-fast load speeds.",
    features: ["Enterprise React Architecture", "Secure Node/Express Backends", "High-Concurrency Cloud Databases"]
  },
  "mobile-app-dev": {
    title: "Mobile Application Development",
    subtitle: "Cross-Platform and Native iOS & Android Apps",
    description: "Developing cross-platform and native iOS and Android mobile solutions engineered for exceptional user retention. Leveraging React Native and Flutter, we deliver fluid gesture animations, offline-first capabilities, and frictionless deployment pipelines straight to the App Store and Google Play.",
    innerHeading: "Seamless App Store Launch & Compliance",
    innerDescription: "We handle everything from UI prototyping and secure API integration to strict Apple App Store and Google Play Store compliance, review submissions, and post-launch updates.",
    features: ["Cross-Platform Native Speed", "Advanced Gesture Animations", "Strict App Store Compliance"]
  },
  "video-editing": {
    title: "Video Editing & Motion Graphics",
    subtitle: "High-Retention Cinematic Video & Social Production",
    description: "Crafting thumb-stopping cinematic video packages optimized for algorithmic distribution. Our post-production workflow integrates dynamic kinetic typography, immersive sound design, color grading, and rapid narrative pacing designed to capture peak viewer attention in the first three seconds.",
    innerHeading: "Engineered for Algorithm Retention",
    innerDescription: "We leverage advanced editing suites and audience retention strategies across YouTube, TikTok, and Instagram Reels to maximize watch time, engagement rates, and organic algorithmic push.",
    features: ["Algorithmic Watch-Time Optimization", "Custom Motion Graphics", "Cinematic Color Grading"]
  },
  "content-creation": {
    title: "Content Creation & Production",
    subtitle: "Strategic Brand Storytelling & Content Engines",
    description: "Building comprehensive, multi-channel storytelling engines that position your brand as an industry authority. We manage deep-dive research, multi-platform scriptwriting, structured editorial content calendars, and cross-format asset distribution designed to build organic trust.",
    innerHeading: "Scalable Content Frameworks",
    innerDescription: "We build structured content systems that produce consistent narratives across all your marketing channels, ensuring your brand stays top-of-mind with your target audience.",
    features: ["Strategic Content Calendars", "Authoritative Scriptwriting", "Multi-Platform Asset Syndication"]
  },
  "graphic-design": {
    title: "Graphic Design & Brand Visuals",
    subtitle: "Thumb-Stopping Visual Assets & Brand Kits",
    description: "Translating brand identity into unforgettable visual touchpoints. Our senior creative team constructs high-converting social carousels, dynamic display ad suites, pitch decks, and rigorous visual brand systems that establish instant market authority and recognition.",
    innerHeading: "Cohesive Visual Aesthetics",
    innerDescription: "Every asset is meticulously crafted around your unique brand color palette and typography rules to ensure a uniform, premium look across every single customer interaction point.",
    features: ["High-Converting Ad Creatives", "Cohesive Brand Identity Systems", "Engaging Social Carousels"]
  },
  "ui-ux": {
    title: "UI/UX Design & Architecture",
    subtitle: "User-Centered Interface Design & Web Architecture",
    description: "Eliminating digital friction through rigorous user research, interactive wireframing, and psychological user-journey mapping. We architect intuitive digital experiences that guide consumers effortlessly from initial discovery to high-value conversion points.",
    innerHeading: "Frictionless Digital Navigation",
    innerDescription: "We remove usability bottlenecks from your user pathways, ensuring visitors effortlessly navigate your web or mobile application with maximum user satisfaction and conversion efficiency.",
    features: ["Comprehensive Figma Wireframes", "Behavioral User Journey Mapping", "Conversion-Focused UX Architecture"]
  },
  "writers": {
    title: "Professional Content Writers & Copywriting",
    subtitle: "Persuasive Copywriting & Thought Leadership",
    description: "Leveraging persuasive copywriting frameworks and technical documentation expertise to convert casual readers into loyal brand advocates. Every sentence is meticulously tuned to balance emotional consumer hooks with deep search engine visibility.",
    innerHeading: "SEO-Infused Storytelling",
    innerDescription: "Every piece of copy strikes the perfect balance between emotional hook phrasing and search engine visibility, driving both immediate sales conversions and organic search traffic.",
    features: ["Conversion-Optimized Sales Pages", "Technical Documentation", "SEO-Infused Thought Leadership"]
  },
  "seo": {
    title: "Search Engine Optimization (SEO)",
    subtitle: "Organic Traffic Domination & Technical Audits",
    description: "Dominating competitive search engine results pages through holistic technical audits, high-intent keyword positioning, semantic content optimization, and elite white-hat backlink acquisition strategies designed for sustainable, algorithm-proof compounding growth.",
    innerHeading: "Sustainable Algorithm-Proof Growth",
    innerDescription: "We compound your search visibility organically over time to establish long-term brand authority, protecting your traffic against sudden search engine updates and algorithm shifts.",
    features: ["Rigorous Technical Site Audits", "Semantic Keyword Positioning", "Authority Backlink Acquisition"]
  },
  "ppc": {
    title: "Pay-Per-Click Advertising (PPC)",
    subtitle: "Laser-Targeted Paid Acquisition & ROAS Scaling",
    description: "Engineering hyper-targeted paid acquisition campaigns across Google Ads and major social networks. We leverage continuous multivariate ad testing, negative keyword filtering, and advanced attribution modeling to maximize return on ad spend (ROAS) from day one.",
    innerHeading: "Precision Budget Allocation",
    innerDescription: "Every single dollar is tracked, filtered, and optimized through real-time attribution data models to ensure maximum profitability and minimal wasted ad spend.",
    features: ["Google Ads & Social Scaling", "Multivariate Ad Testing", "Advanced ROAS Attribution Tracking"]
  },
  "social-mgmt": {
    title: "Social Media Management",
    subtitle: "Community Building & Organic Social Growth",
    description: "Transforming passive social channels into vibrant community hubs. We manage day-to-day organic content curation, active audience engagement, comment moderation, and real-time community nurturing that builds deep consumer trust and brand affinity.",
    innerHeading: "Consistent Brand Voice",
    innerDescription: "We transform your social feeds into active relationship hubs that foster consumer trust and turn followers into passionate brand advocates.",
    features: ["Active Community Moderation", "Daily Cross-Platform Scheduling", "Organic Authority Building"]
  },
  "social-boost": {
    title: "Social Media Boosting & Ads",
    subtitle: "Strategic Post Promotions & Audience Scaling",
    description: "Amplifying organic momentum using targeted social advertising algorithms. We convert high-performing organic posts into aggressive customer acquisition engines by micro-targeting precise buyer personas across demographics and interest vectors.",
    innerHeading: "Amplified Reach & Impact",
    innerDescription: "Turn standard posts into predictable customer acquisition channels by placing them directly in front of active buyers primed for conversion.",
    features: ["Strategic Post Amplification", "Precise Demographic Micro-Targeting", "Predictable Inbound Lead Generation"]
  },
  "email-mgmt": {
    title: "Email Marketing & Automation",
    subtitle: "Lifecycle Funnels & Retention Email Sequences",
    description: "Maximizing lifetime customer value by turning your subscriber list into a reliable profit center. We architect automated behavioral welcome funnels, targeted segmentation newsletters, and automated cart-abandonment retention sequences.",
    innerHeading: "Maximized Lifetime Customer Value",
    innerDescription: "Deliver the right message to the right buyer at precisely the right behavioral moment to maximize repeat purchases and long-term customer retention.",
    features: ["Automated Behavioral Lifecycle Funnels", "Targeted Segmentation Newsletters", "High-Retention Recovery Sequences"]
  }
};

const ServiceDetailsPage = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await fetch(`${api}/services/${id}`);
        if (response.ok) {
          const data = await response.json();
          setService(data);
        } else {
          setService(serviceDetailsMap[id] || serviceDetailsMap["web-app-dev"]);
        }
      } catch (error) {
        console.warn("Using local service details map fallback:", error);
        setService(serviceDetailsMap[id] || serviceDetailsMap["web-app-dev"]);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6">
        <h2 className="text-2xl font-bold mb-4">Service Not Found</h2>
        <Link to="/services" className="text-cyan-400 hover:underline font-semibold">
          &larr; Return to All Services
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased pt-32 pb-24 relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.15),rgba(255,255,255,0))] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Back Link */}
        <Link 
          to="/services" 
          className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-semibold mb-8 transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round5" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to All Services
        </Link>

        {/* Main Title Header */}
        <div className="space-y-4 mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/80 border border-cyan-800/60 px-4 py-1.5 rounded-full inline-block shadow-md">
            Division Overview
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            {service.title || service.serviceCardHeading}
          </h1>
          <p className="text-xl text-cyan-300 font-medium">
            {service.subtitle || service.serviceOuterDescription}
          </p>
        </div>

        {/* Primary Description Card */}
        <div className="bg-slate-900/90 border border-slate-800/80 rounded-3xl p-8 sm:p-10 shadow-2xl mb-8 space-y-6">
          <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-4">
            Executive Summary
          </h3>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {service.description || service.serviceCardPara}
          </p>

          {/* Key Deliverables / Features */}
          {service.features && (
            <div className="pt-4 border-t border-slate-800">
              <h4 className="text-sm font-bold uppercase tracking-wider text-cyan-400 mb-4">
                Core Engineering & Growth Deliverables
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center text-sm font-medium text-slate-200 bg-slate-950/60 border border-slate-800/60 px-4 py-3 rounded-xl">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 mr-3 flex-shrink-0" />
                    {feat}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Secondary Detailed Deep-Dive Section */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-cyan-500/30 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <h2 className="text-2xl font-bold text-cyan-400 mb-4">
            {service.innerHeading || "Engineered for Performance"}
          </h2>
          <p className="text-slate-300 leading-relaxed text-base sm:text-lg mb-8">
            {service.innerDescription || service.serviceInnerPara}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-sm tracking-wider shadow-lg shadow-cyan-600/25 transition-all duration-300"
            >
              Initialize Project Discussion
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ServiceDetailsPage;

