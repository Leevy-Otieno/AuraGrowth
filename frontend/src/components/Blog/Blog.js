import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import api from '../../config';

// Master list of sample blog articles
const fallbackBlogs = [
  {
    _id: "blog-1",
    title: "10 Growth Strategies for Scaling Digital Brands in 2026",
    content: "Discover how top-tier agencies integrate AI automation, high-converting copy, and multi-channel attribution to turn traffic into revenue.",
    author: "Leevy Otieno",
    date: "Nov 02, 2026",
    imageUrl: "https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?auto=format&fit=crop&w=800&q=80"
  },
  {
    _id: "blog-2",
    title: "Why React & Modern Cloud Architecture Drive E-Commerce",
    content: "Speed and responsiveness directly impact user acquisition. Learn why full-stack microservice architectures outpace legacy solutions.",
    author: "Omnivolta Digital Tech Team",
    date: "Oct 28, 2026",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
  },
  {
    _id: "blog-3",
    title: "Mastering Short-Form Video Algorithms for TikTok & Reels",
    content: "Captivate audiences in the first 3 seconds using kinetic typography, visual hooks, and strategic pacing to maximize watch time.",
    author: "Omnivolta Digital Creative Team",
    date: "Oct 24, 2026",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
  },
  {
    _id: "blog-4",
    title: "The Anatomy of a High-Converting Google Ads PPC Campaign",
    content: "Stop wasting ad spend. Here is a blueprint for precise negative keyword filtering, single-theme ad groups, and landing page alignment.",
    author: "PPC Growth Team",
    date: "Oct 19, 2026",
    imageUrl: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=800&q=80"
  },
  {
    _id: "blog-5",
    title: "Building an Algorithm-Proof SEO Strategy That Actually Ranks",
    content: "Semantic search and user intent have redefined search engine optimization. Explore our framework for technical audits and authority links.",
    author: "SEO Division",
    date: "Oct 15, 2026",
    imageUrl: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=800&q=80"
  },
  {
    _id: "blog-6",
    title: "Cross-Platform Mobile Apps: React Native vs. Flutter in 2026",
    content: "Selecting the right mobile framework dictates your market velocity. We analyze performance benchmarks, developer experience, and UI rendering.",
    author: "Engineering Team",
    date: "Oct 10, 2026",
    imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80"
  },
  {
    _id: "blog-7",
    title: "How to Build an Automated Email Marketing Nurture Funnel",
    content: "Turn casual subscribers into repeatable customers with behavioral trigger sequences, personalized newsletters, and retention workflows.",
    author: "Retention Marketing Team",
    date: "Oct 05, 2026",
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80"
  },
  {
    _id: "blog-8",
    title: "UI/UX Design Systems: From Wireframes to High Conversions",
    content: "Eliminate digital friction points. Design intuitive user pathways using Figma token systems, accessible contrast, and clear visual hierarchy.",
    author: "Design Studio",
    date: "Sep 29, 2026",
    imageUrl: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80"
  },
  {
    _id: "blog-9",
    title: "Social Media Boosting: Transforming Organic Posts into Paid Sales",
    content: "Scale organic momentum into predictable customer acquisition using precise demographic micro-targeting and dynamic creative scaling.",
    author: "Social Ads Team",
    date: "Sep 24, 2026",
    imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80"
  },
  {
    _id: "blog-10",
    title: "Cloud Infrastructure Security & Cost Optimization Blueprint",
    content: "Migrating to AWS, GCP, or Azure requires proactive monitoring. Learn how to architect zero-downtime environments without budget overruns.",
    author: "Cloud Consulting Team",
    date: "Sep 18, 2026",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80"
  },
  {
    _id: "blog-11",
    title: "Copywriting Hacks: Emotional Hooks That Drive Action",
    content: "Words create brand value. Discover the psychological frameworks top copywriters use to craft irresistible value propositions and landing pages.",
    author: "Editorial Team",
    date: "Sep 12, 2026",
    imageUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80"
  },
  {
    _id: "blog-12",
    title: "Community Management: Turning Followers into Brand Evangelists",
    content: "Consistent daily engagement builds authentic authority. Explore active moderation strategies that build long-term customer loyalty.",
    author: "Social Strategy Team",
    date: "Sep 07, 2026",
    imageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80"
  },
  {
    _id: "blog-13",
    title: "Graphic Design Systems for Multi-Platform Ad Creatives",
    content: "Consistent visual aesthetics foster immediate brand recognition across Instagram feeds, LinkedIn banners, and web display ads.",
    author: "Visual Brand Team",
    date: "Sep 02, 2026",
    imageUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80"
  },
  {
    _id: "blog-14",
    title: "Data Analytics & Attribution Modeling for Modern Agencies",
    content: "Make smarter marketing investments by implementing end-to-end multi-touch attribution, server-side tracking, and conversion API models.",
    author: "Data Analytics Team",
    date: "Aug 27, 2026",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
  }
];

