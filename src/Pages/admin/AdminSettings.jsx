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

export default function AdminSettings() {
  return (
    <motion.section
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className="bg-black/55 border border-white/10 rounded-2xl p-4 md:p-5 backdrop-blur-lg"
    >
      <SectionTitle
        title="Admin Settings"
        subtitle="Control timings, notifications and service preferences for Alvigha."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="space-y-3">
          <div className="rounded-2xl bg-white/5 border border-white/10 p-3 space-y-2">
            <p className="text-[11px] font-semibold text-gray-100">Branch Timings</p>
            {['Gulshan: 6:00 PM – 12:30 AM', 'SMCHS: 6:00 PM – 4:00 AM'].map((line) => (
              <div key={line} className="flex items-center justify-between gap-2">
                <span className="text-[11px] text-gray-200">{line}</span>
                <button
                  type="button"
                  className="text-[10px] px-2 py-1 rounded-full bg-black/40 border border-white/20 cursor-pointer"
                >
                  Edit
                </button>
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-white/5 border border-white/10 p-3 space-y-1.5">
            <p className="text-[11px] font-semibold text-gray-100">Notifications</p>
            {['New Online Order', 'Kitchen Delay Alerts', 'Low Stock Items', 'VIP Guest Arrivals'].map(
              (label) => (
                <label
                  key={label}
                  className="flex items-center justify-between gap-2 text-[11px] cursor-pointer"
                >
                  <span className="text-gray-200">{label}</span>
                  <span className="relative inline-flex h-4 w-7 items-center rounded-full bg-white/10 border border-white/15">
                    <span className="h-3 w-3 rounded-full bg-emerald-400 translate-x-3.5 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
                  </span>
                </label>
              ),
            )}
          </div>
        </div>

        <div className="space-y-3">
          <div className="rounded-2xl bg-gradient-to-br from-red-500/30 via-black/70 to-black border border-red-300/40 p-3">
            <p className="text-[11px] font-semibold text-gray-100 mb-1">Service Mode</p>
            <p className="text-sm mb-2">
              Toggle between <span className="font-semibold">Normal</span> and{' '}
              <span className="font-semibold">High Rush</span> to adjust internal alerts.
            </p>
            <div className="flex gap-2 text-[11px]">
              <button
                type="button"
                className="flex-1 px-3 py-1.5 rounded-full bg-black/50 border border-white/20 cursor-pointer"
              >
                Normal
              </button>
              <button
                type="button"
                className="flex-1 px-3 py-1.5 rounded-full bg-brand-red/80 border border-red-200/70 text-white cursor-pointer"
              >
                High Rush
              </button>
            </div>
          </div>

          <div className="rounded-2xl bg-black/40 border border-white/10 p-3 space-y-2">
            <p className="text-[11px] font-semibold text-gray-100">Export & Backup</p>
            {['Export Orders (CSV)', 'Download Menu Snapshot', 'Backup Settings'].map((label) => (
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

