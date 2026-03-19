import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      when: 'beforeChildren',
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const pulseGlow = 'shadow-[0_0_25px_rgba(248,113,113,0.35)]';

export default function AdminOverview() {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4 md:space-y-6"
    >
      {/* KPI cards */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
      >
        {[
          {
            label: 'Live Orders',
            value: '18',
            sub: '+6 in last 15 min',
            tone: 'from-red-500/80 to-red-400/80',
          },
          {
            label: 'Table Occupancy',
            value: '76%',
            sub: 'Ballroom near capacity',
            tone: 'from-amber-400/90 to-orange-500/80',
          },
          {
            label: 'Avg. Prep Time',
            value: '14 min',
            sub: 'Target: under 18 min',
            tone: 'from-emerald-400/80 to-emerald-500/60',
          },
          {
            label: "Tonight's Revenue",
            value: '₨ 142,800',
            sub: 'Projected: 210,000+',
            tone: 'from-sky-400/90 to-indigo-500/70',
          },
        ].map((card, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className={`relative overflow-hidden rounded-2xl p-3 md:p-4 bg-gradient-to-br ${card.tone} border border-white/15 text-xs md:text-sm ${pulseGlow}`}
          >
            <div className="absolute inset-0 opacity-70 mix-blend-soft-light bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.35),_transparent_60%)]" />
            <div className="relative">
              <p className="uppercase text-[10px] tracking-[0.2em] text-white/80 mb-1">
                {card.label}
              </p>
              <p className="text-lg md:text-2xl font-extrabold tracking-tight">
                {card.value}
              </p>
              <p className="mt-1 text-[11px] md:text-xs text-white/85">{card.sub}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts / activity grid */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr),minmax(0,1.3fr)] gap-4 md:gap-5"
      >
        {/* Service flow card */}
        <motion.div
          variants={itemVariants}
          className="bg-black/50 border border-white/10 rounded-2xl p-4 md:p-5 backdrop-blur-lg"
        >
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <div>
              <h2 className="text-sm md:text-base font-semibold flex items-center gap-2">
                Service Heatmap
                <span className="text-[11px] text-gray-300/80 font-normal">
                  (mock data for layout)
                </span>
              </h2>
              <p className="text-xs text-gray-300/80">
                Distribution of orders across dine-in, takeaway and delivery.
              </p>
            </div>
            <select className="bg-black/40 border border-white/15 rounded-full text-[11px] px-3 py-1 cursor-pointer">
              <option>Tonight</option>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
            </select>
          </div>

          {/* Faux bar chart */}
          <div className="mt-3 md:mt-4 space-y-3 md:space-y-4">
            {[
              { label: 'Dine-In', color: 'bg-emerald-400', width: 'w-[78%]' },
              { label: 'Delivery', color: 'bg-red-400', width: 'w-[64%]' },
              { label: 'Takeaway', color: 'bg-amber-300', width: 'w-[48%]' },
            ].map((row, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-[11px] text-gray-200">
                  <span>{row.label}</span>
                  <span>View details</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: row.width }}
                    transition={{ duration: 0.9, delay: 0.15 * idx, ease: 'easeOut' }}
                    className={`h-full rounded-full ${row.color} shadow-[0_0_15px_rgba(0,0,0,0.3)]`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Live queue */}
        <motion.div
          variants={itemVariants}
          className="bg-black/55 border border-white/10 rounded-2xl p-4 md:p-5 backdrop-blur-lg flex flex-col"
        >
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <div>
              <h2 className="text-sm md:text-base font-semibold">Live Kitchen Queue</h2>
              <p className="text-xs text-gray-300/80">
                Snapshot of orders currently in progress.
              </p>
            </div>
            <span className="text-[11px] px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-300/40 text-emerald-200 font-medium">
              Auto-refreshing
            </span>
          </div>

          <div className="space-y-2.5 text-xs overflow-auto max-h-64 pr-1">
            {[
              {
                id: '#ALV-184',
                items: '2x Chicken Mandi, 1x Kunafa',
                time: '08:42 PM',
                eta: '7 min',
                badge: 'Priority',
                tone: 'border-amber-300/70',
              },
              {
                id: '#ALV-185',
                items: '1x Mix Grill, 2x Hummus',
                time: '08:44 PM',
                eta: '12 min',
                badge: 'Dine-in',
                tone: 'border-sky-300/70',
              },
              {
                id: '#ALV-186',
                items: '3x Chicken Mandi (Fam)',
                time: '08:47 PM',
                eta: '18 min',
                badge: 'Delivery',
                tone: 'border-emerald-300/70',
              },
              {
                id: '#ALV-187',
                items: '2x Alvigha Special Platter',
                time: '08:49 PM',
                eta: '20 min',
                badge: 'Ballroom',
                tone: 'border-fuchsia-300/70',
              },
            ].map((order, idx) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * idx }}
                className={`flex items-start gap-2 p-2.5 rounded-2xl bg-white/5 border ${order.tone}`}
              >
                <div className="mt-1 h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="font-semibold text-[12px] tracking-wide">{order.id}</p>
                    <span className="text-[10px] text-gray-300">{order.time}</span>
                  </div>
                  <p className="text-[11px] text-gray-100/90">{order.items}</p>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-gray-100 border border-white/15">
                      {order.badge}
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-300">
                      ETA {order.eta}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

