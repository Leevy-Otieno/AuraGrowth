const Service = require("../models/serviceModel");

const servicesData = [
  {
    title: "Video Editing & Motion Graphics",
    description: "High-retention cinematic video editing for YouTube, Reels, TikTok, and commercial ads.",
    features: ["Reels & TikToks", "Motion Graphics", "Color Grading"],
    serviceType: "Video Editing & Motion Graphics",
    serviceOuterDescription: "High-retention cinematic video editing and dynamic motion graphics for social media and commercials.",
    serviceCardHeading: "Video Editing & Motion Graphics",
    serviceCardPara: "Captivate your audience in the first 3 seconds. Our expert video editors and motion designers craft high-retention short-form content and cinematic long-form brand videos.",
    serviceInnerHeading: "Engineered for Algorithm Retention",
    serviceInnerPara: "We use modern pacing, kinetic typography, and visual hooks to maximize watch time and viewer retention."
  },
  {
    title: "Content Creation & Production",
    description: "End-to-end strategic content creation, scripting, and brand storytelling.",
    features: ["Scriptwriting", "Content Calendars", "Multi-Platform Assets"],
    serviceType: "Content Creation & Production",
    serviceOuterDescription: "End-to-end strategic content creation and creative direction.",
    serviceCardHeading: "Content Creation & Production",
    serviceCardPara: "Stand out in a crowded digital landscape. We handle full-scale content ideation, scriptwriting, and brand storytelling.",
    serviceInnerHeading: "Scalable Content Frameworks",
    serviceInnerPara: "We build structured content engines that produce consistent narratives across your channels."
  },
  {
    title: "Graphic Design & Brand Visuals",
    description: "Stunning visual assets, social media carousels, ad banners, and brand kits.",
    features: ["Social Carousels", "Ad Creative Sets", "Brand Identity"],
    serviceType: "Graphic Design & Brand Visuals",
    serviceOuterDescription: "Stunning visual assets, ad banners, and corporate brand identities.",
    serviceCardHeading: "Graphic Design & Brand Visuals",
    serviceCardPara: "First impressions dictate conversion. Our senior graphic designers create thumb-stopping social media carousels and ad visuals.",
    serviceInnerHeading: "Cohesive Visual Aesthetics",
    serviceInnerPara: "Every asset is meticulously crafted around your unique brand color palette and typography rules."
  },
  {
    title: "UI/UX Design & Web Architecture",
    description: "User-centered interface design, wireframing, and modern web experiences.",
    features: ["Figma Wireframes", "User Journey Mapping", "Responsive UI"],
    serviceType: "UI/UX Design & Web Architecture",
    serviceOuterDescription: "User-centered interface design and modern web experiences built for conversion.",
    serviceCardHeading: "UI/UX Design & Web Architecture",
    serviceCardPara: "Turn visitors into brand superfans through intuitive digital experiences using advanced wireframing and user journey mapping.",
    serviceInnerHeading: "Seamless Digital Navigation",
    serviceInnerPara: "We remove friction points from your user pathways to convert visitors into leads."
  },
  {
    title: "Professional Content Writers & Copywriting",
    description: "Persuasive SEO copywriting, blog articles, whitepapers, and sales pages.",
    features: ["SEO Copywriting", "Sales Pages", "Thought Leadership"],
    serviceType: "Professional Content Writers & Copywriting",
    serviceOuterDescription: "Persuasive SEO copywriting and high-converting sales landing page messaging.",
    serviceCardHeading: "Professional Content Writers & Copywriting",
    serviceCardPara: "Words matter. Our elite copywriters craft persuasive sales copy, authoritative blog posts, and landing page messaging.",
    serviceInnerHeading: "SEO-Infused Storytelling",
    serviceInnerPara: "Every piece of copy strikes the perfect balance between emotional hook phrasing and SEO optimization."
  },
  {
    title: "Search Engine Optimization (SEO)",
    description: "Dominating search engine results pages to drive sustainable organic traffic.",
    features: ["Technical Audits", "Keyword Strategy", "Authority Backlinks"],
    serviceType: "Search Engine Optimization (SEO)",
    serviceOuterDescription: "Dominating search engine results pages to drive organic, high-intent traffic.",
    serviceCardHeading: "Search Engine Optimization (SEO)",
    serviceCardPara: "Capture top rankings on Google with enterprise-grade SEO strategies combining technical audits and link building.",
    serviceInnerHeading: "Sustainable Algorithm-Proof Growth",
    serviceInnerPara: "We compound your search visibility organically over time to establish brand authority."
  },
  {
    title: "Pay-Per-Click Advertising (PPC)",
    description: "Laser-targeted Google Ads and multi-channel paid acquisition campaigns.",
    features: ["Google Ads Setup", "Negative Keyword Filtering", "ROAS Tracking"],
    serviceType: "Pay-Per-Click Advertising (PPC)",
    serviceOuterDescription: "Laser-targeted Google Ads and paid acquisition campaigns engineered for ROAS.",
    serviceCardHeading: "Pay-Per-Click Advertising (PPC)",
    serviceCardPara: "Stop waiting months for traffic. Our certified PPC specialists build hyper-targeted campaigns for immediate conversions.",
    serviceInnerHeading: "Precision Budget Allocation",
    serviceInnerPara: "Every single dollar is tracked, filtered, and optimized through real-time attribution data models."
  },
  {
    title: "Social Media Management",
    description: "End-to-end community building, organic content curation, and daily scheduling.",
    features: ["Community Management", "Daily Scheduling", "Platform Growth"],
    serviceType: "Social Media Management",
    serviceOuterDescription: "End-to-end community building, organic content curation, and daily platform scheduling.",
    serviceCardHeading: "Social Media Management",
    serviceCardPara: "Build an engaged community around your brand with daily scheduling and active community engagement.",
    serviceInnerHeading: "Consistent Brand Voice",
    serviceInnerPara: "We transform your social feeds into active relationship hubs that foster consumer trust."
  },
  {
    title: "Social Media Boosting & Ads",
    description: "Strategic paid post promotions and high-ROI social advertising campaigns.",
    features: ["Post Amplification", "Audience Targeting", "ROAS Scaling"],
    serviceType: "Social Media Boosting",
    serviceOuterDescription: "Strategic paid post promotions and audience acceleration campaigns.",
    serviceCardHeading: "Social Media Boosting & Ads",
    serviceCardPara: "Supercharge your organic momentum with targeted paid social advertising to maximize visibility.",
    serviceInnerHeading: "Amplified Reach & Impact",
    serviceInnerPara: "Turn standard posts into predictable customer acquisition channels by placing them in front of buyers."
  },
  {
    title: "Email Management & Marketing Automation",
    description: "Automated lifecycle funnels, newsletter campaigns, and retention sequences.",
    features: ["Automated Funnels", "Behavioral Triggers", "Retention Sequences"],
    serviceType: "Email Management & Marketing Automation",
    serviceOuterDescription: "Automated lifecycle funnels and newsletter campaigns that nurture leads.",
    serviceCardHeading: "Email Management & Marketing Automation",
    serviceCardPara: "Turn your subscriber base into a reliable profit center with automated welcome series and newsletters.",
    serviceInnerHeading: "Maximized Lifetime Customer Value",
    serviceInnerPara: "Deliver the right message to the right buyer at precisely the right behavioral moment."
  }
];

const autoSeedDatabase = async () => {
  try {
    const count = await Service.countDocuments();
    if (count === 0) {
      console.log("Database is empty. Auto-seeding initial services...");
      await Service.insertMany(servicesData);
      console.log("Auto-seeding complete!");
    } else {
      console.log(`Database already has ${count} services. Skipping auto-seed.`);
    }
  } catch (err) {
    console.error("Auto-seeding error:", err);
  }
};

module.exports = autoSeedDatabase;