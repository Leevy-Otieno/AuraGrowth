import React from "react";
import { Routes, Route } from "react-router-dom";

// Import your pages/components
import LandingPage from "../components/LandingPage/LandingPage"; // Or your Home page component
import ServicesPage from "../components/Services/Services"; // Or wherever your 12-service page is located
import ServiceDetailsPage from "../components/Services/ServiceDetailsPage";
import AdminBlog from "../components/Blog/AdminBlog"; // Adjust path if needed

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/services/:id" element={<ServiceDetailsPage />} />
      <Route path="/admin" element={<AdminBlog />} />
    </Routes>
  );
};

export default AppRoutes;