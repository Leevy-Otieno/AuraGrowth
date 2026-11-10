import React, { useState } from "react";

const ContactUsForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState({ submitted: false, error: false });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { name, email, message };

    try {
      const response = await fetch("http://localhost:8000/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);
      setStatus({ submitted: true, error: false });
      setName("");
      setEmail("");
      setMessage("");
      setTimeout(() => setStatus({ submitted: false, error: false }), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus({ submitted: false, error: true });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-blue-600 selection:text-white pt-32 pb-24">
      {/* Background Radial Glow */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.15),rgba(255,255,255,0))] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Top Section: Info & Image Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
          
          {/* Contact Details Column */}
          <div className="lg:col-span-6 p-8 sm:p-12 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Get in Touch</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">CONTACT US</h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Whether you are looking for help with strategy, search engine optimization, content marketing, or something else, we would love to help. Send us a message, and we will get back to you as soon as possible.
              </p>
            </div>

            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-blue-600/20 text-blue-400">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-1">Address</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                   Kivuli Plaza, Kivuli Road, Nairobi
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-cyan-600/20 text-cyan-400">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-1">Email</h3>
                  <p className="text-slate-400 text-sm">
                    <a
                      href="mailto:leevyotieno@gmail.com"
                      className="text-cyan-400 hover:underline font-medium"
                    >
                      auragrowth@gmail.com
                    </a>
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Image Column */}
          <div className="lg:col-span-6 h-full min-h-[350px] relative overflow-hidden bg-slate-950">
            <img
              src="https://res.cloudinary.com/dkmnh0kwl/image/upload/v1706959718/search_engine_advertising-1_kupncz.jpg"
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              alt="Contact Landing"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent lg:bg-gradient-to-r lg:from-slate-900 lg:to-transparent" />
          </div>

        </div>

        {/* Form Section */}
        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl mx-auto space-y-6 relative z-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">GET IN TOUCH</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mt-3" />
            </div>

            {status.submitted && (
              <div className="p-4 rounded-xl bg-blue-500/20 border border-blue-500/40 text-blue-300 text-sm font-medium">
                Thank you! Your message has been successfully sent. We'll get back to you soon.
              </div>
            )}

            {status.error && (
              <div className="p-4 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 text-sm font-medium">
                Oops! Something went wrong. Please try again later.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-700/80 text-white focus:outline-none focus:border-blue-500 transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="john@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-700/80 text-white focus:outline-none focus:border-blue-500 transition-colors text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">Message</label>
                <textarea
                  rows="6"
                  required
                  placeholder="How can we help your business grow?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-700/80 text-white focus:outline-none focus:border-blue-500 transition-colors text-sm resize-none"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-sm tracking-wider shadow-lg shadow-blue-600/30 hover:shadow-cyan-500/40 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
                >
                  <span>SUBMIT MESSAGE</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactUsForm;