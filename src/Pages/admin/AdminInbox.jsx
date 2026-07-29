import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaTrash } from 'react-icons/fa';
import { PiArrowsClockwiseBold } from 'react-icons/pi';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:9000';

export default function AdminInbox() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/contact`);
      const data = await res.json();
      setMessages(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        const res = await fetch(`${API_URL}/api/contact/${id}`, { method: 'DELETE' });
        if (res.ok) {
          fetchMessages();
          if (selected?._id === id) setSelected(null);
        }
      } catch (e) {
        console.error('Error deleting message', e);
      }
    }
  };

  useEffect(() => { fetchMessages(); }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5 h-full flex flex-col"
    >
      <div className="bg-brand-dark/60 border border-brand-accent/20 rounded-2xl p-5 shadow-lg shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-serif font-bold flex items-center gap-2 text-brand-accent">
              <FaEnvelope /> Inbox
            </h2>
            <p className="text-xs text-white/50 mt-1 tracking-wide">Messages submitted via the Contact Us form.</p>
          </div>
          <button onClick={fetchMessages} className="flex items-center gap-1.5 text-xs text-white/50 hover:text-brand-accent bg-black/20 border border-white/10 hover:border-brand-accent/30 px-4 py-2 rounded-xl cursor-pointer transition-colors font-bold">
            <PiArrowsClockwiseBold className="text-base" /> Refresh
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr,1.5fr] gap-5 flex-1 min-h-0">
        {/* Messages List */}
        <div className="bg-brand-dark/60 border border-brand-accent/20 rounded-2xl p-4 space-y-2 overflow-y-auto shadow-lg">
          {loading ? (
            <p className="text-center text-white/40 py-10 text-sm">Loading messages...</p>
          ) : messages.length === 0 ? (
            <p className="text-center text-white/40 py-10 text-sm">No messages yet.</p>
          ) : (
            messages.map((m, i) => (
              <button
                key={i}
                onClick={() => setSelected(m)}
                className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                  selected?._id === m._id
                    ? 'bg-brand-red/40 border-brand-accent/40 shadow-[0_0_15px_rgba(229,205,172,0.1)]'
                    : 'bg-black/20 border-white/5 hover:bg-black/40 hover:border-brand-accent/20'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <p className={`text-sm font-bold ${selected?._id === m._id ? 'text-brand-accent' : 'text-white'}`}>{m.name}</p>
                  <span className="text-[10px] text-white/40 font-medium">{new Date(m.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-xs text-white/60 truncate">{m.email}</p>
                <p className="text-[11px] text-white/40 mt-1.5 truncate">{m.message}</p>
              </button>
            ))
          )}
        </div>

        {/* Detail View */}
        <div className="bg-brand-dark/60 border border-brand-accent/20 rounded-2xl p-6 shadow-lg overflow-y-auto">
          {!selected ? (
            <div className="h-full flex flex-col items-center justify-center text-white/20">
              <FaEnvelope className="text-5xl mb-4" />
              <p className="text-sm font-medium tracking-wide">Select a message to read</p>
            </div>
          ) : (
            <motion.div
              key={selected._id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="flex items-start justify-between border-b border-white/10 pb-5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full border-2 border-brand-accent/40 bg-brand-red flex items-center justify-center text-xl font-bold text-brand-accent shadow-[0_0_15px_rgba(229,205,172,0.2)]">
                    {(selected.name || 'G')[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="font-serif font-bold text-xl text-brand-accent">{selected.name}</p>
                    <p className="text-xs text-white/50 tracking-wide mt-0.5">{new Date(selected.createdAt).toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-xl bg-black/20 border border-white/5">
                <div className="flex-1 flex flex-col gap-1 text-sm">
                  <p className="text-[10px] uppercase tracking-wider text-white/40 font-bold mb-0.5">Email Address</p>
                  <div className="flex items-center gap-2 text-white/90">
                    <FaEnvelope className="text-brand-accent shrink-0" />
                    <a href={`mailto:${selected.email}`} className="hover:text-brand-accent transition-colors">{selected.email}</a>
                  </div>
                </div>
                {selected.phone && (
                  <div className="flex-1 flex flex-col gap-1 text-sm border-l border-white/10 pl-4">
                    <p className="text-[10px] uppercase tracking-wider text-white/40 font-bold mb-0.5">Phone Number</p>
                    <div className="flex items-center gap-2 text-white/90">
                      <FaPhone className="text-brand-accent shrink-0" />
                      <span>{selected.phone}</span>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/40 font-bold mb-3 px-1">Message Content</p>
                <div className="bg-black/30 border border-white/10 rounded-xl p-5 text-sm text-white/80 leading-relaxed min-h-[150px] whitespace-pre-wrap">
                  {selected.message}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <a
                  href={`mailto:${selected.email}?subject=Re: Your message to Alvigha`}
                  className="flex-1 text-center py-3 bg-brand-accent text-[#13131a] font-bold text-sm rounded-xl hover:brightness-110 transition-all shadow-[0_0_15px_rgba(229,205,172,0.3)]"
                >
                  Reply via Email
                </a>
                <button
                  onClick={() => handleDelete(selected._id)}
                  className="px-6 py-3 bg-black/40 border border-white/10 text-red-400 text-sm font-bold rounded-xl hover:bg-black/60 hover:text-red-300 transition-colors"
                >
                  <FaTrash className="inline-block mr-1.5" /> Delete
                </button>
                <button
                  onClick={() => setSelected(null)}
                  className="px-6 py-3 bg-black/40 border border-white/10 text-white/70 text-sm font-bold rounded-xl hover:bg-black/60 hover:text-white transition-colors"
                >
                  Close
                </button>

              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
