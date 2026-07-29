import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  RiDashboardLine, RiShoppingBag2Line, RiMailLine, RiMenuLine,
  RiCalendarLine, RiSettings3Line, RiLogoutBoxLine, RiRestaurantLine,
  RiMenuFoldLine, RiMenuUnfoldLine, RiBellLine, RiUser3Line
} from 'react-icons/ri';

const NAV = [
  { to: '/admin',               label: 'Dashboard',    icon: RiDashboardLine,   end: true },
  { to: '/admin/orders',        label: 'Orders',       icon: RiShoppingBag2Line },
  { to: '/admin/inbox',         label: 'Inbox',        icon: RiMailLine },
  { to: '/admin/menu',          label: 'Menu',         icon: RiRestaurantLine },
  { to: '/admin/reservations',  label: 'Reservations', icon: RiCalendarLine },
  { to: '/admin/settings',      label: 'Settings',     icon: RiSettings3Line },
];

export default function AdminLayout() {
  const navigate   = useNavigate();
  const location   = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(false);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!localStorage.getItem('adminToken')) navigate('/admin/login');
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const pageTitle = NAV.find(n => n.end
    ? location.pathname === n.to
    : location.pathname.startsWith(n.to))?.label || 'Admin';

  return (
    <div className="flex h-screen bg-brand-dark text-white font-sans overflow-hidden">
      
      {/* Background pattern similar to website */}
      <div className="fixed inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.25) 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* ─── SIDEBAR ─────────────────────────────────── */}
      <motion.aside
        animate={{ 
          width: collapsed ? 68 : 240,
          x: window.innerWidth < 768 ? (mobileOpen ? 0 : -240) : 0
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed md:relative h-full flex flex-col bg-brand-red border-r border-brand-accent/20 shrink-0 overflow-hidden z-40"
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-brand-accent/20">
          <div className="w-9 h-9 rounded-xl border border-brand-accent/50 bg-brand-dark flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(229,205,172,0.3)]">
            <RiRestaurantLine className="text-brand-accent text-lg" />
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <p className="font-serif font-bold text-lg leading-none tracking-wide text-brand-accent">Alvigha</p>
              <p className="text-[10px] text-white/70 mt-0.5 tracking-widest uppercase">Admin Panel</p>
            </div>
          )}
        </div>

        {/* Nav Links */}
        <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer group relative
                ${isActive
                  ? 'bg-brand-dark/60 text-brand-accent border border-brand-accent/20'
                  : 'text-white/70 hover:bg-black/20 hover:text-white border border-transparent'
                }`
              }
              onClick={() => { if(window.innerWidth < 768) setMobileOpen(false); }}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-brand-accent rounded-r-full" />
                  )}
                  <Icon className={`text-[18px] shrink-0 ${isActive ? 'text-brand-accent' : ''}`} />
                  {!collapsed && <span className="text-sm font-medium">{label}</span>}
                  {collapsed && (
                    <div className="absolute left-full ml-3 px-2.5 py-1 bg-brand-dark border border-brand-accent/30 rounded-lg text-xs text-brand-accent opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity z-50 shadow-xl">
                      {label}
                    </div>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom: collapse + logout */}
        <div className="px-2 pb-4 border-t border-brand-accent/20 pt-3 space-y-1">
          <button
            onClick={() => setCollapsed(p => !p)}
            className="hidden md:flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-white/70 hover:bg-black/20 hover:text-white transition-colors cursor-pointer"
          >
            {collapsed ? <RiMenuUnfoldLine className="text-[18px] shrink-0" /> : <RiMenuFoldLine className="text-[18px] shrink-0" />}
            {!collapsed && <span className="text-sm font-medium">Collapse</span>}
          </button>
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-red-300 hover:bg-red-500/20 hover:text-red-200 transition-colors cursor-pointer"
          >
            <RiLogoutBoxLine className="text-[18px] shrink-0" />
            {!collapsed && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* ─── MAIN AREA ───────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">

        {/* Top Bar */}
        <header className="h-14 bg-brand-red border-b border-brand-accent/20 flex items-center justify-between px-4 md:px-6 shrink-0 shadow-md">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMobileOpen(true)}
              className="md:hidden text-brand-accent hover:text-white transition-colors cursor-pointer p-1"
            >
              <RiMenuLine className="text-2xl" />
            </button>
            <h1 className="text-lg font-serif font-bold tracking-wide text-brand-accent truncate max-w-[120px] sm:max-w-none">{pageTitle}</h1>
            <span className="hidden sm:block text-xs text-white/50 mt-1">/ Alvigha Restaurant</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-[11px] bg-brand-dark/60 text-brand-accent border border-brand-accent/40 px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-pulse" />
              Live
            </div>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 text-white/80 hover:text-brand-accent transition-colors cursor-pointer border border-transparent hover:border-brand-accent/30">
              <RiBellLine className="text-lg" />
            </button>
            <div className="w-8 h-8 rounded-full border border-brand-accent/50 bg-brand-dark flex items-center justify-center">
              <RiUser3Line className="text-sm text-brand-accent" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-5 md:p-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
