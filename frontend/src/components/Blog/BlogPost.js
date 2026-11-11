import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import moment from 'moment';
import api from '../../config';

// 14 Comprehensive, Wordy, and Highly Detailed Master Fallback Articles
const fallbackBlogs = [
  {
    _id: "blog-1",
    title: "10 Growth Strategies for Scaling Digital Brands in 2026",
    content: `
      <p>Scaling a modern brand in today's hyper-competitive digital ecosystem demands significantly more than merely increasing paid ad spend or launching occasional promotional discounts. Today's top-performing digital agencies integrate multi-channel attribution modeling, AI-driven customer journey automation, and continuous conversion rate optimization (CRO) directly into every layer of their sales funnels.</p>
      
      <h2>1. Hyper-Personalized Audience Segmentation</h2>
      <p>Generic mass-market messaging is officially obsolete. Modern consumers expect brand interactions tailored specifically to their immediate behavioral touchpoints, previous purchase histories, and distinct pain points. By implementing granular dynamic user tagging across your customer relationship management (CRM) systems, your agency can serve laser-focused creative assets that elevate conversion efficiency by up to 300%.</p>
      
      <h2>2. Omnichannel Content Distribution Engine</h2>
      <p>High-growth brands do not rely on a single acquisition channel. Instead, they operate a centralized content distribution engine. A single pillar piece of content—such as an in-depth video interview or a technical whitepaper—should be systematically repurposed into short-form video hooks for TikTok and Instagram Reels, authoritative long-form text articles for LinkedIn, and high-converting copy for email broadcasts.</p>

      <h2>3. Algorithmic Paid Media Architecture</h2>
      <p>Paid media scaling requires a structural separation between top-of-funnel (TOFU) prospecting campaigns and bottom-of-funnel (BOFU) retargeting loops. By maintaining strict negative keyword rosters and leveraging dynamic creative optimization (DCO), brands ensure their ad budgets are constantly channeled toward high-intent users demonstrating genuine buying behavior.</p>

      <h2>4. Sustainable Organic Authority & Search Intent</h2>
      <p>While paid ads deliver immediate customer traffic, organic search traffic builds long-term enterprise valuation. Pairing paid acquisition campaigns with semantic SEO content hubs ensures your business captures intent-driven keywords organically, reducing your long-term Customer Acquisition Cost (CAC) and shielding your pipeline against sudden ad platform price fluctuations.</p>
    `,
    author: "Leevy Otieno",
    date: "2026-11-02T10:00:00.000Z",
    imageUrl: "https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?auto=format&fit=crop&w=1200&q=80"
  },
  {
    _id: "blog-2",
    title: "Why React & Modern Cloud Architecture Drive E-Commerce",
    content: `
      <p>In modern e-commerce engineering, page load latency directly governs overall profitability. Research shows that every additional second of page load latency decreases visitor conversions by up to 7%. Shifting away from legacy monolithic web platforms toward decoupled, full-stack React single-page applications (SPAs) supported by resilient cloud microservices delivers the sub-second speed modern shoppers demand.</p>
      
      <h2>Sub-Second Render Speeds & Virtual DOM Optimization</h2>
      <p>React's virtual DOM mechanism minimizes expensive browser re-paints by updating only the DOM components that undergo explicit state changes. When combined with server-side rendering (SSR) frameworks like Next.js or optimized single-page static hydration, your digital store yields instantaneous page transitions and silky smooth visual updates during high-volume shopping campaigns.</p>
      
      <h2>Microservices & Asynchronous API Architecture</h2>
      <p>Decoupling your user interface from backend databases means your product catalog, payment processing engines, inventory management databases, and shipping APIs communicate independently through lightweight REST and GraphQL endpoints. If your inventory management server experiences a spike in load during a flash sale, your storefront remains online, fast, and fully responsive to customer checkout attempts.</p>

      <h2>Enterprise Cloud Scalability with Serverless Infrastructure</h2>
      <p>Deploying application logic to distributed edge networks allows static assets and API routes to be executed directly in the geographic region nearest to the user. This edge-rendering paradigm eliminates global latency, provides built-in DDoS defense mechanisms, and ensures your application automatically scales server capacity up or down based on real-time traffic spikes.</p>
    `,
    author: "Omnivolta Digital Tech Team",
    date: "2026-10-28T10:00:00.000Z",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80"
  },
  {
    _id: "blog-3",
    title: "Mastering Short-Form Video Algorithms for TikTok & Reels",
    content: `
      <p>Short-form vertical video is no longer just a trend—it is the dominant format for consumer attention across social media. However, going viral or converting viewers into paying customers requires a deep understanding of algorithm metrics: specifically hook rate, average watch duration, and completion percentage.</p>
      
      <h2>The Critical 3-Second Visual & Auditory Hook</h2>
      <p>Social media algorithms analyze how many users scroll past your video versus how many stay past the 3-second mark. Winning hooks combine strong visual movement within the first 500 milliseconds, on-screen text overlays, and an immediate auditory pattern-interrupt that halts passive scrolling.</p>
      
      <h2>Pacing, Kinetic Typography, and Sound Selection</h2>
      <p>Once you capture attention, retaining it requires rapid visual shifts every 1.5 to 2.5 seconds. Incorporating dynamic B-roll transitions, kinetic typography captions, custom sound effects, and trending audio beds creates a high-energy visual flow that keeps viewer retention graphs high throughout the clip.</p>

      <h2>Strategic Call-to-Actions (CTAs) That Convert</h2>
      <p>Never end a high-retention video abruptly. Direct viewers toward a specific, frictionless action—such as commenting a keyword for an automated link delivery, visiting your profile link, or saving the post for later reference. Algorithms reward high saves and shares by accelerating post reach into broader recommendation feeds.</p>
    `,
    author: "Creative Production Team",
    date: "2026-10-24T10:00:00.000Z",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80"
  },
  {
    _id: "blog-4",
    title: "The Anatomy of a High-Converting Google Ads PPC Campaign",
    content: `
      <p>Pay-Per-Click (PPC) advertising can be either a highly predictable sales generator or an expensive money pit. Building campaigns that consistently yield high Return on Ad Spend (ROAS) requires meticulous match-type strategies, robust negative keyword lists, and tight landing page copy alignment.</p>
      
      <h2>Single-Theme Ad Groups (STAGs) & Relevance Scores</h2>
      <p>Organizing your campaign into Single-Theme Ad Groups allows you to write ad headlines and descriptions that precisely match search terms. Higher keyword relevance directly raises your Google Quality Score, lowers your Cost-Per-Click (CPC), and elevates your ad positioning over competitors.</p>
      
      <h2>Aggressive Negative Keyword Management</h2>
      <p>Preventing wasteful ad spend is just as vital as bidding on winning keywords. By maintaining active negative keyword lists (filtering out words like 'free', 'jobs', 'cheap', or unrelated DIY searches), you ensure every single dollar is strictly dedicated to high-intent prospective buyers.</p>

      <h2>Conversion Attribution & Server-Side Tracking</h2>
      <p>Relying solely on browser-based pixel tracking leads to lost data due to ad-blockers and privacy restrictions. Implementing server-side Conversion APIs (CAPI) provides Google's smart bidding algorithms with complete, accurate conversion signals, accelerating target cost-per-acquisition (tCPA) optimization.</p>
    `,
    author: "PPC Growth Team",
    date: "2026-10-19T10:00:00.000Z",
    imageUrl: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=1200&q=80"
  },
  {
    _id: "blog-5",
    title: "Building an Algorithm-Proof SEO Strategy That Actually Ranks",
    content: `
      <p>Search Engine Optimization has evolved beyond basic keyword density stuffing and spammy backlink creation. Modern search engine algorithms evaluate semantic relevance, authoritativeness, technical website health, and genuine user engagement signals to determine ranking positions.</p>
      
      <h2>Semantic Content Hubs & Topical Authority</h2>
      <p>Search engines rank websites that demonstrate complete topical coverage. Rather than writing disconnected articles, build structured pillar-and-cluster content hubs. Group related articles around core industry pillars and connect them with intuitive internal links to prove comprehensive expertise to search crawlers.</p>
      
      <h2>Technical SEO Infrastructure & Core Web Vitals</h2>
      <p>Even the best content will fail to rank if search engines struggle to crawl or render your pages. Optimize Core Web Vitals by eliminating render-blocking scripts, compressing images into modern WebP/AVIF formats, setting up proper XML sitemaps, and implementing clean JSON-LD structured schema markup.</p>

      <h2>High-Authority Digital PR & Backlink Engineering</h2>
      <p>Backlinks remain one of the most powerful ranking factors. Focus on earning high-context links from reputable industry publications, news portals, and authoritative blogs through original research data, expert quote contributions, and digital PR campaigns.</p>
    `,
    author: "SEO Division",
    date: "2026-10-15T10:00:00.000Z",
    imageUrl: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=1200&q=80"
  },
  {
    _id: "blog-6",
    title: "Cross-Platform Mobile Apps: React Native vs. Flutter in 2026",
    content: `
      <p>Building separate native apps for iOS and Android can quickly double development budgets and slow down product releases. Cross-platform engineering frameworks allow development teams to write code once and deploy across both app stores without sacrificing native feel or performance.</p>
      
      <h2>React Native: JavaScript Ecosystem & Code Sharing</h2>
      <p>React Native leverages familiar JavaScript and React patterns while rendering genuine native iOS and Android UI components. This framework excels for web-first development teams seeking to share business logic, state management stores, and utility code directly between their web and mobile applications.</p>
      
      <h2>Flutter: High-Performance Skia/Impeller Canvas Engine</h2>
      <p>Flutter compiles Dart code directly into native ARM processor machine code, bypassing Javascript bridges entirely. Its custom rendering engine grants pixel-perfect UI consistency across different device screen sizes and delivers silky 120fps animations for graphic-heavy application layouts.</p>

      <h2>Making the Right Strategic Engineering Choice</h2>
      <p>Choose React Native if your team already has deep React expertise and requires extensive third-party library ecosystems. Opt for Flutter if your application relies heavily on complex custom vector graphics, custom canvas drawings, or strict cross-device visual parity.</p>
    `,
    author: "Engineering Team",
    date: "2026-10-10T10:00:00.000Z",
    imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80"
  },
  {
    _id: "blog-7",
    title: "How to Build an Automated Email Marketing Nurture Funnel",
    content: `
      <p>Email marketing remains one of the highest ROI channels in digital strategy, consistently generating up to $36 for every $1 invested. However, broadcast email blasts are far less effective than automated, event-triggered behavioral nurture flows.</p>
      
      <h2>The Multi-Step Onboarding & Welcome Series</h2>
      <p>When a new lead subscribes, their attention is at its peak. A well-designed 4-part welcome sequence introduces your brand ethos, highlights social proof case studies, delivers immediate educational value, and presents an exclusive introductory offer to drive initial conversion.</p>
      
      <h2>Behavioral Triggers & Abandoned Cart Recovery</h2>
      <p>Set up automated triggers based on real-time user actions—such as viewing specific product categories, downloading resources, or abandoning items in a shopping cart. Timely, automated follow-up messages sent within 1 hour of exit intent recover significant revenue that would otherwise be lost.</p>

      <h2>Audience List Hygiene & Deliverability Best Practices</h2>
      <p>Maintaining high inbox deliverability requires clean subscriber lists. Regularly prune inactive subscribers who haven't opened emails in 90 days, set up proper SPF, DKIM, and DMARC authentication protocols, and segment your list to ensure high engagement rates.</p>
    `,
    author: "Retention Marketing Team",
    date: "2026-10-05T10:00:00.000Z",
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80"
  },
  {
    _id: "blog-8",
    title: "UI/UX Design Systems: From Wireframes to High Conversions",
    content: `
      <p>Exceptional digital design goes far beyond visual beauty—it is a functional discipline focused on removing friction, guiding user attention, and encouraging action. A cohesive design system accelerates product updates while guaranteeing visual parity across platforms.</p>
      
      <h2>Design Tokens, Components, and Figma Systems</h2>
      <p>Establishing centralized design tokens for typography scales, color palettes, spacing grids, and rounded border radii prevents custom one-off styles from cluttering codebases. Shared component libraries allow designers and developers to build new pages in hours instead of weeks.</p>
      
      <h2>Frictionless Visual Hierarchy & Accessibility (WCAG)</h2>
      <p>Guide your user's eyes using contrast, typography weight, and whitespace. Ensuring your application meets Web Content Accessibility Guidelines (WCAG) guarantees legibility for all users while improving general usability across mobile and desktop devices.</p>

      <h2>Iterative Usability Testing & Heatmap Analysis</h2>
      <p>Never rely strictly on subjective opinions. Implement session recording tools and click heatmaps to observe actual user behaviors, identify navigation drop-off points, and iteratively optimize high-intent landing page elements based on empirical data.</p>
    `,
    author: "Design Studio",
    date: "2026-09-29T10:00:00.000Z",
    imageUrl: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=1200&q=80"
  },
  {
    _id: "blog-9",
    title: "Social Media Boosting: Transforming Organic Posts into Paid Sales",
    content: `
      <p>Relying purely on organic social reach in 2026 means reaching only a fraction of your target audience. Social media post amplification allows brands to turn organic content into high-converting paid acquisition campaigns.</p>
      
      <h2>Identifying Winning Organic Signals</h2>
      <p>Before putting ad budget behind a post, evaluate its organic performance. Posts that naturally achieve high organic engagement, long comment threads, and frequent shares prove market resonance and will deliver far higher Return on Ad Spend (ROAS) when boosted.</p>
      
      <h2>Micro-Demographic & Custom Lookalike Audiences</h2>
      <p>Amplify top-performing posts by targeting them directly to custom lookalike audiences created from your highest-value buyers, email lists, or web traffic. Refine targeting parameters by interest groups and geographic regions to ensure maximum relevance.</p>

      <h2>Converting Likes into Pipeline Revenue</h2>
      <p>Never boost a post without a clear next step. Attach dedicated landing page link buttons, automated lead forms, or messenger chat prompts to transform casual post engagement into qualified sales leads.</p>
    `,
    author: "Social Ads Team",
    date: "2026-09-24T10:00:00.000Z",
    imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80"
  },
  {
    _id: "blog-10",
    title: "Cloud Infrastructure Security & Cost Optimization Blueprint",
    content: `
      <p>As applications scale, cloud hosting infrastructure on platforms like AWS, Azure, and Google Cloud can quickly become complex and costly. Implementing strong cloud management ensures enterprise resilience without unexpected budget overruns.</p>
      
      <h2>Zero-Trust Security & IAM Access Protocols</h2>
      <p>Protecting sensitive application data requires a zero-trust architecture. Enforce strict Identity and Access Management (IAM) role policies, mandate multi-factor authentication across all admin accounts, and encrypt data at rest and in transit using SSL/TLS protocols.</p>
      
      <h2>Infrastructure-as-Code (IaC) & Automated Provisioning</h2>
      <p>Managing server configurations manually leads to human error and inconsistent deployment environments. By defining server setups through code using Terraform or CloudFormation scripts, tech teams can spin up or tear down identical production environments instantly.</p>

      <h2>Proactive Cost Optimization & Resource Auto-Scaling</h2>
      <p>Prevent unexpected cloud bills by establishing automated scaling rules. Configure auto-scaling groups to provision additional server instances during peak traffic hours, and automatically scale down capacity during quiet night hours to eliminate wasted hosting spend.</p>
    `,
    author: "Cloud Consulting Team",
    date: "2026-09-18T10:00:00.000Z",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80"
  },
  {
    _id: "blog-11",
    title: "Copywriting Hacks: Emotional Hooks That Drive Action",
    content: `
      <p>Great copywriting is not about writing clever poetry—it is about clear, persuasive communication that solves consumer problems and drives decisive action. The right phrasing can turn passive readers into passionate buyers.</p>
      
      <h2>The PAS Framework: Problem, Agitate, Solution</h2>
      <p>The PAS framework is one of the most effective conversion writing techniques. Clearly state the exact problem your customer faces, agitate the emotional frustration and cost of leaving that problem unresolved, and present your product as the definitive solution.</p>
      
      <h2>Writing Clear Value Propositions Over Feature Lists</h2>
      <p>Customers rarely buy features; they buy transformations. Instead of listing technical specifications, translate every feature into a direct benefit. Show potential customers how your service saves them time, increases their earnings, or eliminates stress.</p>

      <h2>Power Verbs, Social Proof, and Risk Reversal</h2>
      <p>Replace weak passive verbs with strong, action-oriented language. Pair persuasive messaging with undeniable social proof—such as customer testimonials, quantitative metrics, and money-back guarantees—to lower purchasing friction and build trust.</p>
    `,
    author: "Editorial Team",
    date: "2026-09-12T10:00:00.000Z",
    imageUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1200&q=80"
  },
  {
    _id: "blog-12",
    title: "Community Management: Turning Followers into Brand Evangelists",
    content: `
      <p>Social media followers represent interest, but an active community represents long-term revenue. Effective community management turns casual account followers into dedicated brand advocates who champion your business online.</p>
      
      <h2>Active Moderation & Rapid Response Times</h2>
      <p>Social media users expect near-instant responses. Timely replies to comments, direct messages, and brand mentions show your audience that your company actively values customer communication, building trust and engagement.</p>
      
      <h2>Fostering User-Generated Content (UGC)</h2>
      <p>Encourage your community to post photos, videos, and reviews using your products. Featuring user-generated content across your official feeds provides authentic social proof while making your customers feel seen and appreciated.</p>

      <h2>Establishing Consistent Brand Voice Guidelines</h2>
      <p>Whether your brand persona is professional, humorous, educational, or bold, maintain a consistent tone across every channel. Clear communication guidelines ensure your team presents a cohesive brand identity during every interaction.</p>
    `,
    author: "Social Strategy Team",
    date: "2026-09-07T10:00:00.000Z",
    imageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80"
  },
  {
    _id: "blog-13",
    title: "Graphic Design Systems for Multi-Platform Ad Creatives",
    content: `
      <p>Modern consumers encounter hundreds of digital ads daily. Creating ad visuals that break through visual clutter requires standardized design systems tailored to different platform placements.</p>
      
      <h2>Designing for Aspect Ratios & Mobile Screens</h2>
      <p>Ad visual assets must be designed for their platform context—from 9:16 vertical stories to 1:1 square feed posts and 16:9 desktop banners. Ensure core text elements and call-to-action buttons remain visible and clear on small mobile displays.</p>
      
      <h2>Visual Hierarchy & Focal Point Design</h2>
      <p>A cluttered ad design leads to low click-through rates. Maintain a clear focal point using high-contrast typography, bold visual assets, and intentional whitespace to direct attention straight to your offer.</p>

      <h2>Iterative Dynamic Creative Testing</h2>
      <p>Never rely on a single visual style. Test multiple variations of product shots, background colors, overlay badges, and headlines to discover which creative combinations deliver the lowest Cost-Per-Click (CPC) and highest conversion rate.</p>
    `,
    author: "Visual Brand Team",
    date: "2026-09-02T10:00:00.000Z",
    imageUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=80"
  },
  {
    _id: "blog-14",
    title: "Data Analytics & Attribution Modeling for Modern Agencies",
    content: `
      <p>Data-driven decisions are the cornerstone of successful digital marketing. Implementing clear analytics tracking and multi-touch attribution ensures every marketing dollar is invested efficiently.</p>
      
      <h2>Moving Beyond Single-Touch Attribution</h2>
      <p>Relying solely on first-click or last-click attribution misrepresents customer journey behavior. Multi-touch attribution models give appropriate credit to early discovery channels (like video ads or social posts) as well as final conversion touchpoints (like search ads or emails).</p>
      
      <h2>Custom Dashboard Reporting & Key Metrics</h2>
      <p>Avoid vanity metrics like total impressions or simple likes. Focus tracking on actionable metrics—including Customer Acquisition Cost (CAC), Lifetime Value (LTV), Conversion Rates, and Return on Ad Spend (ROAS)—displayed cleanly in real-time dashboards.</p>

      <h2>Server-Side Tracking & Privacy-First Data Collection</h2>
      <p>With changing privacy regulations and cookie restrictions, server-side tracking provides reliable measurement while respecting user privacy. Setting up server-to-server data connections ensures your marketing reporting stays accurate over time.</p>
    `,
    author: "Data Analytics Team",
    date: "2026-08-27T10:00:00.000Z",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"
  }
];

