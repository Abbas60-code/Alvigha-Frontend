import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RiStore2Line, RiNotification3Line, RiLockPasswordLine } from 'react-icons/ri';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:9000';

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    restaurantName: '',
    contactPhone: '',
    email2faEnabled: true
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/api/settings`)
      .then(res => res.json())
      .then(data => {
        if(data) setSettings({
          restaurantName: data.restaurantName || '',
          contactPhone: data.contactPhone || '',
          email2faEnabled: data.email2faEnabled !== undefined ? data.email2faEnabled : true
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      const res = await fetch(`${API_URL}/api/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      if (res.ok) setMessage('Settings saved successfully!');
      else setMessage('Failed to save settings.');
    } catch (err) {
      setMessage('Error connecting to server.');
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  if (loading) return <div className="text-white/50">Loading settings...</div>;

  return (
    <div className="max-w-4xl space-y-6">
      {message && (
        <div className={`p-4 rounded-xl text-sm font-bold ${message.includes('success') ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
          {message}
        </div>
      )}

      
      {/* Profile/Store Info */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-brand-dark/60 border border-brand-accent/20 rounded-2xl p-7 shadow-lg"
      >
        <div className="flex items-center gap-4 mb-7 pb-5 border-b border-white/5">
          <div className="w-12 h-12 rounded-xl bg-brand-red border border-brand-accent/40 text-brand-accent flex items-center justify-center shadow-[0_0_15px_rgba(229,205,172,0.2)]">
            <RiStore2Line className="text-2xl" />
          </div>
          <div>
            <h2 className="font-serif font-bold text-xl text-brand-accent">Store Details</h2>
            <p className="text-xs text-white/50 tracking-wide mt-1">Update restaurant details and operating hours.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] text-brand-accent uppercase tracking-wider ml-1 font-bold">Restaurant Name</label>
            <input name="restaurantName" value={settings.restaurantName} onChange={handleChange} type="text" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-accent/50 transition-colors" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] text-brand-accent uppercase tracking-wider ml-1 font-bold">Contact Phone</label>
            <input name="contactPhone" value={settings.contactPhone} onChange={handleChange} type="text" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-accent/50 transition-colors" />
          </div>
        </div>
      </motion.div>

      {/* Security */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-brand-dark/60 border border-brand-accent/20 rounded-2xl p-7 shadow-lg"
      >
        <div className="flex items-center gap-4 mb-7 pb-5 border-b border-white/5">
          <div className="w-12 h-12 rounded-xl bg-brand-red border border-brand-accent/40 text-brand-accent flex items-center justify-center shadow-[0_0_15px_rgba(229,205,172,0.2)]">
            <RiLockPasswordLine className="text-2xl" />
          </div>
          <div>
            <h2 className="font-serif font-bold text-xl text-brand-accent">Security</h2>
            <p className="text-xs text-white/50 tracking-wide mt-1">Manage 2FA and admin credentials.</p>
          </div>
        </div>

        <div 
          onClick={() => setSettings(p => ({ ...p, email2faEnabled: !p.email2faEnabled }))}
          className="flex items-center justify-between p-5 rounded-xl border border-white/10 bg-black/20 hover:border-brand-accent/20 transition-colors cursor-pointer"
        >
          <div>
            <p className="text-sm font-bold text-white">Email 2FA Verification</p>
            <p className="text-xs text-white/50 mt-1 font-medium">Currently sending OTPs to <span className="text-white/80">muhammadabbas09dec@gmail.com</span></p>
          </div>
          <div className={`relative inline-flex h-5 w-10 items-center rounded-full border transition-colors ${settings.email2faEnabled ? 'bg-brand-red border-brand-accent/30' : 'bg-black/50 border-white/10'}`}>
            <span className={`h-4 w-4 rounded-full bg-brand-accent transition-transform shadow-[0_0_10px_rgba(229,205,172,0.8)] ${settings.email2faEnabled ? 'translate-x-5' : 'translate-x-1 opacity-50'}`} />
          </div>
        </div>
      </motion.div>

      <div className="flex justify-end gap-3 pt-4 border-t border-brand-accent/20">
        <button 
          onClick={handleSave} 
          disabled={saving}
          className={`px-6 py-3 rounded-xl bg-brand-accent hover:brightness-110 text-[#13131a] text-sm font-bold transition-all shadow-[0_0_15px_rgba(229,205,172,0.3)] cursor-pointer ${saving ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

    </div>
  );
}
