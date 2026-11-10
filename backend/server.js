const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const blogRoutes = require("./routes/blogRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const Service = require("./models/serviceModel");
const Blog = require("./models/blogModel");

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Dynamic CORS configuration for local development & production deployments
const allowedOrigins = [
  "http://localhost:3000",
  process.env.FRONTEND_URL // Set this in Render dashboard once Vercel deploys
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(null, true); // Fallback to allow requests during deployment setup
      }
    },
    credentials: true,
  })
);

// Complete master list of all 13 services for auto-seeding
const servicesData = [
  {
    title: "Full-Stack Web App Development",
    description: "Architecting high-performance, enterprise-grade web applications from scratch. We engineer secure REST & GraphQL APIs, implement robust cloud database schemas, and build lightning-fast user interfaces using modern React ecosystems.",
    features: ["Enterprise React Architecture", "Secure Node/Express Backends", "High-Concurrency Cloud Databases"],
    serviceType: "Full-Stack Web App Development",
    serviceOuterDescription: "Architecting high-performance, enterprise-grade web applications, custom APIs, and scalable cloud databases.",
    serviceCardHeading: "Full-Stack Web App Development",
    serviceCardPara: "Transform your complex business workflows into lightning-fast, secure, and scalable web applications using React, Node.js, and cloud backends.",
    serviceInnerHeading: "Engineered for Enterprise Scalability",
    serviceInnerPara: "We write clean, modular, maintainable code with strict security standards, automated testing, and seamless cloud deployments."
  },
  {
    title: "Mobile Application Development",
    description: "Developing cross-platform and native iOS and Android mobile solutions engineered for exceptional user retention and fluid gesture animations.",
    features: ["Cross-Platform Native Speed", "Advanced Gesture Animations", "Strict App Store Compliance"],
    serviceType: "Mobile Application Development",
    serviceOuterDescription: "Sleek, high-performance cross-platform and native iOS & Android applications.",
    serviceCardHeading: "Mobile Application Development",
    serviceCardPara: "Bring your app idea straight to the hands of your users with mobile applications built on React Native and Flutter.",
    serviceInnerHeading: "Seamless App Store Launch & Compliance",
    serviceInnerPara: "We handle everything from UI prototyping and secure API integration to Apple App Store and Google Play publication."
  },
  {
    title: "Cloud Consulting & Infrastructure",
    description: "Expert guidance and implementation for migrating to and optimizing your infrastructure on leading cloud platforms like AWS, Azure, and Google Cloud.",
    features: ["Cloud Strategy & Migration", "Infrastructure-as-Code", "Cost Optimization & Security Audits"],
    serviceType: "Cloud Consulting & Infrastructure",
    serviceOuterDescription: "Expert guidance and implementation for migrating, architecting, and optimizing multi-cloud infrastructure.",
    serviceCardHeading: "Cloud Consulting & Infrastructure",
    serviceCardPara: "Accelerate your digital transformation with secure, resilient cloud architecture, continuous integration, and optimized expenditure.",
    serviceInnerHeading: "High-Availability Cloud Architectures",
    serviceInnerPara: "We design cloud solutions prioritizing zero downtime, automated failovers, and robust data security protocols."
  },
  {
    title: "Video Editing & Motion Graphics",
    description: "High-retention cinematic video editing for YouTube, Reels, TikTok, and commercial ads.",
    features: ["Reels & TikTok Editing", "Motion Graphics", "Color Grading"],
    serviceType: "Video Editing & Motion Graphics",
    serviceOuterDescription: "High-retention cinematic video editing and dynamic motion graphics for social media.",
    serviceCardHeading: "Video Editing & Motion Graphics",
    serviceCardPara: "Captivate your audience in the first 3 seconds with high-retention short-form content and cinematic brand videos.",
    serviceInnerHeading: "Engineered for Algorithm Retention",
    serviceInnerPara: "We use modern pacing, kinetic typography, and visual hooks to maximize watch time across all platforms."
  },
  {
    title: "Content Creation & Production",
    description: "End-to-end strategic content creation, scripting, and brand storytelling.",
    features: ["Scriptwriting", "Content Calendars", "Multi-Platform Assets"],
    serviceType: "Content Creation & Production",
    serviceOuterDescription: "End-to-end strategic content creation and creative direction.",
    serviceCardHeading: "Content Creation & Production",
    serviceCardPara: "Stand out in a crowded landscape with full-scale content ideation, scriptwriting, and brand storytelling.",
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
    serviceCardPara: "First impressions dictate conversion. Our senior graphic designers create thumb-stopping carousels and ad visuals.",
    serviceInnerHeading: "Cohesive Visual Aesthetics",
    serviceInnerPara: "Every asset is meticulously crafted around your unique brand color palette and typography."
  },
  {
    title: "UI/UX Design & Web Architecture",
    description: "User-centered interface design, wireframing, and modern web experiences.",
    features: ["Figma Wireframes", "User Journey Mapping", "Responsive UI"],
    serviceType: "UI/UX Design & Web Architecture",
    serviceOuterDescription: "User-centered interface design and modern web experiences built for conversion.",
    serviceCardHeading: "UI/UX Design & Web Architecture",
    serviceCardPara: "Turn visitors into superfans through intuitive digital experiences using advanced wireframing and user journey mapping.",
    serviceInnerHeading: "Seamless Digital Navigation",
    serviceInnerPara: "We remove friction points from your user pathways to convert visitors into leads."
  },
  {
    title: "Professional Content Writers & Copywriting",
    description: "Persuasive SEO copywriting, blog articles, whitepapers, and sales pages.",
    features: ["SEO Copywriting", "Sales Pages", "Thought Leadership"],
    serviceType: "Professional Content Writers & Copywriting",
    serviceOuterDescription: "Persuasive SEO copywriting and high-converting landing page messaging.",
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

// Sample blogs data for auto-seeding
const sampleBlogs = [
  {
    title: "10 Digital Marketing Strategies to Dominate in 2026",
    excerpt: "Discover the latest growth hacks, SEO methodologies, and social media advertising trends for maximum revenue.",
    content: "Full guide on modern digital marketing tactics including AI automation, high-converting copy, and multi-channel attribution...",
    author: "Leevy Otieno",
    date: new Date().toISOString(),
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Why Full-Stack Modern Web Apps Outperform Standard Websites",
    excerpt: "Learn how React, cloud databases, and API-driven architectures convert passive traffic into active leads.",
    content: "Speed and responsiveness directly impact user acquisition. Here is why full-stack architectures deliver superior conversions...",
    author: "Omnivolta Digital Tech Team",
    date: new Date().toISOString(),
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80"
  }
];

// Auto-seed function for services
const autoSeedServices = async () => {
  try {
    const count = await Service.countDocuments();
    if (count < 13) {
      console.log(`Database collection has ${count} service items. Re-seeding all 13 services...`);
      await Service.deleteMany({});
      await Service.insertMany(servicesData);
      console.log("Database successfully populated with all 13 services!");
    } else {
      console.log(`Database already contains ${count} service records. Skipping service auto-seed.`);
    }
  } catch (error) {
    console.error("Service auto-seeding error:", error);
  }
};

// Auto-seed function for blogs
const autoSeedBlogs = async () => {
  try {
    const count = await Blog.countDocuments();
    if (count === 0) {
      console.log("Database blogs collection is empty. Auto-seeding sample blogs...");
      await Blog.insertMany(sampleBlogs);
      console.log("Database successfully populated with sample blogs!");
    } else {
      console.log(`Database already contains ${count} blog articles. Skipping blog auto-seed.`);
    }
  } catch (error) {
    console.error("Blog auto-seeding error:", error);
  }
};

// MongoDB connection
const connectToMongoDB = async () => {
  try {
    const MONGO_URI =
      process.env.MONGO_URI ||
      "mongodb+srv://brightleeti_db_user:PdgAZrd3Je5BubUk@cluster0.oomfpl8.mongodb.net/";

    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB Atlas successfully.");

    // Trigger auto-seed functions after database connection succeeds
    await autoSeedServices();
    await autoSeedBlogs();
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

connectToMongoDB();

// API Routes
app.use("/blogs", blogRoutes);
app.use("/services", serviceRoutes);

// Contact form email handling route
app.post("/send-email", async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER || "testnodemailerrai@gmail.com",
        pass: process.env.EMAIL_PASS || "Test@Nodemailer@Rai",
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.DESIGNATED_EMAIL || "testmail@example.com",
      subject: "New Omnivolta Digital Contact Form Submission",
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);

    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, error: "Error sending email" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;