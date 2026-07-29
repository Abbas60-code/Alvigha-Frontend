import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiCalendarCheckLine, RiMapPinLine, RiTeamLine, RiRefreshLine, RiCloseLine } from 'react-icons/ri';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:9000';

export default function AdminReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [editingBooking, setEditingBooking] = useState(null);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/bookings`);
      const data = await res.json();
      setReservations(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBookings(); }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`${API_URL}/api/bookings/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        fetchBookings();
        setEditingBooking(null);
      }
    } catch (error) {
      console.error('Error updating status', error);
    }
  };

  const getTone = (status) => {
    switch (status) {
      case 'Confirmed': return 'bg-brand-red/20 text-brand-accent border-brand-accent/30';
      case 'Pending': return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'Cancelled': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'Completed': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      default: return 'bg-black/20 text-white/50 border-white/10';
    }
  };

  return (
    <div className="flex gap-5 h-full relative">
      <div className="flex-1 bg-brand-dark/60 border border-brand-accent/20 rounded-2xl flex flex-col overflow-hidden shadow-lg">
        
        <div className="px-6 py-5 border-b border-brand-accent/20 bg-black/20 flex items-center justify-between">
          <div>
            <h2 className="font-serif font-bold text-xl text-brand-accent">Reservations</h2>
            <p className="text-xs text-white/50 mt-1 tracking-wide">Manage ballroom and event bookings.</p>
          </div>
          <button onClick={fetchBookings} className="flex items-center gap-2 px-5 py-2.5 bg-black/20 hover:bg-black/40 text-brand-accent text-xs font-bold rounded-xl transition-colors border border-brand-accent/30 hover:border-brand-accent/50 cursor-pointer">
            <RiRefreshLine /> Refresh
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 bg-black/10 flex-1 overflow-auto">
          {loading ? (
            <div className="col-span-full py-20 text-center text-white/50">Loading reservations...</div>
          ) : reservations.length === 0 ? (
            <div className="col-span-full py-20 text-center text-white/50">No reservations found.</div>
          ) : (
            reservations.map((r, i) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                key={r._id}
                className="bg-black/20 border border-white/10 rounded-2xl p-5 hover:border-brand-accent/30 transition-colors shadow-md flex flex-col"
              >
                <div className="flex justify-between items-start mb-5">
                  <div>
                    <p className="font-bold text-base text-white">{r.name}</p>
                    <p className="text-[11px] text-white/50 font-medium mt-0.5">{r.eventType}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-md border text-[9px] font-bold uppercase ${getTone(r.status)}`}>
                    {r.status}
                  </span>
                </div>
                
                <div className="space-y-3 text-xs text-white/70 font-medium flex-1">
                  <div className="flex items-center gap-3">
                    <RiCalendarCheckLine className="text-brand-accent text-sm" />
                    <span>{new Date(r.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <RiTeamLine className="text-brand-accent text-sm" />
                    <span>{r.guests} Guests</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <RiMapPinLine className="text-brand-accent text-sm" />
                    <span>{r.phone}</span>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <button onClick={() => setEditingBooking(r)} className="flex-1 py-2.5 rounded-xl bg-black/20 hover:bg-black/40 text-white/80 hover:text-white text-[11px] font-bold transition-colors border border-white/10 cursor-pointer">
                    View & Edit
                  </button>
                  {r.status === 'Pending' && (
                    <button onClick={() => handleUpdateStatus(r._id, 'Confirmed')} className="flex-1 py-2.5 rounded-xl bg-brand-accent hover:brightness-110 text-[#13131a] text-[11px] font-bold transition-all shadow-[0_0_15px_rgba(229,205,172,0.2)] cursor-pointer">
                      Confirm
                    </button>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editingBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-brand-dark border border-brand-accent/30 rounded-2xl p-6 w-full max-w-md shadow-2xl relative"
            >
              <button onClick={() => setEditingBooking(null)} className="absolute top-4 right-4 text-white/50 hover:text-white cursor-pointer">
                <RiCloseLine className="text-xl" />
              </button>
              
              <h2 className="text-xl font-serif text-brand-accent font-bold mb-6">Booking Details</h2>
              
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-4 text-sm text-white/70">
                  <div>
                    <span className="block text-[10px] uppercase text-white/40 mb-1">Customer Name</span>
                    <span className="text-white font-medium">{editingBooking.name}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase text-white/40 mb-1">Phone</span>
                    <span className="text-white font-medium">{editingBooking.phone}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase text-white/40 mb-1">Email</span>
                    <span className="text-white font-medium">{editingBooking.email}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase text-white/40 mb-1">Date</span>
                    <span className="text-white font-medium">{new Date(editingBooking.date).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase text-white/40 mb-1">Event Type</span>
                    <span className="text-white font-medium">{editingBooking.eventType}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase text-white/40 mb-1">Guests</span>
                    <span className="text-white font-medium">{editingBooking.guests}</span>
                  </div>
                </div>
                
                <div>
                  <span className="block text-[10px] uppercase text-white/40 mb-1">Special Requests</span>
                  <div className="bg-black/30 border border-white/5 rounded-lg p-3 text-sm text-white/80 min-h-[60px]">
                    {editingBooking.requests || 'None'}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase text-white/50 mb-2">Change Status</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Pending', 'Confirmed', 'Completed', 'Cancelled'].map((status) => (
                    <button
                      key={status}
                      onClick={() => handleUpdateStatus(editingBooking._id, status)}
                      className={`py-2 rounded-lg text-[11px] font-bold border transition-colors cursor-pointer ${
                        editingBooking.status === status 
                          ? getTone(status) 
                          : 'bg-black/20 border-white/10 text-white/50 hover:bg-white/10'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
