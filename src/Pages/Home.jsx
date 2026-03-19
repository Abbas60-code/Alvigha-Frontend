import React from 'react';
import Hero from '../Components/Hero';
import CategoryNav from '../Components/CategoryNav';
import Section from '../Components/Section';
import MenuItemCard from '../Components/MenuItemCard';
import { categories, menuData } from '../data';

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryNav />
      
      {/* Menu Sections Container */}
      <main className="w-full relative z-10 pb-20">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10 pointer-events-none mix-blend-overlay"></div>
        {categories.map((cat, idx) => {
          const items = menuData[cat];
          // Only render section if data exists
          if (!items || items.length === 0) return null;

          return (
            <Section key={idx} title={cat}>
              {items.map((item) => (
                <MenuItemCard key={item.id} item={item} />
              ))}
            </Section>
          );
        })}
      </main>
    </>
  );
}
