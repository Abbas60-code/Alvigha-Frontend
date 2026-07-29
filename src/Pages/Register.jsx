import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaUserPlus } from 'react-icons/fa';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
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
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    try {
      const response = await fetch('http://localhost:9000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      console.log('Registration successful:', data);
      // Redirect to login or home after successful registration
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="pt-24 pb-16 min-h-[80vh] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-40 right-10 w-72 h-72 bg-brand-dark rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-brand-dark rounded-full opacity-50 blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg bg-black/40 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-2xl relative"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-brand-accent to-transparent"></div>
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif font-bold text-brand-accent mb-2">Create Account</h2>
          <p className="text-gray-300 text-sm">Join us to experience culinary excellence</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900/50 border border-red-500/50 text-red-200 text-sm rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-brand-accent text-sm font-semibold mb-2" htmlFor="fullName">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-gray-400" />
              </div>
              <input
                id="fullName"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full bg-black/30 border border-white/20 text-white text-sm rounded-lg focus:ring-brand-accent focus:border-brand-accent block pl-10 p-3 transition-colors"
                required
              />
            </div>
          </div>

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-brand-accent text-sm font-semibold mb-2" htmlFor="password">
                Password
              </label>
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
                  placeholder="Create a password"
                  className="w-full bg-black/30 border border-white/20 text-white text-sm rounded-lg focus:ring-brand-accent focus:border-brand-accent block pl-10 p-3 transition-colors"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <div>
              <label className="block text-brand-accent text-sm font-semibold mb-2" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  className="w-full bg-black/30 border border-white/20 text-white text-sm rounded-lg focus:ring-brand-accent focus:border-brand-accent block pl-10 p-3 transition-colors"
                  required
                  minLength={6}
                />
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-brand-accent text-brand-dark font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-[0_0_15px_rgba(229,205,172,0.4)] mt-4 transition-all"
          >
            <FaUserPlus />
            <span>Create Account</span>
          </motion.button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400 border-t border-white/10 pt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-brand-accent font-semibold hover:underline">
            Sign in here
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
