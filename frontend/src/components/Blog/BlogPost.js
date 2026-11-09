import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles
import { useParams, Link } from 'react-router-dom';
import moment from 'moment'; // Import moment for date formatting
import api from '../../config';

const BlogPostDetail = () => {
  const [blogPost, setBlogPost] = useState({});
  const { id } = useParams();

  useEffect(() => {
    // Fetch the specific blog post based on the id parameter
    fetch(`${api}/blogs/${id}`)
      .then((response) => response.json())
      .then((data) => setBlogPost(data))
      .catch((error) => console.error('Error fetching blog post details:', error));
  }, [id]); // Include id in the dependency array to re-fetch when the id changes

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
          {blogPost.imageUrl && (
            <div className="w-full h-72 sm:h-96 overflow-hidden bg-slate-950 relative">
              <img 
                src={blogPost.imageUrl} 
                alt={blogPost.title || "Blog Post Banner"} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
            </div>
          )}

          <div className="p-6 sm:p-10 lg:p-12 space-y-6">
            
            {/* Title */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {blogPost.title}
            </h1>

            {/* Subtitle / Metadata */}
            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-medium text-slate-400 pb-6 border-b border-slate-800">
              {blogPost.author && (
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span>By <strong className="text-slate-200">{blogPost.author}</strong></span>
                </div>
              )}
              {blogPost.createdAt && (
                <>
                  <span>•</span>
                  <span>{moment(blogPost.createdAt).format('MMM D, YYYY h:mm A')}</span>
                </>
              )}
            </div>

            {/* Quill Content Area with Custom Dark Theme Typography */}
            <div className="blog-content-wrapper text-slate-300 leading-relaxed space-y-4">
              <ReactQuill
                readOnly
                theme="snow"
                value={blogPost.content || ''}
                modules={{ toolbar: false }}
                className="custom-quill-display border-0 bg-transparent text-slate-300"
              />
            </div>

          </div>
        </article>

      </div>
    </div>
  );
};

export default BlogPostDetail;