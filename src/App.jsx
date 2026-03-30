import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import CartDrawer from './Components/CartDrawer';
import SearchModal from './Components/SearchModal';
import { FaWhatsapp, FaSearch, FaArrowUp, FaUserShield } from 'react-icons/fa';
import { CartProvider } from './context/CartContext';
import { MenuProvider } from './context/MenuContext';
import MenuDrawer from './Components/MenuDrawer';
import { motion, AnimatePresence } from 'framer-motion';
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Ballroom from './Pages/Ballroom';
import AdminLayout from './Pages/admin/AdminLayout';
import AdminOverview from './Pages/admin/AdminOverview';
import AdminOrders from './Pages/admin/AdminOrders';
import AdminMenu from './Pages/admin/AdminMenu';
import AdminReservations from './Pages/admin/AdminReservations';
import AdminSettings from './Pages/admin/AdminSettings';
import AdminLogin from './Pages/admin/AdminLogin';
import NotFound from './Pages/NotFound';
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

          {/* Floating Admin Panel Button */}
          <motion.button
            onClick={() => window.location.href = '/admin/login'}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4, type: 'spring', stiffness: 200 }}
            title="Admin Panel"
            className="fixed bottom-24 left-6 z-50 group flex items-center gap-2 bg-black/70 hover:bg-brand-red border border-white/20 hover:border-red-500/50 px-3 py-2.5 rounded-full text-white shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all transform hover:scale-105 cursor-pointer"
          >
            <FaUserShield className="text-lg flex-shrink-0" />
            <span className="text-xs font-semibold max-w-0 overflow-hidden group-hover:max-w-[80px] transition-all duration-300 whitespace-nowrap opacity-0 group-hover:opacity-100">
              Admin
            </span>
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
