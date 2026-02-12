import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./src/layouts/MainLayout";
import AdminLayout from "./src/layouts/AdminLayout";
import ProtectedRoute from "./src/components/context/protectedRoute";

// Public Pages
import Home from "./src/pages/Home";
import About from "./src/pages/About";
import Services from "./src/pages/Services";
import Trainings from "./src/pages/Trainings";
import TrainingDetail from "./src/pages/TrainingDetail";
import CourseRegistration from "./src/pages/CourseRegistration";
import Blog from "./src/pages/Blog";
import BlogPostDetail from "./src/pages/BlogPostDetail";
import Contact from "./src/pages/Contact";
import WorkCafe from "./src/pages/WorkCafe";
import NotFound from "./src/pages/NotFound";
import PaymentSuccess from "./src/pages/PaymentSuccess";

// Admin Pages
import AdminLogin from "./src/pages/admin/Login";
import Dashboard from "./src/pages/admin/Dashboard";
import ManageTrainings from "./src/pages/admin/ManageTrainings";
import ManageBlog from "./src/pages/admin/ManageBlog";
import ManageRegistrations from "./src/pages/admin/ManageRegistrations";
import ViewPayments from "./src/pages/admin/ViewPayments";
import Preloader from "./src/components/shared/Preloader";
import { AuthContext } from "./src/components/context/authContext";

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem("token");
  });

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  if (loading) {
    return <Preloader />;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="trainings" element={<Trainings />} />
            <Route path="trainings/:id" element={<TrainingDetail />} />
            <Route path="register" element={<CourseRegistration />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:slug" element={<BlogPostDetail />} />
            <Route path="contact" element={<Contact />} />
            <Route path="work-cafe" element={<WorkCafe />} />
          </Route>

          {/* Admin Login */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="trainings" element={<ManageTrainings />} />
              <Route path="blog" element={<ManageBlog />} />
              <Route path="registrations" element={<ManageRegistrations />} />
              <Route path="payments" element={<ViewPayments />} />
            </Route>
          </Route>
          {/* Payment Success Route */}
          <Route path="payment-success" element={<PaymentSuccess />} />

          {/* Not Found Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
