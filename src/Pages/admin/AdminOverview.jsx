import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  RiShoppingBag2Line, RiTimeLine, RiMoneyDollarCircleLine,
  RiMailLine, RiArrowUpLine, RiArrowDownLine, RiRefreshLine
} from 'react-icons/ri';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:9000';

function StatCard({ icon: Icon, label, value, sub, accent, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="bg-brand-dark/60 border border-brand-accent/20 rounded-2xl p-5 flex items-start gap-4 hover:border-brand-accent/40 transition-colors shadow-lg"
    >
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${accent}`}>
        <Icon className="text-xl" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-white/60 uppercase tracking-widest">{label}</p>
        <p className="text-2xl font-bold mt-1 text-brand-accent">{value}</p>
        <p className="text-[11px] text-white/50 mt-0.5">{sub}</p>
      </div>
    </motion.div>
  );
}

const STATUS_PILL = {
  pending:   'bg-amber-500/20 text-amber-300 border-amber-500/40',
  confirmed: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
  preparing: 'bg-violet-500/20 text-violet-300 border-violet-500/40',
  delivered: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
  cancelled: 'bg-red-500/20 text-red-300 border-red-500/40',
};

export default function AdminOverview() {
  const [orders, setOrders] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const [or, cr] = await Promise.all([
        fetch(`${API_URL}/api/orders`),
        fetch(`${API_URL}/api/contact`),
      ]);
      const ordersData = await or.json();
      setOrders(Array.isArray(ordersData) ? ordersData : []);
      const cd = cr.ok ? await cr.json() : [];
      setContacts(Array.isArray(cd) ? cd : []);
    } catch { } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const total = orders.reduce((s, o) => s + (o.totalAmount || 0), 0);
  const pending = orders.filter(o => o.status === 'pending').length;
  const today = orders.filter(o => new Date(o.createdAt).toDateString() === new Date().toDateString()).length;

  const stats = [
    { icon: RiShoppingBag2Line, label: 'Total Orders',    value: orders.length,                sub: `${today} placed today`,          accent: 'bg-brand-red/50 text-brand-accent border-brand-accent/30', delay: 0 },
    { icon: RiTimeLine,         label: 'Pending',          value: pending,                      sub: 'Awaiting processing',            accent: 'bg-amber-500/20 text-amber-300 border-amber-500/30', delay: 0.06 },
    { icon: RiMoneyDollarCircleLine, label: 'Revenue',    value: `Rs ${total.toLocaleString()}`, sub: 'All-time earnings',             accent: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30', delay: 0.12 },
    { icon: RiMailLine,         label: 'Messages',         value: contacts.length,              sub: 'Contact form submissions',       accent: 'bg-violet-500/20 text-violet-300 border-violet-500/30', delay: 0.18 },
  ];

  return (
    <div className="space-y-6">

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s, i) => <StatCard key={i} {...s} />)}
      </div>

      {/* Two-column row */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-5">

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24 }}
          className="bg-brand-dark/60 border border-brand-accent/20 rounded-2xl overflow-hidden shadow-lg"
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-brand-accent/20 bg-black/20">
            <div>
              <p className="font-serif font-semibold text-lg text-brand-accent">Recent Orders</p>
              <p className="text-[11px] text-white/50 mt-0.5 tracking-wide">Latest from the website</p>
            </div>
            <button onClick={load} className="text-white/50 hover:text-brand-accent transition-colors cursor-pointer bg-white/5 p-2 rounded-lg border border-white/10 hover:border-brand-accent/30">
              <RiRefreshLine className="text-lg" />
            </button>
          </div>

          {loading ? (
            <div className="py-16 text-center text-white/40 text-sm">Loading…</div>
          ) : orders.length === 0 ? (
            <div className="py-16 text-center text-white/40 text-sm">No orders yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs min-w-[600px]">
                <thead>
                  <tr className="border-b border-brand-accent/20 text-[11px] text-brand-accent uppercase tracking-wider bg-black/10">
                    {['Customer', 'Type', 'Items', 'Total', 'Status', 'Date'].map(h => (
                      <th key={h} className="text-left px-5 py-3 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 6).map((o, i) => (
                    <tr key={o._id} className={`border-b border-white/5 hover:bg-white/10 transition-colors ${i % 2 === 0 ? '' : 'bg-black/10'}`}>
                      <td className="px-5 py-3 font-semibold text-white">{o.customerName || 'Guest'}</td>
                      <td className="px-5 py-3">
                        <span className={`px-2 py-0.5 rounded-md border text-[10px] font-bold uppercase ${o.orderType === 'delivery' ? 'bg-sky-500/20 text-sky-300 border-sky-500/30' : 'bg-violet-500/20 text-violet-300 border-violet-500/30'}`}>
                          {o.orderType}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-white/70 max-w-[160px] truncate">
                        {o.items?.map(i => `${i.title}`).join(', ')}
                      </td>
                      <td className="px-5 py-3 text-brand-accent font-bold">Rs {o.totalAmount?.toLocaleString()}</td>
                      <td className="px-5 py-3">
                        <span className={`px-2 py-0.5 rounded-md border text-[10px] font-bold uppercase ${STATUS_PILL[o.status] || STATUS_PILL.pending}`}>
                          {o.status}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-white/50">{new Date(o.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* Recent Messages */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-brand-dark/60 border border-brand-accent/20 rounded-2xl overflow-hidden flex flex-col shadow-lg"
        >
          <div className="px-5 py-4 border-b border-brand-accent/20 bg-black/20">
            <p className="font-serif font-semibold text-lg text-brand-accent">Recent Messages</p>
            <p className="text-[11px] text-white/50 mt-0.5 tracking-wide">Contact form inbox</p>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-white/5 bg-black/10">
            {loading ? (
              <p className="text-center text-white/40 text-sm py-10">Loading…</p>
            ) : contacts.length === 0 ? (
              <p className="text-center text-white/40 text-sm py-10">No messages.</p>
            ) : contacts.slice(0, 6).map((c, i) => (
              <div key={i} className="flex items-start gap-3 px-5 py-4 hover:bg-white/10 transition-colors">
                <div className="w-9 h-9 rounded-full border border-brand-accent/40 bg-brand-red flex items-center justify-center text-brand-accent text-sm font-bold shrink-0">
                  {(c.name || 'G')[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-white truncate">{c.name}</p>
                    <span className="text-[10px] text-white/40 shrink-0">{new Date(c.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-[11px] text-white/60 mt-0.5 truncate">{c.message}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
