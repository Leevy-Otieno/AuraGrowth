import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import api from '../../config';

// Comprehensive lookup dictionary for all digital marketing & creative services
const serviceDetailsMap = {
  'video-editing': {
    serviceCardHeading: 'Video Editing & Motion Graphics',
    serviceCardPara: 'Captivate your audience in the first 3 seconds. Our expert video editors and motion designers craft high-retention short-form content (Reels, TikToks, Shorts) and cinematic long-form brand videos complete with seamless cuts, custom animations, sound design, and color grading.',
    serviceInnerHeading: 'Engineered for Algorithm Retention',
    serviceInnerPara: 'We use modern pacing, kinetic typography, and visual hooks to maximize watch time, viewer retention, and algorithmic distribution across all video platforms.'
  },
  'content-creation': {
    serviceCardHeading: 'Content Creation & Production',
    serviceCardPara: 'Stand out in a crowded digital landscape. We handle full-scale content ideation, scriptwriting, brand storytelling, and multi-format asset creation designed to resonate deeply with your target buyer persona.',
    serviceInnerHeading: 'Scalable Content Frameworks',
    serviceInnerPara: 'We build structured content engines that produce consistent, high-value narratives across your blog, social media, and email channels.'
  },
  'graphic-design': {
    serviceCardHeading: 'Graphic Design & Brand Visuals',
    serviceCardPara: 'First impressions dictate conversion. Our senior graphic designers create thumb-stopping social media carousels, high-converting display ad banners, striking pitch decks, and professional visual identities that elevate your brand perception.',
    serviceInnerHeading: 'Cohesive Visual Aesthetics',
    serviceInnerPara: 'Every asset is meticulously crafted around your unique brand color palette and typography rules to ensure seamless visual harmony everywhere your customers find you.'
  },
  'ui-ux': {
    serviceCardHeading: 'UI/UX Design & Web Architecture',
    serviceCardPara: 'Turn visitors into brand superfans through intuitive digital experiences. We design user-centered web and mobile interfaces using advanced wireframing, user journey mapping, and conversion-focused UX architecture.',
    serviceInnerHeading: 'Seamless Digital Navigation',
    serviceInnerPara: 'We remove friction points from your user pathways, ensuring visitors effortlessly find what they need and convert into high-value leads.'
  },
  'writers': {
    serviceCardHeading: 'Professional Content Writers & Copywriting',
    serviceCardPara: 'Words matter. Our elite copywriters craft persuasive sales copy, authoritative blog posts, whitepapers, and landing page messaging that captivate readers, establish industry authority, and compel action.',
    serviceInnerHeading: 'SEO-Infused Storytelling',
    serviceInnerPara: 'Every piece of copy strikes the perfect balance between emotional consumer hook phrasing and search engine ranking optimization.'
  },
  'seo': {
    serviceCardHeading: 'Search Engine Optimization (SEO)',
    serviceCardPara: 'Our enterprise-grade SEO strategies are engineered to capture top rankings on Google. We combine rigorous technical audits, advanced keyword targeting, high-authority backlink acquisition, and structured on-page optimization to turn organic search into your most predictable revenue channel.',
    serviceInnerHeading: 'Why Choose Our SEO Framework?',
    serviceInnerPara: 'We focus on sustainable, algorithm-proof growth by aligning with user search intent and technical site performance.'
  },
  'ppc': {
    serviceCardHeading: 'Pay-Per-Click Advertising (PPC)',
    serviceCardPara: 'Stop waiting months for traffic. Our certified PPC specialists build hyper-targeted campaigns across Google Ads and paid social channels designed for immediate high-intent conversions and maximal ROAS.',
    serviceInnerHeading: 'Precision Budget Allocation',
    serviceInnerPara: 'Every dollar is tracked and optimized through real-time attribution modeling, negative keyword filtering, and custom high-converting landing page testing.'
  },
  'social-mgmt': {
    serviceCardHeading: 'Social Media Management',
    serviceCardPara: 'Build an engaged, loyal community around your brand. Our social media team handles end-to-end content curation, graphic asset production, daily posting schedules, and active audience engagement across all major platforms.',
    serviceInnerHeading: 'Consistent Brand Voice',
    serviceInnerPara: 'We transform your social channels into dynamic customer touchpoints that reflect your company culture, build trust, and drive inbound leads.'
  },
  'social-boost': {
    serviceCardHeading: 'Social Media Boosting & Ads',
    serviceCardPara: 'Supercharge your best-performing organic content with strategic paid promotion. We target precise demographic lookalike audiences to maximize visibility, increase video views, and skyrocket post engagement rates.',
    serviceInnerHeading: 'Amplified Reach & Viral Impact',
    serviceInnerPara: 'Turn everyday social posts into robust acquisition channels by putting them directly in front of active buyers most likely to convert.'
  },
  'email-mgmt': {
    serviceCardHeading: 'Email Management & Marketing Automation',
    serviceCardPara: 'Turn your subscriber list into a reliable profit center. We architect automated welcome series, abandoned cart recovery sequences, targeted segmentation newsletters, and comprehensive inbox management campaigns.',
    serviceInnerHeading: 'Maximized Customer Lifetime Value',
    serviceInnerPara: 'Nurture cold leads into lifelong brand advocates through automated behavioral trigger emails that deliver the right message at precisely the right moment.'
  }
};

