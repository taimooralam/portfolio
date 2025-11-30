import { useState } from 'react';
import { motion } from 'framer-motion';
import { profile } from '../data/portfolio';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', message: 'Please fill in all fields.' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    // Simulate form submission
    setStatus({ type: 'success', message: "Thank you for your message! I'll get back to you soon." });
    setFormData({ name: '', email: '', message: '' });

    setTimeout(() => setStatus(null), 5000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="py-20">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-heading text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-primary-600 dark:text-primary-400 mb-6">
            Interested in working together? Let&apos;s connect.
          </p>
          <div className="w-20 h-1 bg-accent-500 mx-auto rounded-full" />
        </motion.div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>

              <div className="space-y-4">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-3 text-primary-600 dark:text-primary-400 hover:text-accent-500 dark:hover:text-accent-400 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-accent-500/10">
                    <svg className="w-5 h-5 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span>{profile.email}</span>
                </a>

                <a
                  href={`tel:${profile.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 text-primary-600 dark:text-primary-400 hover:text-accent-500 dark:hover:text-accent-400 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-accent-500/10">
                    <svg className="w-5 h-5 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <span>{profile.phone}</span>
                </a>

                <a
                  href={`https://${profile.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-primary-600 dark:text-primary-400 hover:text-accent-500 dark:hover:text-accent-400 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-accent-500/10">
                    <svg className="w-5 h-5 text-accent-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <span>LinkedIn Profile</span>
                </a>
              </div>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-2">Current Status</h3>
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-primary-600 dark:text-primary-400">
                  Open to opportunities
                </span>
              </div>
              <p className="text-sm text-primary-500 dark:text-primary-400 mt-2">
                {profile.location}
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="glass-card p-6 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-primary-50 dark:bg-primary-900 border border-primary-200 dark:border-primary-700 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none transition-all"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-primary-50 dark:bg-primary-900 border border-primary-200 dark:border-primary-700 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none transition-all"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-primary-50 dark:bg-primary-900 border border-primary-200 dark:border-primary-700 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none transition-all resize-none"
                  placeholder="Tell me about your project or opportunity..."
                />
              </div>

              {status && (
                <div
                  className={`p-3 rounded-lg text-sm ${
                    status.type === 'success'
                      ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                      : 'bg-red-500/10 text-red-600 dark:text-red-400'
                  }`}
                >
                  {status.message}
                </div>
              )}

              <button type="submit" className="btn-primary w-full">
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
