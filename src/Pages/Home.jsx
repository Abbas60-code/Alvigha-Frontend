import React, { useEffect, useState } from 'react';
import Hero from '../Components/Hero';
import CategoryNav from '../Components/CategoryNav';
import Section from '../Components/Section';
import MenuItemCard from '../Components/MenuItemCard';
import { categories, menuData } from '../data';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:9000';

export default function Home() {
  const [dbItems, setDbItems] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/menu`)
      .then(r => r.json())
      .then(data => setDbItems(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  // Group DB items by category (uppercase to match data.js format)
  const dbByCategory = {};
  dbItems.forEach(item => {
    const cat = (item.category || '').toUpperCase();
    if (!dbByCategory[cat]) dbByCategory[cat] = [];
    dbByCategory[cat].push({
      id: item._id,
      title: item.name,
      image: item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80',
      price: item.price,
      tags: item.tag ? [item.tag] : [],
      desc: item.description || '',
    });
  });

  // Merge: DB categories first (new ones), then static categories
  const dbCats = Object.keys(dbByCategory).filter(c => !categories.includes(c));
  const allCategories = [...dbCats, ...categories];

  return (
    <>
      <Hero />
      <CategoryNav extraCategories={dbCats} />
      
      {/* Menu Sections Container */}
      <main className="w-full relative z-10 pb-20">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10 pointer-events-none mix-blend-overlay"></div>

        {allCategories.map((cat, idx) => {
          const staticItems = menuData[cat] || [];
          const dbCatItems = dbByCategory[cat] || [];
          const items = [...dbCatItems, ...staticItems];
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
