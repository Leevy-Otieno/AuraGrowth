import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import LandingPage from './components/LandingPage/LandingPage';
import BlogPage from './components/Blog/Blog';
import BlogPostDetail from './components/Blog/BlogPost';
import AdminBlog from './components/Blog/AdminBlog';
import Services from './components/Services/Services';
import ServiceDetailsPage from './components/Services/ServiceDetail';
import AboutUsPage from './components/AboutUsPage/AboutUsPage';
import ContactForm from './components/ContactForm/ContactForm';

const App = () => {
  return (
    <Router>
      <div className="bg-slate-950 min-h-screen text-slate-100 flex flex-col justify-between">
        <NavigationBar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogPostDetail />} />
            <Route path="/adminblog" element={<AdminBlog />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={<ServiceDetailsPage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/contactus" element={<ContactForm />} />
            <Route path="/admin" element={<AdminBlog />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;