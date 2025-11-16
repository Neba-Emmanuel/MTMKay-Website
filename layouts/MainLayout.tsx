
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';
import ScrollToTop from '../components/shared/ScrollToTop';
import { AnimatePresence, motion } from 'framer-motion';
import useScrollToTop from '../hooks/useScrollToTop';


const PageTransition: React.FC<{children: React.ReactNode, routeKey: string}> = ({ children, routeKey }) => {
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={routeKey}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}


const MainLayout: React.FC = () => {
  const location = useLocation();
  useScrollToTop();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20">
        <PageTransition routeKey={location.pathname}>
            <Outlet />
        </PageTransition>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default MainLayout;
