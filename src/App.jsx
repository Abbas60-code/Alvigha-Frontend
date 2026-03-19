import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import CartDrawer from './Components/CartDrawer';
import SearchModal from './Components/SearchModal';
import { FaWhatsapp, FaSearch, FaArrowUp } from 'react-icons/fa';
import { CartProvider } from './context/CartContext';
import { MenuProvider } from './context/MenuContext';
import MenuDrawer from './Components/MenuDrawer';
import { motion, AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Ballroom from './pages/Ballroom';
import AdminLayout from './pages/admin/AdminLayout';
import AdminOverview from './pages/admin/AdminOverview';
import AdminOrders from './pages/admin/AdminOrders';
import AdminMenu from './pages/admin/AdminMenu';
import AdminReservations from './pages/admin/AdminReservations';
import AdminSettings from './pages/admin/AdminSettings';
import AdminLogin from './pages/admin/AdminLogin';
import NotFound from './pages/NotFound';
import ScrollToTop from './Components/ScrollToTop';

function AppShell() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-brand-red font-sans relative">
      {!isAdmin && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/ballroom" element={<Ballroom />} />

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminOverview />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="menu" element={<AdminMenu />} />
          <Route path="reservations" element={<AdminReservations />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      {!isAdmin && <Footer />}

      {!isAdmin && (
        <>
          <MenuDrawer />
          <CartDrawer />
          <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

          {/* Floating Left Search Button */}
          <motion.button
            onClick={() => setIsSearchOpen(true)}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, type: 'spring', stiffness: 200 }}
            className="fixed bottom-6 left-6 z-50 bg-black/60 hover:bg-black p-3 rounded-full text-white border border-white/20 shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all transform hover:scale-110 cursor-pointer"
          >
            <FaSearch className="text-xl" />
          </motion.button>

          {/* Floating Right WhatsApp Button */}
          <motion.a
            href="https://wa.me/923182141472"
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, type: 'spring', stiffness: 200 }}
            className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 p-3 rounded-full text-white shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all transform hover:scale-110 flex items-center justify-center cursor-pointer"
          >
            <FaWhatsapp className="text-[28px]" />
          </motion.a>

          {/* Floating Scroll to Top Button */}
          <AnimatePresence mode="wait">
            {showScrollTop && (
              <motion.button
                key="scroll-top"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                onClick={scrollToTop}
                className="fixed bottom-24 right-6 z-50 bg-brand-red hover:bg-red-700 p-3 rounded-full text-white shadow-[0_0_15px_rgba(220,38,38,0.5)] transition-colors cursor-pointer flex items-center justify-center"
              >
                <FaArrowUp className="text-xl" />
              </motion.button>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <MenuProvider>
        <CartProvider>
          <AppShell />
        </CartProvider>
      </MenuProvider>
    </Router>
  );
}
