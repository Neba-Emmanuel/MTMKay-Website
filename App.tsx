import React, { useState, useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";

// Public Pages
import Home from "./pages/public/Home";
import About from "./pages/public/About";
import Services from "./pages/public/Services";
import Trainings from "./pages/public/Trainings";
import TrainingDetail from "./pages/public/TrainingDetail";
import CourseRegistration from "./pages/public/CourseRegistration";
import Blog from "./pages/public/Blog";
import BlogPostDetail from "./pages/public/BlogPostDetail";
import Contact from "./pages/public/Contact";
import NotFound from "./pages/public/NotFound";

// Admin Pages
import AdminLogin from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import ManageTrainings from "./pages/admin/ManageTrainings";
import ManageBlog from "./pages/admin/ManageBlog";
import ManageRegistrations from "./pages/admin/ManageRegistrations";
import ViewPayments from "./pages/admin/ViewPayments";
import Preloader from "./components/shared/Preloader";

// A mock auth context
export const AuthContext = React.createContext({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  if (loading) {
    return <Preloader />;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      <HashRouter>
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
            <Route path="blog/:id" element={<BlogPostDetail />} />
            <Route path="contact" element={<Contact />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          {isAuthenticated ? (
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="trainings" element={<ManageTrainings />} />
              <Route path="blog" element={<ManageBlog />} />
              <Route path="registrations" element={<ManageRegistrations />} />
              <Route path="payments" element={<ViewPayments />} />
            </Route>
          ) : (
            <Route path="/admin/*" element={<AdminLogin />} />
          )}

          {/* Not Found Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </AuthContext.Provider>
  );
};

export default App;
