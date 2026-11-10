const mongoose = require("mongoose");
const Service = require("./models/serviceModel");

const MONGO_URI = "mongodb+srv://brightleeti_db_user:PdgAZrd3Je5BubUk@cluster0.oomfpl8.mongodb.net/";

const servicesData = [
  {
    id: "web-app-dev",
    title: "Full-Stack Web App Development",
    description: "Architecting high-performance, enterprise-grade web applications from scratch. We engineer secure REST & GraphQL APIs, implement robust cloud database schemas, and build lightning-fast user interfaces using modern React ecosystems.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    features: ["Enterprise React Architecture", "Secure Node/Express Backends", "High-Concurrency Cloud Databases"],
    serviceType: "Full-Stack Web App Development",
    serviceOuterDescription: "Architecting high-performance, enterprise-grade web applications, custom APIs, and scalable cloud databases.",
    serviceCardHeading: "Full-Stack Web App Development",
    serviceCardPara: "Transform your complex business workflows into lightning-fast, secure, and scalable web applications. Our expert full-stack engineers build custom digital products using React, Node.js, and cloud backend architectures.",
    serviceInnerHeading: "Engineered for Enterprise Scalability",
    serviceInnerPara: "We write clean, modular, maintainable code with strict security standards, automated testing, and seamless cloud deployments on AWS or MongoDB Atlas."
  },
  {
    id: "mobile-app-dev",
    title: "Mobile Application Development",
    description: "Developing cross-platform and native iOS and Android mobile solutions engineered for exceptional user retention. Leveraging React Native and Flutter, we deliver fluid gesture animations and offline-first capabilities.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    features: ["Cross-Platform Native Speed", "Advanced Gesture Animations", "Strict App Store Compliance"],
    serviceType: "Mobile Application Development",
    serviceOuterDescription: "Sleek, high-performance cross-platform and native iOS & Android applications.",
    serviceCardHeading: "Mobile Application Development",
    serviceCardPara: "Bring your app idea straight to the hands of your users. We design and develop mobile applications using React Native and Flutter, ensuring native-level speed and smooth user experiences.",
    serviceInnerHeading: "Seamless App Store Launch & Compliance",
    serviceInnerPara: "We handle everything from UI prototyping and secure API integration to strict Apple App Store and Google Play Store compliance and publication."
  },
  {
    id: "cloud-consulting",
    title: "Cloud Consulting & Infrastructure",
    description: "Expert guidance and implementation for migrating to and optimizing your infrastructure on leading cloud platforms like AWS, Azure, and Google Cloud.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    features: ["Cloud Strategy & Migration", "Infrastructure-as-Code", "Cost Optimization & Security Audits"],
    serviceType: "Cloud Consulting & Infrastructure",
    serviceOuterDescription: "Expert guidance and implementation for migrating, architecting, and optimizing multi-cloud infrastructure.",
    serviceCardHeading: "Cloud Consulting & Infrastructure",
    serviceCardPara: "Accelerate your digital transformation with secure, resilient cloud architecture. We design infrastructure setups, manage continuous integration, and optimize cloud expenditure.",
    serviceInnerHeading: "High-Availability Cloud Architectures",
    serviceInnerPara: "We design cloud solutions prioritizing zero downtime, automated failovers, and robust data security protocols."
  },
  {
    id: "video-editing",
    title: "Video Editing & Motion Graphics",
    description: "High-retention cinematic video editing for YouTube, Reels, TikTok, and commercial ads.",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80",
    features: ["Reels & TikTok Editing", "Motion Graphics", "Color Grading"],
    serviceType: "Video Editing & Motion Graphics",
    serviceOuterDescription: "High-retention cinematic video editing, dynamic motion graphics, and professional post-production for social media and commercials.",
    serviceCardHeading: "Video Editing & Motion Graphics",
    serviceCardPara: "Captivate your audience in the first 3 seconds. Our expert video editors and motion designers craft high-retention short-form content (Reels, TikToks, Shorts) and cinematic long-form brand videos complete with seamless cuts, custom animations, sound design, and color grading.",
    serviceInnerHeading: "Engineered for Algorithm Retention",
    serviceInnerPara: "We use modern pacing, kinetic typography, and visual hooks to maximize watch time, viewer retention, and algorithmic distribution across all video platforms."
  },
  {
    id: "content-creation",
    title: "Content Creation & Production",
    description: "End-to-end strategic content creation, scripting, and brand storytelling.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    features: ["Scriptwriting", "Content Calendars", "Multi-Platform Assets"],
    serviceType: "Content Creation & Production",
    serviceOuterDescription: "End-to-end strategic content creation, creative direction, and multi-channel storytelling that establishes brand authority.",
    serviceCardHeading: "Content Creation & Production",
    serviceCardPara: "Stand out in a crowded digital landscape. We handle full-scale content ideation, scriptwriting, brand storytelling, and multi-format asset creation designed to resonate deeply with your target buyer persona.",
    serviceInnerHeading: "Scalable Content Frameworks",
    serviceInnerPara: "We build structured content engines that produce consistent, high-value narratives across your blog, social media, and email channels."
  },
  {
    id: "graphic-design",
    title: "Graphic Design & Brand Visuals",
    description: "Stunning visual assets, social media carousels, ad banners, and brand kits.",
    image: "https://images.unsplash.com/photo-1542744094-3a31243364d0?auto=format&fit=crop&w=800&q=80",
    features: ["Social Carousels", "Ad Creative Sets", "Brand Identity"],
    serviceType: "Graphic Design & Brand Visuals",
    serviceOuterDescription: "Stunning visual assets, high-converting ad banners, social media carousels, and cohesive corporate brand identities.",
    serviceCardHeading: "Graphic Design & Brand Visuals",
    serviceCardPara: "First impressions dictate conversion. Our senior graphic designers create thumb-stopping social media carousels, high-converting display ad banners, striking pitch decks, and professional visual identities that elevate your brand perception.",
    serviceInnerHeading: "Cohesive Visual Aesthetics",
    serviceInnerPara: "Every asset is meticulously crafted around your unique brand color palette and typography rules to ensure seamless visual harmony everywhere your customers find you."
  },
  {
    id: "ui-ux",
    title: "UI/UX Design & Web Architecture",
    description: "User-centered interface design, wireframing, and modern web experiences.",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80",
    features: ["Figma Wireframes", "User Journey Mapping", "Responsive UI"],
    serviceType: "UI/UX Design & Web Architecture",
    serviceOuterDescription: "User-centered interface design, interactive wireframes, and modern web experiences built for maximum usability and conversion.",
    serviceCardHeading: "UI/UX Design & Web Architecture",
    serviceCardPara: "Turn visitors into brand superfans through intuitive digital experiences. We design user-centered web and mobile interfaces using advanced wireframing, user journey mapping, and conversion-focused UX architecture.",
    serviceInnerHeading: "Seamless Digital Navigation",
    serviceInnerPara: "We remove friction points from your user pathways, ensuring visitors effortlessly find what they need and convert into high-value leads."
  },
  {
    id: "writers",
    title: "Professional Content Writers & Copywriting",
    description: "Persuasive SEO copywriting, blog articles, whitepapers, and sales pages.",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80",
    features: ["SEO Copywriting", "Sales Landing Pages", "Thought Leadership"],
    serviceType: "Professional Content Writers & Copywriting",
    serviceOuterDescription: "Persuasive SEO copywriting, blog articles, whitepapers, and high-converting sales landing page messaging.",
    serviceCardHeading: "Professional Content Writers & Copywriting",
    serviceCardPara: "Words matter. Our elite copywriters craft persuasive sales copy, authoritative blog posts, whitepapers, and landing page messaging that captivate readers, establish industry authority, and compel action.",
    serviceInnerHeading: "SEO-Infused Storytelling",
    serviceInnerPara: "Every piece of copy strikes the perfect balance between emotional consumer hook phrasing and search engine ranking optimization."
  },
  {
    id: "social-mgmt",
    title: "Social Media Management",
    description: "End-to-end community building, organic content curation, and daily scheduling.",
    image: "https://images.unsplash.com/photo-1531548714889-671d8c514751?auto=format&fit=crop&w=800&q=80",
    features: ["Community Management", "Daily Scheduling", "Platform Growth"],
    serviceType: "Social Media Management",
    serviceOuterDescription: "End-to-end community building, organic content curation, and daily platform scheduling across Instagram, LinkedIn, and TikTok.",
    serviceCardHeading: "Social Media Management",
    serviceCardPara: "Build an engaged community around your brand. Our social media team handles daily scheduling, community engagement, and organic content distribution across all major social channels.",
    serviceInnerHeading: "Consistent Brand Voice",
    serviceInnerPara: "We transform your social feeds into active relationship hubs that foster consumer trust and inbound customer conversations."
  },
  {
    id: "social-boost",
    title: "Social Media Boosting & Paid Ads",
    description: "Strategic paid post promotions and high-ROI social advertising campaigns.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
    features: ["Post Amplification", "Audience Targeting", "ROAS Scaling"],
    serviceType: "Social Media Boosting",
    serviceOuterDescription: "Strategic paid post promotions and audience acceleration campaigns designed to amplify reach and explode conversions.",
    serviceCardHeading: "Social Media Boosting & Paid Ads",
    serviceCardPara: "Supercharge your organic momentum with targeted paid social advertising. We target precision lookalike audiences to maximize visibility and drive immediate purchase intent.",
    serviceInnerHeading: "Amplified Reach & Impact",
    serviceInnerPara: "Turn standard posts into predictable customer acquisition channels by placing them in front of active buyers ready to take action."
  },
  {
    id: "seo",
    title: "Search Engine Optimization (SEO)",
    description: "Dominating search engine results pages to drive sustainable organic traffic.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    features: ["Technical Audits", "Keyword Strategy", "Authority Backlinks"],
    serviceType: "Search Engine Optimization (SEO)",
    serviceOuterDescription: "Dominating search engine results pages to drive organic, high-intent traffic and long-term business revenue growth.",
    serviceCardHeading: "Search Engine Optimization (SEO)",
    serviceCardPara: "Capture top rankings on Google with enterprise-grade SEO strategies. We combine technical audits, keyword optimization, and high-authority link building.",
    serviceInnerHeading: "Sustainable Algorithm-Proof Growth",
    serviceInnerPara: "We compound your search visibility organically over time to establish your brand as the definitive authority in your niche."
  },
  {
    id: "ppc",
    title: "Pay-Per-Click Advertising (PPC)",
    description: "Laser-targeted Google Ads and multi-channel paid acquisition campaigns.",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
    features: ["Google Ads Setup", "Negative Keyword Filtering", "ROAS Tracking"],
    serviceType: "Pay-Per-Click Advertising (PPC)",
    serviceOuterDescription: "Laser-targeted Google Ads and paid acquisition campaigns engineered to maximize return on ad spend.",
    serviceCardHeading: "Pay-Per-Click Advertising (PPC)",
    serviceCardPara: "Stop waiting months for traffic. Our certified PPC specialists build hyper-targeted campaigns designed for immediate high-intent conversions.",
    serviceInnerHeading: "Precision Budget Allocation",
    serviceInnerPara: "Every single dollar is tracked, filtered, and optimized through real-time attribution data models."
  },
  {
    id: "email-mgmt",
    title: "Email Management & Marketing Automation",
    description: "Automated lifecycle funnels, newsletter campaigns, and retention sequences.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    features: ["Automated Funnels", "Behavioral Triggers", "Retention Sequences"],
    serviceType: "Email Management & Marketing Automation",
    serviceOuterDescription: "Automated lifecycle funnels, newsletter campaigns, and inbox management that nurture leads and maximize retention.",
    serviceCardHeading: "Email Management & Marketing Automation",
    serviceCardPara: "Turn your subscriber base into a reliable profit center with automated welcome series, cart recovery sequences, and newsletter campaigns.",
    serviceInnerHeading: "Maximized Lifetime Customer Value",
    serviceInnerPara: "Deliver the right message to the right buyer at precisely the right behavioral moment to foster brand loyalty."
  }
];

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB. Seeding all 13 services...");
    await Service.deleteMany({});
    await Service.insertMany(servicesData);
    console.log("Successfully seeded 13 complete services (including Cloud Consulting)!");
    process.exit();
  })
  .catch((err) => {
    console.error("Seeding error:", err);
    process.exit(1);
  });