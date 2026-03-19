import React from 'react';
import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

function SectionTitle({ title, subtitle }) {
  return (
    <div className="mb-3 md:mb-4">
      <h2 className="text-sm md:text-base font-semibold">{title}</h2>
      {subtitle && <p className="text-xs text-gray-300/80 mt-0.5">{subtitle}</p>}
    </div>
  );
}

export default function AdminReservations() {
  return (
    <motion.section
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className="bg-black/55 border border-white/10 rounded-2xl p-4 md:p-5 backdrop-blur-lg"
    >
      <SectionTitle
        title="Reservations & Ballroom"
        subtitle="Track tonight’s bookings, ballroom occupancy and special events."
      />

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.5fr),minmax(0,1fr)] gap-4 md:gap-5 text-xs">
        <div className="space-y-2.5">
          {[
            {
              guest: 'Ahmed Khan',
              size: 'Table for 6',
              time: '09:15 PM',
              area: 'Ballroom',
              note: 'Birthday – dessert sparkler',
              status: 'Arriving Soon',
            },
            {
              guest: 'Family – Rehman',
              size: 'Table for 10',
              time: '09:45 PM',
              area: 'Main Dining',
              note: 'Prefer corner seating',
              status: 'Confirmed',
            },
            {
              guest: 'Corporate – Alvi Traders',
              size: 'Ballroom – 40 pax',
              time: '10:30 PM',
              area: 'Ballroom',
              note: 'Projector + sound setup',
              status: 'Setup In Progress',
            },
          ].map((resv) => (
            <div
              key={resv.guest}
              className="flex items-start justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5"
            >
              <div>
                <p className="text-sm font-semibold">{resv.guest}</p>
                <p className="text-[11px] text-gray-300">
                  {resv.size} • {resv.area}
                </p>
                <p className="mt-1 text-[11px] text-amber-200">{resv.note}</p>
              </div>
              <div className="text-right space-y-1">
                <p className="text-[11px] text-gray-300">{resv.time}</p>
                <span className="inline-flex px-2 py-1 rounded-full bg-white/5 border border-white/20 text-[10px] text-gray-100">
                  {resv.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <div className="rounded-2xl bg-gradient-to-br from-emerald-500/20 via-black/60 to-black border border-emerald-300/40 p-3">
            <p className="text-[11px] font-semibold mb-1 text-emerald-100">
              Ballroom Capacity
            </p>
            <p className="text-sm">
              <span className="font-bold text-emerald-200">74%</span> reserved for tonight.
              Comfortable for current staffing.
            </p>
            <div className="mt-2 h-2.5 w-full rounded-full bg-white/5 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '74%' }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full w-[74%] rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,0.7)]"
              />
            </div>
          </div>

          <div className="rounded-2xl bg-black/40 border border-white/10 p-3 space-y-1.5">
            <p className="text-[11px] font-semibold text-gray-100">Quick Actions</p>
            {['Add Walk-in', 'Block Time Slot', 'Assign Event Manager'].map((label) => (
              <button
                key={label}
                type="button"
                className="w-full text-left text-[11px] px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 cursor-pointer"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

