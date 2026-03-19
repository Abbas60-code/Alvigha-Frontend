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

export default function AdminMenu() {
  return (
    <motion.section
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className="bg-black/55 border border-white/10 rounded-2xl p-4 md:p-5 backdrop-blur-lg"
    >
      <SectionTitle
        title="Menu & Pricing"
        subtitle="Quickly adjust visibility, pricing and highlight best‑selling Alvigha dishes."
      />

      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        <div className="flex-1 space-y-3 text-xs">
          {[
            {
              name: 'Alvigha Special Mandi (Family)',
              category: 'Signature Mains',
              price: '₨ 5,200',
              status: 'Available',
              tag: 'Best Seller',
            },
            {
              name: 'Chicken Mandi',
              category: 'Mains',
              price: '₨ 1,850',
              status: 'Available',
              tag: 'Most Ordered',
            },
            {
              name: 'Kunafa with Cream',
              category: 'Desserts',
              price: '₨ 890',
              status: 'Low Stock',
              tag: 'Sweet Highlight',
            },
          ].map((item) => (
            <div
              key={item.name}
              className="flex items-start justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5"
            >
              <div>
                <p className="text-sm font-semibold">{item.name}</p>
                <p className="text-[11px] text-gray-300">{item.category}</p>
                <div className="mt-1 flex flex-wrap gap-1.5 text-[10px]">
                  <span className="px-2 py-0.5 rounded-full bg-brand-red/80 text-white">
                    {item.tag}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-white/10 border border-white/20 text-gray-100">
                    {item.status}
                  </span>
                </div>
              </div>
              <div className="text-right space-y-1">
                <p className="text-sm font-semibold text-amber-300">{item.price}</p>
                <button
                  type="button"
                  className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-[11px] cursor-pointer"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full md:w-64 lg:w-72 space-y-3 text-xs">
          <div className="rounded-2xl bg-gradient-to-br from-brand-red/80 via-red-500/70 to-amber-400/70 border border-white/15 p-3">
            <p className="uppercase text-[10px] tracking-[0.22em] text-white/90 mb-1">
              Tonight&apos;s Focus
            </p>
            <p className="text-sm">
              Push <span className="font-semibold">Signature Mandi Platters</span> during peak
              hours. Consider a limited-time dessert add-on for upsell.
            </p>
          </div>

          <div className="rounded-2xl bg-black/40 border border-white/10 p-3 space-y-2">
            <p className="text-[11px] font-semibold text-gray-100">Quick Toggles</p>
            {['Hide Sold Out Items', 'Highlight Chef Special', 'Apply Midnight Pricing'].map(
              (label) => (
                <label
                  key={label}
                  className="flex items-center justify-between gap-2 text-[11px] cursor-pointer"
                >
                  <span className="text-gray-200">{label}</span>
                  <span className="relative inline-flex h-4 w-7 items-center rounded-full bg-white/10 border border-white/15">
                    <span className="h-3 w-3 rounded-full bg-brand-red/80 translate-x-3.5 shadow-[0_0_8px_rgba(248,113,113,0.9)]" />
                  </span>
                </label>
              ),
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

