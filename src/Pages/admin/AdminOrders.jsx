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

export default function AdminOrders() {
  return (
    <motion.section
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className="bg-black/55 border border-white/10 rounded-2xl p-4 md:p-5 backdrop-blur-lg"
    >
      <SectionTitle
        title="Orders Management"
        subtitle="Monitor, filter and update ongoing, scheduled and completed orders."
      />

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3 md:mb-4">
        <div className="flex flex-wrap gap-2 text-[11px]">
          {['All', 'In Progress', 'Ready', 'Completed', 'Cancelled'].map((chip, idx) => (
            <button
              key={chip}
              type="button"
              className={`px-3 py-1 rounded-full border cursor-pointer ${
                idx === 1
                  ? 'bg-brand-red/80 border-red-300/70 text-white'
                  : 'bg-white/5 border-white/15 text-gray-200 hover:bg-white/10'
              }`}
            >
              {chip}
            </button>
          ))}
        </div>
        <input
          className="w-full md:w-56 bg-black/40 border border-white/15 rounded-full px-3 py-1.5 text-xs placeholder:text-gray-400 focus:outline-none focus:border-red-300/70"
          placeholder="Search by order ID or customer"
        />
      </div>

      <div className="overflow-auto max-h-[420px] pr-1 text-xs">
        <table className="w-full border-separate border-spacing-y-2">
          <thead className="text-[11px] text-gray-300">
            <tr>
              {['Order ID', 'Channel', 'Items', 'Status', 'Placed', 'ETA', 'Actions'].map((h) => (
                <th key={h} className="text-left px-3 py-1 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              {
                id: '#ALV-190',
                channel: 'Dine-in / Table 12',
                items: 'Mandi (Fam), Kunafa, 3x Mint Marg.',
                status: 'In Progress',
                placed: '08:52 PM',
                eta: '09:07 PM',
                tone: 'bg-amber-500/15 border-amber-300/40',
              },
              {
                id: '#ALV-191',
                channel: 'Delivery / FoodPanda',
                items: '2x Chicken Mandi',
                status: 'Preparing',
                placed: '08:55 PM',
                eta: '09:20 PM',
                tone: 'bg-sky-500/10 border-sky-300/40',
              },
              {
                id: '#ALV-192',
                channel: 'Takeaway',
                items: 'Mix Grill, Hummus, Fries',
                status: 'Ready',
                placed: '08:40 PM',
                eta: 'Ready',
                tone: 'bg-emerald-500/10 border-emerald-300/40',
              },
            ].map((row) => (
              <tr key={row.id}>
                <td className="px-3 py-2">
                  <div
                    className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full border text-[11px] ${row.tone}`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                    {row.id}
                  </div>
                </td>
                <td className="px-3 py-2 text-gray-200">{row.channel}</td>
                <td className="px-3 py-2 text-gray-200">{row.items}</td>
                <td className="px-3 py-2">
                  <span className="px-2 py-1 rounded-full bg-white/5 border border-white/15 text-[10px]">
                    {row.status}
                  </span>
                </td>
                <td className="px-3 py-2 text-gray-300">{row.placed}</td>
                <td className="px-3 py-2 text-emerald-300 font-semibold">{row.eta}</td>
                <td className="px-3 py-2">
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      className="px-2 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer"
                    >
                      View
                    </button>
                    <button
                      type="button"
                      className="px-2 py-1 rounded-full bg-brand-red/80 hover:bg-brand-red text-white cursor-pointer"
                    >
                      Update
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.section>
  );
}

