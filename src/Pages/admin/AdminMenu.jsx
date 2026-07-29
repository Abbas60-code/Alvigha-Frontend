import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiEdit2Line, RiAddLine, RiSearchLine, RiDeleteBinLine, RiCloseLine, RiImageAddLine } from 'react-icons/ri';
import { categories as staticCategories } from '../../data';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:9000';
const MENU_CATEGORIES = [...staticCategories, 'OTHER'];


export default function AdminMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '', category: '', price: '', status: 'Available', tag: '', description: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef(null);

  const fetchMenu = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/menu`);
      const data = await res.json();
      setMenuItems(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name, category: item.category, price: item.price,
        status: item.status, tag: item.tag || '', description: item.description || ''
      });
      setImagePreview(item.image || '');
    } else {
      setEditingItem(null);
      setFormData({ name: '', category: '', price: '', status: 'Available', tag: '', description: '' });
      setImagePreview('');
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setImageFile(null);
    setImagePreview('');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Compress image client-side before uploading to reduce Cloudinary upload time
  const compressImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          const MAX_WIDTH = 800;
          const scale = img.width > MAX_WIDTH ? MAX_WIDTH / img.width : 1;
          const canvas = document.createElement('canvas');
          canvas.width = img.width * scale;
          canvas.height = img.height * scale;
          canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
          canvas.toBlob((blob) => resolve(new File([blob], file.name, { type: 'image/jpeg' })), 'image/jpeg', 0.75);
        };
      };
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file)); // show preview immediately
      const compressed = await compressImage(file);
      setImageFile(compressed);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const url = editingItem ? `${API_URL}/api/menu/${editingItem._id}` : `${API_URL}/api/menu`;
    const method = editingItem ? 'PUT' : 'POST';

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([k, v]) => data.append(k, v));
      if (imageFile) data.append('image', imageFile);

      const res = await fetch(url, { method, body: data });
      if (res.ok) {
        fetchMenu();
        handleCloseModal();
      }
    } catch (error) {
      console.error('Error saving menu item', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const res = await fetch(`${API_URL}/api/menu/${id}`, { method: 'DELETE' });
        if (res.ok) fetchMenu();
      } catch (error) {
        console.error('Error deleting item', error);
      }
    }
  };

  const filteredItems = menuItems.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase()) || 
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex gap-5 h-full relative">
      {/* Main List */}
      <div className="flex-1 flex flex-col gap-5">
        
        {/* Toolbar */}
        <div className="bg-brand-dark/60 border border-brand-accent/20 rounded-2xl p-4 flex flex-wrap gap-4 items-center justify-between shadow-lg">
          <div className="flex items-center gap-2 bg-black/20 border border-white/10 rounded-xl px-3 py-2 w-64 focus-within:border-brand-accent/50 transition-colors">
            <RiSearchLine className="text-white/40 text-sm" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search menu items…"
              className="bg-transparent text-xs text-white placeholder:text-white/40 focus:outline-none w-full"
            />
          </div>
          <button onClick={() => handleOpenModal()} className="flex items-center gap-2 px-5 py-2.5 bg-brand-accent hover:brightness-110 text-[#13131a] text-xs font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(229,205,172,0.3)] cursor-pointer">
            <RiAddLine className="text-base" /> Add Item
          </button>
        </div>

        {/* List */}
        <div className="bg-brand-dark/60 border border-brand-accent/20 rounded-2xl flex-1 overflow-auto p-5 space-y-3 shadow-lg">
          {loading ? (
            <div className="text-center py-10 text-white/50 text-sm">Loading menu...</div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-10 text-white/50 text-sm">No items found.</div>
          ) : (
            filteredItems.map((item, i) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                key={item._id}
                className="flex items-center justify-between gap-4 p-4 rounded-xl border border-white/5 bg-black/10 hover:bg-black/30 transition-colors"
              >
                {/* Thumbnail */}
                <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-white/10 bg-black/30 flex items-center justify-center">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <RiImageAddLine className="text-white/20 text-xl" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <p className="text-sm font-bold text-white truncate">{item.name}</p>
                    {item.tag && (
                      <span className="px-2 py-0.5 rounded border border-brand-accent/40 bg-brand-accent/10 text-brand-accent text-[9px] uppercase font-bold whitespace-nowrap">
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-white/50 font-medium">
                    <span>{item.category}</span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span className={item.status === 'Available' ? 'text-emerald-400' : 'text-amber-400'}>{item.status}</span>
                  </div>
                </div>

                <div className="flex items-center gap-5 shrink-0">
                  <p className="text-sm font-bold text-brand-accent">Rs {item.price?.toLocaleString()}</p>
                  <div className="flex gap-2">
                    <button onClick={() => handleOpenModal(item)} className="p-2.5 rounded-lg bg-black/20 border border-white/10 text-white/50 hover:text-brand-accent hover:bg-black/40 hover:border-brand-accent/30 transition-all cursor-pointer">
                      <RiEdit2Line />
                    </button>
                    <button onClick={() => handleDelete(item._id)} className="p-2.5 rounded-lg bg-black/20 border border-white/10 text-white/50 hover:text-red-400 hover:bg-black/40 hover:border-red-400/30 transition-all cursor-pointer">
                      <RiDeleteBinLine />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-[320px] flex flex-col gap-5">
        <div className="bg-gradient-to-br from-brand-red/40 to-brand-dark border border-brand-accent/30 rounded-2xl p-6 shadow-[0_0_20px_rgba(220,38,38,0.2)]">
          <p className="text-[10px] uppercase tracking-widest text-brand-accent font-bold mb-3 border-b border-brand-accent/20 pb-2">Tonight's Focus</p>
          <p className="text-xs text-white/70 leading-relaxed font-medium">
            Push <span className="text-brand-accent font-bold">Signature Mandi Platters</span> during peak hours. Consider a limited-time dessert add-on for upsell.
          </p>
        </div>

        <div className="bg-brand-dark/60 border border-brand-accent/20 rounded-2xl p-6 flex-1 shadow-lg">
          <p className="font-serif font-bold text-base mb-5 text-brand-accent">Quick Toggles</p>
          <div className="space-y-5">
            {['Hide Sold Out Items', 'Highlight Chef Special', 'Apply Midnight Pricing'].map((label) => (
              <label key={label} className="flex items-center justify-between gap-3 cursor-pointer group">
                <span className="text-xs font-semibold text-white/60 group-hover:text-brand-accent transition-colors">{label}</span>
                <div className="relative inline-flex h-5 w-9 items-center rounded-full bg-black/40 border border-white/10 transition-colors group-hover:border-brand-accent/30">
                  <span className="h-3.5 w-3.5 rounded-full bg-brand-accent translate-x-4 shadow-[0_0_10px_rgba(229,205,172,0.8)]" />
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-brand-dark border border-brand-accent/30 rounded-2xl p-6 w-full max-w-md shadow-2xl relative"
            >
              <button onClick={handleCloseModal} className="absolute top-4 right-4 text-white/50 hover:text-white cursor-pointer">
                <RiCloseLine className="text-xl" />
              </button>
              <h2 className="text-xl font-serif text-brand-accent font-bold mb-6">
                {editingItem ? 'Edit Menu Item' : 'Add Menu Item'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase text-white/50 mb-1">Name</label>
                  <input required name="name" value={formData.name} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-accent/50" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase text-white/50 mb-1">Category</label>
                    <div className="relative">
                      <select
                        required
                        name="category"
                        value={MENU_CATEGORIES.includes(formData.category.toUpperCase()) ? formData.category.toUpperCase() : 'OTHER'}
                        onChange={(e) => {
                          if (e.target.value === 'OTHER') {
                            setFormData({ ...formData, category: '' });
                          } else {
                            setFormData({ ...formData, category: e.target.value });
                          }
                        }}
                        className="w-full bg-[#1a0a0a] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-accent/50 appearance-none cursor-pointer pr-8"
                        style={{ colorScheme: 'dark' }}
                      >
                        <option value="" disabled className="bg-[#1a0a0a] text-gray-400">Select category…</option>
                        {MENU_CATEGORIES.map(c => (
                          <option key={c} value={c} className="bg-[#1a0a0a] text-white">{c}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                        <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                      </div>
                    </div>
                    {/* Custom category input when OTHER is selected */}
                    {(!MENU_CATEGORIES.includes(formData.category.toUpperCase()) || formData.category === '') && (
                      <input
                        required
                        placeholder="Type custom category name…"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full mt-2 bg-black/40 border border-brand-accent/30 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-accent/50"
                      />
                    )}
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-white/50 mb-1">Price (Rs)</label>
                    <input required type="number" name="price" value={formData.price} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-accent/50" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase text-white/50 mb-1">Status</label>
                    <select name="status" value={formData.status} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-accent/50 appearance-none">
                      <option value="Available">Available</option>
                      <option value="Low Stock">Low Stock</option>
                      <option value="Out of Stock">Out of Stock</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase text-white/50 mb-1">Tag (Optional)</label>
                    <input name="tag" value={formData.tag} onChange={handleChange} placeholder="e.g. Best Seller" className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-accent/50" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] uppercase text-white/50 mb-1">Description</label>
                  <textarea name="description" value={formData.description} onChange={handleChange} rows="2" className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-accent/50 resize-none"></textarea>
                </div>
                
                {/* Image Upload */}
                <div>
                  <label className="block text-[10px] uppercase text-white/50 mb-1">Item Image</label>
                  <div
                    onClick={() => fileInputRef.current.click()}
                    className="relative w-full h-32 rounded-xl border-2 border-dashed border-white/10 bg-black/30 hover:border-brand-accent/40 transition-colors cursor-pointer flex items-center justify-center overflow-hidden group"
                  >
                    {imagePreview ? (
                      <>
                        <img src={imagePreview} alt="preview" className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <p className="text-xs text-white font-bold">Change Image</p>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-white/40 group-hover:text-brand-accent transition-colors">
                        <RiImageAddLine className="text-3xl" />
                        <p className="text-xs font-medium">Click to upload image</p>
                        <p className="text-[10px]">JPG, PNG, WEBP</p>
                      </div>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <button type="button" onClick={handleCloseModal} className="px-4 py-2 rounded-lg border border-white/10 text-white/70 hover:bg-white/10 transition-colors text-sm font-bold cursor-pointer">
                    Cancel
                  </button>
                  <button type="submit" disabled={saving} className={`px-4 py-2 rounded-lg bg-brand-accent text-[#13131a] hover:brightness-110 transition-colors text-sm font-bold cursor-pointer shadow-[0_0_10px_rgba(229,205,172,0.3)] ${saving ? 'opacity-60 cursor-not-allowed' : ''}`}>
                    {saving ? 'Saving...' : editingItem ? 'Update Item' : 'Add Item'}
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
