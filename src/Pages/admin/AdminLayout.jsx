import React, { useEffect } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBell, FaChartPie, FaCog, FaReceipt, FaUsers, FaUtensils, FaSignOutAlt } from 'react-icons/fa';

const pulseGlow = 'shadow-[0_0_25px_rgba(248,113,113,0.35)]';

const SECTIONS = [
  { to: '/admin', label: 'Overview', icon: FaChartPie, end: true },
  { to: '/admin/orders', label: 'Orders', icon: FaReceipt },
  { to: '/admin/menu', label: 'Menu & Pricing', icon: FaUtensils },
  { to: '/admin/reservations', label: 'Reservations', icon: FaUsers },
  { to: '/admin/settings', label: 'Settings', icon: FaCog },
];

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token !== 'admin_authenticated') {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen pt-4 md:pt-6 bg-gradient-to-br from-black via-brand-red/80 to-black text-white font-sans relative overflow-hidden">
      {/* Background accents */}
      <div className="pointer-events-none fixed inset-0 opacity-40 mix-blend-screen">
        <div className="absolute -top-40 -right-32 w-72 h-72 rounded-full bg-red-500/40 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-amber-400/30 blur-3xl" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-10">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 md:mb-8"
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Admin Panel
            </h1>
            <p className="mt-1 text-sm md:text-base text-gray-200/80 max-w-xl">
              Manage Alvigha&apos;s menu, orders, reservations, and performance — with a consistent,
              modern theme.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              className={`relative px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-xs md:text-sm font-semibold tracking-wide uppercase cursor-pointer transition-colors ${pulseGlow}`}
            >
              Live Service
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
              </span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 hover:bg-black/60 border border-white/15 text-xs md:text-sm font-medium cursor-pointer transition-colors">
              <FaBell className="text-amber-300" />
              Alerts
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 hover:bg-red-900/60 border border-white/15 text-xs md:text-sm font-medium cursor-pointer transition-colors text-red-400 hover:text-red-300"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-[260px,1fr] gap-4 md:gap-6">
          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="bg-black/40 border border-white/10 rounded-2xl p-3 md:p-4 backdrop-blur-md"
          >
            <nav className="space-y-1 text-sm">
              {SECTIONS.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      `w-full flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer transition-all border ${
                        isActive
                          ? `bg-brand-red/80 hover:bg-brand-red ${pulseGlow} border-red-300/60`
                          : 'bg-white/5 hover:bg-white/10 border-white/5'
                      }`
                    }
                  >
                    <span className="text-sm">
                      <Icon />
                    </span>
                    <span className="font-medium text-xs md:text-sm">{item.label}</span>
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-transparent" />
                  </NavLink>
                );
              })}
            </nav>

            <div className="mt-4 md:mt-6 p-3 md:p-4 rounded-2xl bg-gradient-to-br from-white/5 via-black/60 to-black/80 border border-white/10 text-xs text-gray-100/90">
              <p className="font-semibold mb-1 text-[11px] uppercase tracking-[0.18em] text-gray-300">
                Tonight&apos;s Snapshot
              </p>
              <p className="text-sm">
                Peak hours expected between <span className="font-semibold">9:00PM</span> and{' '}
                <span className="font-semibold">12:30AM</span>. Keep an eye on delivery queue.
              </p>
            </div>
          </motion.aside>

          {/* Content */}
          <div className="min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

