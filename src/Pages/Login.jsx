import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:9000'}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      console.log('Login successful:', data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      window.dispatchEvent(new Event('authChange'));
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="pt-24 pb-16 min-h-[80vh] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-20 -left-20 w-64 h-64 bg-brand-dark rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute bottom-10 -right-20 w-80 h-80 bg-brand-dark rounded-full opacity-50 blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-black/40 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-2xl relative"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-brand-accent to-transparent"></div>
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif font-bold text-brand-accent mb-2">Welcome Back</h2>
          <p className="text-gray-300 text-sm">Sign in to your account to continue</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900/50 border border-red-500/50 text-red-200 text-sm rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-brand-accent text-sm font-semibold mb-2" htmlFor="email">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full bg-black/30 border border-white/20 text-white text-sm rounded-lg focus:ring-brand-accent focus:border-brand-accent block pl-10 p-3 transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-brand-accent text-sm font-semibold" htmlFor="password">
                Password
              </label>
              <a href="#" className="text-xs text-gray-400 hover:text-brand-accent transition-colors">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full bg-black/30 border border-white/20 text-white text-sm rounded-lg focus:ring-brand-accent focus:border-brand-accent block pl-10 p-3 transition-colors"
                required
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-brand-accent text-brand-dark font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-[0_0_15px_rgba(229,205,172,0.4)] transition-all"
          >
            <FaSignInAlt />
            <span>Sign In</span>
          </motion.button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400 border-t border-white/10 pt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-brand-accent font-semibold hover:underline">
            Register here
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