const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch(`${api}/blogs`);
        if (!response.ok) throw new Error('Failed to fetch from API');
        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          // Prevent duplicates by checking IDs
          const dbIds = new Set(data.map(post => post._id));
          const filteredFallbacks = fallbackBlogs.filter(fb => !dbIds.has(fb._id));
          
          // Place newly created database posts first, followed by sample posts
          setBlogPosts([...data, ...filteredFallbacks]);
        } else {
          setBlogPosts(fallbackBlogs);
        }
      } catch (error) {
        console.error('Error fetching blog posts, rendering fallbacks:', error);
        setBlogPosts(fallbackBlogs);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const getFirstSentence = (text) => {
    if (!text) return "";
    const sanitizedContent = text.replace(/<\/?p>|<\/?h3>|<\/?h2>/g, "");
    const sentences = sanitizedContent.split(/[.!?]/);
    return sentences[0];
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-blue-600 selection:text-white pt-32 pb-20">
      {/* Background Radial Glow */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.15),rgba(255,255,255,0))] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/80 border border-cyan-800/60 px-4 py-1.5 rounded-full inline-block shadow-lg">
            Insights & Strategy
          </h2>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Latest Blogs & Articles
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Explore our latest industry insights, digital growth strategies, software engineering principles, and expert company updates.
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <ClipLoader color="#38bdf8" loading={loading} size={70} />
            <p className="text-sm font-semibold text-slate-400 tracking-wider uppercase">Loading Articles...</p>
          </div>
        ) : (
          /* Blog Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, idx) => {
              const postImage = post.imageUrl || post.image || fallbackBlogs[idx % fallbackBlogs.length].imageUrl;
              const postTitle = post.title || "Digital Growth Insight";
              const postContent = post.content || post.excerpt || "Explore our latest digital strategy analysis and technical breakdown.";
              const postAuthor = post.author || "Omnivolta Digital Team";
              const postDate = post.createdAt || post.date 
                ? new Date(post.createdAt || post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) 
                : "Recent";

              return (
                <div 
                  key={post._id || idx} 
                  className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1.5 shadow-xl flex flex-col justify-between group"
                >
                  <div>
                    {/* Blog Image */}
                    <div className="relative h-48 overflow-hidden bg-slate-950">
                      <img 
                        src={postImage} 
                        alt={postTitle} 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
                        onError={(e) => {
                          e.target.src = fallbackBlogs[0].imageUrl;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                      <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider text-white bg-slate-950/80 backdrop-blur-md border border-slate-800 px-2.5 py-1 rounded-full">
                        {postDate}
                      </span>
                    </div>

                    {/* Blog Content */}
                    <div className="p-6 space-y-3">
                      <div className="flex items-center space-x-2 text-xs text-cyan-400 font-semibold">
                        <span>By {postAuthor}</span>
                      </div>
                      <h3 className="text-lg font-bold text-white line-clamp-2 group-hover:text-cyan-400 transition-colors">
                        {postTitle}
                      </h3>
                      <p className="text-slate-400 text-sm line-clamp-3 leading-relaxed">
                        {getFirstSentence(postContent)}...
                      </p>
                    </div>
                  </div>

                  {/* Read More Action */}
                  <div className="px-6 pb-6 pt-0">
                    <Link to={`/blog/${post._id}`} className="block">
                      <button className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold text-sm shadow-md shadow-blue-600/20 transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 group-hover:shadow-cyan-500/30">
                        <span>Read Full Article</span>
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
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

export default BlogPage;