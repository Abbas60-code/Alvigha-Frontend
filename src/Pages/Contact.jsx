import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    setErrorMsg('');

    try {
      const response = await fetch(`${API_URL}/api/contact`, {  // ✅ /api/contact
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        const firstError = data.errors
          ? Object.values(data.errors).flat()[0]
          : (data.message || 'Something went wrong. Please try again.');
        setErrorMsg(firstError);
        setStatus('error');
      }
    } catch (err) {
      setErrorMsg('Could not connect to server. Please check your connection.');
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  // ... baqi code same hai