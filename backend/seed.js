const mongoose = require("mongoose");
const Service = require("./models/serviceModel");

const MONGO_URI = "mongodb+srv://brightleeti_db_user:PdgAZrd3Je5BubUk@cluster0.oomfpl8.mongodb.net/";
const servicesData = [
  {
    title: "Video Editing & Motion Graphics",
    description: "High-retention cinematic video editing for YouTube, Reels, TikTok, and commercial ads.",
    features: ["Reels & TikTok Editing", "Motion Graphics", "Color Grading"],
    serviceType: "Video Editing & Motion Graphics",
    serviceOuterDescription: "High-retention cinematic video editing, dynamic motion graphics, and professional post-production for social media and commercials.",
    serviceCardHeading: "Video Editing & Motion Graphics",
    serviceCardPara: "Captivate your audience in the first 3 seconds. Our expert video editors and motion designers craft high-retention short-form content (Reels, TikToks, Shorts) and cinematic long-form brand videos complete with seamless cuts, custom animations, sound design, and color grading.",
    serviceInnerHeading: "Engineered for Algorithm Retention",
    serviceInnerPara: "We use modern pacing, kinetic typography, and visual hooks to maximize watch time, viewer retention, and algorithmic distribution across all video platforms."
  },
  {
    title: "Content Creation & Production",
    description: "End-to-end strategic content creation, scripting, and brand storytelling.",
    features: ["Scriptwriting", "Content Calendars", "Multi-Platform Assets"],
    serviceType: "Content Creation & Production",
    serviceOuterDescription: "End-to-end strategic content creation, creative direction, and multi-channel storytelling that establishes brand authority.",
    serviceCardHeading: "Content Creation & Production",
    serviceCardPara: "Stand out in a crowded digital landscape. We handle full-scale content ideation, scriptwriting, brand storytelling, and multi-format asset creation designed to resonate deeply with your target buyer persona.",
    serviceInnerHeading: "Scalable Content Frameworks",
    serviceInnerPara: "We build structured content engines that produce consistent, high-value narratives across your blog, social media, and email channels."
  },
  {
    title: "Graphic Design & Brand Visuals",
    description: "Stunning visual assets, social media carousels, ad banners, and brand kits.",
    features: ["Social Carousels", "Ad Creative Sets", "Brand Identity"],
    serviceType: "Graphic Design & Brand Visuals",
    serviceOuterDescription: "Stunning visual assets, high-converting ad banners, social media carousels, and cohesive corporate brand identities.",
    serviceCardHeading: "Graphic Design & Brand Visuals",
    serviceCardPara: "First impressions dictate conversion. Our senior graphic designers create thumb-stopping social media carousels, high-converting display ad banners, striking pitch decks, and professional visual identities that elevate your brand perception.",
    serviceInnerHeading: "Cohesive Visual Aesthetics",
    serviceInnerPara: "Every asset is meticulously crafted around your unique brand color palette and typography rules to ensure seamless visual harmony everywhere your customers find you."
  },
  {
    title: "UI/UX Design & Web Architecture",
    description: "User-centered interface design, wireframing, and modern web experiences.",
    features: ["Figma Wireframes", "User Journey Mapping", "Responsive UI"],
    serviceType: "UI/UX Design & Web Architecture",
    serviceOuterDescription: "User-centered interface design, interactive wireframes, and modern web experiences built for maximum usability and conversion.",
    serviceCardHeading: "UI/UX Design & Web Architecture",
    serviceCardPara: "Turn visitors into brand superfans through intuitive digital experiences. We design user-centered web and mobile interfaces using advanced wireframing, user journey mapping, and conversion-focused UX architecture.",
    serviceInnerHeading: "Seamless Digital Navigation",
    serviceInnerPara: "We remove friction points from your user pathways, ensuring visitors effortlessly find what they need and convert into high-value leads."
  },
  {
    title: "Professional Content Writers & Copywriting",
    description: "Persuasive SEO copywriting, blog articles, whitepapers, and sales pages.",
    features: ["SEO Copywriting", "Sales Landing Pages", "Thought Leadership"],
    serviceType: "Professional Content Writers & Copywriting",
    serviceOuterDescription: "Persuasive SEO copywriting, blog articles, whitepapers, and high-converting sales landing page messaging.",
    serviceCardHeading: "Professional Content Writers & Copywriting",
    serviceCardPara: "Words matter. Our elite copywriters craft persuasive sales copy, authoritative blog posts, whitepapers, and landing page messaging that captivate readers, establish industry authority, and compel action.",
    serviceInnerHeading: "SEO-Infused Storytelling",
    serviceInnerPara: "Every piece of copy strikes the perfect balance between emotional consumer hook phrasing and search engine ranking optimization."
  },
  {
    title: "Social Media Management",
    description: "End-to-end community building, organic content curation, and daily scheduling.",
    features: ["Community Management", "Daily Scheduling", "Platform Growth"],
    serviceType: "Social Media Management",
    serviceOuterDescription: "End-to-end community building, organic content curation, and daily platform scheduling across Instagram, LinkedIn, and TikTok.",
    serviceCardHeading: "Social Media Management",
    serviceCardPara: "Build an engaged community around your brand. Our social media team handles daily scheduling, community engagement, and organic content distribution across all major social channels.",
    serviceInnerHeading: "Consistent Brand Voice",
    serviceInnerPara: "We transform your social feeds into active relationship hubs that foster consumer trust and inbound customer conversations."
  },
  {
    title: "Social Media Boosting & Paid Ads",
    description: "Strategic paid post promotions and high-ROI social advertising campaigns.",
    features: ["Post Amplification", "Audience Targeting", "ROAS Scaling"],
    serviceType: "Social Media Boosting",
    serviceOuterDescription: "Strategic paid post promotions and audience acceleration campaigns designed to amplify reach and explode conversions.",
    serviceCardHeading: "Social Media Boosting & Paid Ads",
    serviceCardPara: "Supercharge your organic momentum with targeted paid social advertising. We target precision lookalike audiences to maximize visibility and drive immediate purchase intent.",
    serviceInnerHeading: "Amplified Reach & Impact",
    serviceInnerPara: "Turn standard posts into predictable customer acquisition channels by placing them in front of active buyers ready to take action."
  },
  {
    title: "Search Engine Optimization (SEO)",
    description: "Dominating search engine results pages to drive sustainable organic traffic.",
    features: ["Technical Audits", "Keyword Strategy", "Authority Backlinks"],
    serviceType: "Search Engine Optimization (SEO)",
    serviceOuterDescription: "Dominating search engine results pages to drive organic, high-intent traffic and long-term business revenue growth.",
    serviceCardHeading: "Search Engine Optimization (SEO)",
    serviceCardPara: "Capture top rankings on Google with enterprise-grade SEO strategies. We combine technical audits, keyword optimization, and high-authority link building.",
    serviceInnerHeading: "Sustainable Algorithm-Proof Growth",
    serviceInnerPara: "We compound your search visibility organically over time to establish your brand as the definitive authority in your niche."
  },
  {
    title: "Pay-Per-Click Advertising (PPC)",
    description: "Laser-targeted Google Ads and multi-channel paid acquisition campaigns.",
    features: ["Google Ads Setup", "Negative Keyword Filtering", "ROAS Tracking"],
    serviceType: "Pay-Per-Click Advertising (PPC)",
    serviceOuterDescription: "Laser-targeted Google Ads and paid acquisition campaigns engineered to maximize return on ad spend.",
    serviceCardHeading: "Pay-Per-Click Advertising (PPC)",
    serviceCardPara: "Stop waiting months for traffic. Our certified PPC specialists build hyper-targeted campaigns designed for immediate high-intent conversions.",
    serviceInnerHeading: "Precision Budget Allocation",
    serviceInnerPara: "Every single dollar is tracked, filtered, and optimized through real-time attribution data models."
  },
  {
    title: "Email Management & Marketing Automation",
    description: "Automated lifecycle funnels, newsletter campaigns, and retention sequences.",
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
    console.log("Connected to MongoDB for seeding comprehensive services...");
    await Service.deleteMany({});
    await Service.insertMany(servicesData);
    console.log("Database successfully seeded with all marketing & creative services!");
    process.exit();
  })
  .catch((err) => {
    console.error("Seeding error:", err);
    process.exit(1);
  });