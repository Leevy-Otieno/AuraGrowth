import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import api from '../../config';

const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch blog posts from the API
    fetch(`${api}/blogs`)
      .then((response) => response.json())
      .then((data) => {
        setBlogPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching blog posts:', error);
        setLoading(false);
      });
  }, []);

  const getFirstSentence = (text) => {
    if (!text) return "";
    const sanitizedContent = text.replace(/<\/?p>|<\/?h3>/g, "");
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
          <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-400">Insights & Articles</h2>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">Latest Blogs</h1>
          <p className="text-slate-300">
            Explore our latest industry insights, digital strategies, and expert company updates.
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
            {blogPosts.map((post) => (
              <div 
                key={post._id} 
                className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1.5 shadow-xl flex flex-col justify-between group"
              >
                <div>
                  {/* Blog Image */}
                  <div className="relative h-48 overflow-hidden bg-slate-950">
                    <img 
                      src={post.imageUrl} 
                      alt={post.title} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
                  </div>

                  {/* Blog Content */}
                  <div className="p-6 space-y-3">
                    <h3 className="text-lg font-bold text-white line-clamp-2 group-hover:text-cyan-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-slate-400 text-sm line-clamp-3 leading-relaxed">
                      {getFirstSentence(post.content)}...
                    </p>
                  </div>
                </div>

                {/* Read More Action */}
                <div className="px-6 pb-6 pt-0">
                  <Link to={`/blog/${post._id}`} className="block">
                    <button className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold text-sm shadow-md shadow-blue-600/20 transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 group-hover:shadow-cyan-500/30">
                      <span>Read More</span>
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
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

export default BlogPage;