const ServiceDetailsPage = () => {
  const { id } = useParams();
  const [serviceDetails, setServiceDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cleanId = id ? id.toLowerCase().trim() : '';

    // Check local lookup map for immediate rendering
    if (serviceDetailsMap[cleanId]) {
      setServiceDetails(serviceDetailsMap[cleanId]);
      setLoading(false);
      return;
    }

    // Backend fetch fallback if ID is dynamic
    fetch(`${api}/services/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && (data.serviceCardHeading || data.title || data.serviceType)) {
          setServiceDetails({
            serviceCardHeading: data.serviceCardHeading || data.title || data.serviceType,
            serviceCardPara: data.serviceCardPara || data.serviceOuterDescription || data.description,
            serviceInnerHeading: data.serviceInnerHeading || 'Strategic Execution & Results',
            serviceInnerPara: data.serviceInnerPara || 'Our customized approach guarantees continuous performance tracking and expert oversight.'
          });
        } else {
          setServiceDetails({
            serviceCardHeading: 'Digital Marketing & Creative Solution',
            serviceCardPara: 'Comprehensive customized solutions built to scale your enterprise and maximize return on investment.',
            serviceInnerHeading: 'Proven Methodologies',
            serviceInnerPara: 'Executed by certified industry professionals using data-backed frameworks.'
          });
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching service details:', error);
        setServiceDetails({
          serviceCardHeading: 'Digital Marketing & Creative Solution',
          serviceCardPara: 'Customized marketing and creative solutions tailored for your business growth and market domination.',
          serviceInnerHeading: 'Strategic Execution & Results',
          serviceInnerPara: 'Our expert team ensures transparent reporting, rigorous optimization, and maximum ROI.'
        });
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-blue-600 selection:text-white pt-32 pb-24">
      {/* Background Glow Effect */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.15),rgba(255,255,255,0))] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Navigation Back Link */}
        <div className="mb-8">
          <Link 
            to="/services" 
            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group"
          >
            <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Services</span>
          </Link>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <ClipLoader color="#38bdf8" loading={loading} size={70} />
            <p className="text-sm font-semibold text-slate-400 tracking-wider uppercase">Loading Service Details...</p>
          </div>
        ) : serviceDetails ? (
          <div className="space-y-8">
            
            {/* Service Header & Main Overview Card */}
            <div className="bg-slate-900 p-8 sm:p-12 rounded-3xl border border-slate-800 shadow-2xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10 space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Service Overview</span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  {serviceDetails.serviceCardHeading}
                </h1>
                <p className="text-slate-300 text-base sm:text-lg leading-relaxed pt-2">
                  {serviceDetails.serviceCardPara}
                </p>
              </div>
            </div>

            {/* Strategy / Highlights Block */}
            {serviceDetails.serviceInnerHeading && (
              <div className="bg-gradient-to-br from-blue-950/60 via-slate-900 to-slate-950 p-8 sm:p-12 rounded-3xl border border-blue-500/30 shadow-xl space-y-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {serviceDetails.serviceInnerHeading}
                </h2>
                <p className="text-slate-300 text-base leading-relaxed">
                  {serviceDetails.serviceInnerPara}
                </p>
              </div>
            )}

            {/* Call To Action Box */}
            <div className="bg-slate-900 p-8 sm:p-12 rounded-3xl border border-slate-800 shadow-2xl text-center space-y-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Request a free consultation!
              </h2>
              <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
                Ready to elevate your digital presence with elite video production, design, and marketing? Let's talk strategy.
              </p>
              <div>
                <Link
                  to="/contactus"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-sm tracking-wider shadow-lg shadow-blue-600/30 hover:shadow-cyan-500/40 transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  GET IN TOUCH
                </Link>
              </div>
            </div>

          </div>
        ) : null}

      </div>
    </div>
  );
};

export default ServiceDetailsPage;