const BlogPostDetail = () => {
  const [blogPost, setBlogPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await fetch(`${api}/blogs/${id}`);
        if (!response.ok) throw new Error('Post not found on server');
        const data = await response.json();

        if (data && (data._id || data.title)) {
          setBlogPost(data);
        } else {
          const matchedFallback = fallbackBlogs.find(b => b._id === id) || fallbackBlogs[0];
          setBlogPost(matchedFallback);
        }
      } catch (error) {
        console.error('Error fetching blog post, loading fallback article:', error);
        const matchedFallback = fallbackBlogs.find(b => b._id === id) || fallbackBlogs[0];
        setBlogPost(matchedFallback);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center pt-20">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400" />
          <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider">Loading Article...</p>
        </div>
      </div>
    );
  }

  if (!blogPost) return null;

  // Property normalization
  const image = blogPost.imageUrl || blogPost.image || fallbackBlogs[0].imageUrl;
  const title = blogPost.title || "Digital Marketing Insight";
  const author = blogPost.author || "Brian Otieno Team";
  const rawDate = blogPost.createdAt || blogPost.date || new Date().toISOString();
  const formattedDate = moment(rawDate).isValid() ? moment(rawDate).format('MMM D, YYYY') : "Recent";
  const content = blogPost.content || blogPost.excerpt || "<p>Article content currently updating.</p>";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-blue-600 selection:text-white pt-32 pb-24">
      {/* Background Radial Glow */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.15),rgba(255,255,255,0))] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Back to Blogs Link */}
        <div className="mb-8">
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group"
          >
            <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to All Articles</span>
          </Link>
        </div>

        {/* Article Container Card */}
        <article className="bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
          
          {/* Featured Image */}
          {image && (
            <div className="w-full h-72 sm:h-96 overflow-hidden bg-slate-950 relative">
              <img 
                src={image} 
                alt={title} 
                className="w-full h-full object-cover" 
                onError={(e) => {
                  e.target.src = fallbackBlogs[0].imageUrl;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
            </div>
          )}

          <div className="p-6 sm:p-10 lg:p-12 space-y-6">
            
            {/* Title */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {title}
            </h1>

            {/* Subtitle / Metadata */}
            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-medium text-slate-400 pb-6 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>By <strong className="text-slate-200">{author}</strong></span>
              </div>
              <span>•</span>
              <span>{formattedDate}</span>
            </div>

            {/* Extended Article Content Display */}
            <div 
              className="prose prose-invert max-w-none text-slate-300 text-base sm:text-lg leading-relaxed space-y-6 pt-4 border-0 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:pt-6 [&_h2]:pb-2 [&_h2]:border-b [&_h2]:border-slate-800/80 [&_p]:text-slate-300 [&_p]:leading-relaxed"
              dangerouslySetInnerHTML={{ __html: content }}
            />

          </div>
        </article>

      </div>
    </div>
  );
};

export default BlogPostDetail;