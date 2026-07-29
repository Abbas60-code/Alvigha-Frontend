import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiRefreshLine, RiSearchLine, RiCloseLine, RiShoppingBag2Line } from 'react-icons/ri';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:9000';

const STATUS = ['All', 'pending', 'confirmed', 'preparing', 'delivered', 'cancelled'];

const PILL = {
  pending:   'bg-amber-500/20 text-amber-300 border-amber-500/40',
  confirmed: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
  preparing: 'bg-violet-500/20 text-violet-300 border-violet-500/40',
  delivered: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
  cancelled: 'bg-red-500/20 text-red-300 border-red-500/40',
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [detail, setDetail] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const r = await fetch(`${API_URL}/api/orders`);
      const d = await r.json();
      setOrders(Array.isArray(d) ? d : []);
    } catch {} finally { setLoading(false); }
  };

  const updateStatus = async (id, status) => {
    try {
      const r = await fetch(`${API_URL}/api/orders/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (r.ok) {
        load();
        if (detail && detail._id === id) {
          setDetail({ ...detail, status });
        }
      }
    } catch (e) {
      console.error('Error updating order status', e);
    }
  };


  useEffect(() => { load(); }, []);

  const visible = orders.filter(o => {
    const fs = filter === 'All' || o.status === filter;
    const ss = !search || (o.customerName || '').toLowerCase().includes(search.toLowerCase());
    return fs && ss;
  });

  return (
    <div className="flex gap-5 h-full">

      {/* Left panel */}
      <div className={`flex flex-col gap-4 transition-all ${detail ? 'w-[55%]' : 'w-full'}`}>

        {/* Toolbar */}
        <div className="bg-brand-dark/60 border border-brand-accent/20 rounded-2xl p-4 flex flex-wrap gap-3 items-center justify-between shadow-lg">
          <div className="flex flex-wrap gap-1.5">
            {STATUS.map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-3 py-1 rounded-lg text-[11px] capitalize font-semibold border transition-all cursor-pointer
                  ${filter === s
                    ? s === 'All' ? 'bg-brand-red/60 border-brand-accent/50 text-brand-accent'
                      : `${PILL[s]} border`
                    : 'bg-black/20 border-white/10 text-white/60 hover:bg-black/40 hover:text-white'
                  }`}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-black/20 border border-white/10 rounded-xl px-3 py-1.5 focus-within:border-brand-accent/50 transition-colors">
              <RiSearchLine className="text-white/40 text-sm" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search customer…"
                className="bg-transparent text-xs text-white placeholder:text-white/40 focus:outline-none w-32"
              />
            </div>
            <button onClick={load} className="p-1.5 rounded-xl bg-black/20 border border-white/10 text-white/50 hover:text-brand-accent hover:border-brand-accent/30 transition-colors cursor-pointer">
              <RiRefreshLine className="text-base" />
            </button>
          </div>
        </div>

        {/* List */}
        <div className={`bg-brand-dark/60 border border-brand-accent/20 rounded-2xl flex flex-col overflow-hidden shadow-lg ${detail ? 'hidden lg:flex' : 'w-full'}`}>
          {loading ? (
            <div className="py-20 text-center text-white/50 text-sm">Loading orders…</div>
          ) : visible.length === 0 ? (
            <div className="py-20 flex flex-col items-center gap-2 text-white/40">
              <RiShoppingBag2Line className="text-4xl opacity-30" />
              <p className="text-sm">No orders found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs min-w-[520px]">
                <thead>
                  <tr className="border-b border-brand-accent/20 text-[10px] text-brand-accent uppercase tracking-wider bg-black/20">
                    {['Customer', 'Type / Area', 'Items', 'Amount', 'Status', 'Date'].map(h => (
                      <th key={h} className="text-left px-5 py-3 font-semibold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {visible.map((o, i) => (
                    <tr
                      key={o._id}
                      onClick={() => setDetail(o)}
                      className={`border-b border-white/5 cursor-pointer transition-colors
                        ${detail?._id === o._id
                          ? 'bg-brand-red/30'
                          : 'hover:bg-white/10 bg-black/10'
                        }`}
                    >
                      <td className="px-5 py-3 font-semibold text-white">{o.customerName || 'Guest'}</td>
                      <td className="px-5 py-3">
                        <span className={`px-2 py-0.5 rounded-md border text-[10px] font-bold uppercase mr-1.5 ${o.orderType === 'delivery' ? 'bg-sky-500/20 text-sky-300 border-sky-500/30' : 'bg-violet-500/20 text-violet-300 border-violet-500/30'}`}>
                          {o.orderType}
                        </span>
                        <span className="text-white/50">{o.area || '—'}</span>
                      </td>
                      <td className="px-5 py-3 text-white/70 max-w-[140px] truncate">
                        {o.items?.length} item{o.items?.length !== 1 ? 's' : ''}
                      </td>
                      <td className="px-5 py-3 text-brand-accent font-bold">Rs {o.totalAmount?.toLocaleString()}</td>
                      <td className="px-5 py-3">
                        <span className={`px-2 py-0.5 rounded-md border text-[10px] font-bold uppercase ${PILL[o.status] || PILL.pending}`}>
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
        </div>

        <p className="text-[11px] text-white/50 px-2">{visible.length} order{visible.length !== 1 ? 's' : ''} shown</p>
      </div>

      {/* Right detail panel */}
      <AnimatePresence>
        {detail && (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="w-full lg:w-2/3 bg-brand-dark border border-brand-accent/20 rounded-2xl flex flex-col shadow-2xl overflow-hidden relative"
          >
            <button
              onClick={() => setDetail(null)}
              className="lg:hidden absolute top-4 right-4 text-white/50 hover:text-white p-2 bg-black/40 rounded-full z-10"
            >
              Back
            </button>

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-brand-accent/20 bg-brand-red/40">
              <div>
                <p className="font-serif font-bold text-lg text-brand-accent">Order Detail</p>
                <p className="text-xs text-white/70 tracking-wide mt-0.5">{detail.customerName}</p>
              </div>
              <button onClick={() => setDetail(null)} className="p-2 rounded-xl bg-black/20 text-white/60 hover:text-white hover:bg-black/40 cursor-pointer transition-colors border border-white/5 hover:border-brand-accent/30">
                <RiCloseLine className="text-lg" />
              </button>
            </div>

            {/* Meta */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 sm:p-6 border-b border-brand-accent/10 bg-black/10">
              {[
                { l: 'Customer', v: detail.customerName },
                { l: 'Type', v: detail.orderType },
                { l: 'Area / Branch', v: detail.area || '—' },
                { l: 'Date', v: new Date(detail.createdAt).toLocaleString() },
              ].map(({ l, v }) => (
                <div key={l} className="bg-black/20 rounded-xl px-4 py-3 border border-white/5">
                  <p className="text-[10px] text-brand-accent/70 uppercase tracking-wider mb-1 font-semibold">{l}</p>
                  <p className="text-xs font-bold text-white capitalize">{v}</p>
                </div>
              ))}
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 bg-black/5">
              <p className="text-[11px] text-brand-accent uppercase tracking-wider mb-4 font-bold border-b border-brand-accent/10 pb-2">Items Ordered</p>
              <div className="space-y-3">
                {detail.items?.map((item, i) => (
                  <div key={i} className="flex items-center justify-between bg-black/20 rounded-xl px-4 py-3 border border-white/5 hover:border-brand-accent/20 transition-colors">
                    <div>
                      <p className="text-xs font-bold text-white">{item.title}</p>
                      <p className="text-[11px] text-white/50 mt-0.5">Qty: {item.qty}</p>
                    </div>
                    <p className="text-sm font-bold text-brand-accent">Rs {(item.price * item.qty).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="px-6 py-5 border-t border-brand-accent/20 flex items-center justify-between bg-brand-red/20">
              <p className="text-sm text-white/70 font-bold uppercase tracking-wider">Grand Total</p>
              <p className="text-xl font-serif font-bold text-brand-accent">Rs {detail.totalAmount?.toLocaleString()}</p>
            </div>

            {/* Actions */}
            <div className="p-4 bg-black/40 border-t border-white/5">
              <p className="text-[10px] text-brand-accent/70 uppercase tracking-wider mb-2 font-semibold px-2">Update Status</p>
              <div className="flex flex-wrap gap-2 px-2 pb-2">
                {['pending', 'confirmed', 'preparing', 'delivered', 'cancelled'].map(s => (
                  <button
                    key={s}
                    onClick={() => updateStatus(detail._id, s)}
                    disabled={detail.status === s}
                    className={`px-3 py-1.5 rounded-lg text-xs capitalize font-bold border transition-colors ${
                      detail.status === s 
                        ? `${PILL[s]} opacity-50 cursor-not-allowed` 
                        : 'bg-black/20 border-white/10 text-white/60 hover:text-white hover:bg-white/10 cursor-pointer'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
