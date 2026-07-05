import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import contactService from '../api/contactService';
import { useToast } from './Toast';

const Contact = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      toast.show('Please fill all required fields', { type: 'error' });
      setIsSubmitting(false);
      return;
    }
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(formData.email)) {
      toast.show('Please enter a valid email address', { type: 'error' });
      setIsSubmitting(false);
      return;
    }

    try {
      await contactService.submitContact(formData);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      toast.show('Message sent successfully! I will get back to you soon.', { type: 'success' });
    } catch (error) {
      console.error('Contact form error:', error);
      toast.show((error && error.message) || 'Network error. Make sure the backend server is running.', { type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.3 } }
  };

  return (
    <section id="contact" className="pt-10 pb-12 relative">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Let's <span className="gradient-text animate-wave">Connect</span>
            </h2>
            <div className="h-1 w-20 gradient-bg mx-auto rounded-full"></div>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
              Open for opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-12">

            {/* Contact Info */}
            <motion.div variants={itemVariants} className="lg:w-5/12 space-y-8">
              <div className="card-glass p-8 rounded-2xl border-t-2 border-t-accent-start">
                <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-accent-start/10 flex items-center justify-center mr-4 text-accent-start shrink-0">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h4 className="text-sm font-tech text-gray-400 mb-1">Email</h4>
                      <a href="mailto:Peeyushpurohit306@gmail.com" className="text-white hover:text-accent-start transition-colors font-medium break-all">
                        Peeyushpurohit306@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-accent-start/10 flex items-center justify-center mr-4 text-accent-start shrink-0">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h4 className="text-sm font-tech text-gray-400 mb-1">Phone</h4>
                      <a href="tel:+916367483860" className="text-white hover:text-accent-start transition-colors font-medium">
                        +91 6367483860
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-accent-start/10 flex items-center justify-center mr-4 text-accent-start shrink-0">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="text-sm font-tech text-gray-400 mb-1">Location</h4>
                      <p className="text-white font-medium">
                        Bikaner, Rajasthan, India
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-10 pt-8 border-t border-white/10">
                  <h4 className="text-sm font-tech text-gray-400 mb-4">Social Profiles</h4>
                  <div className="flex space-x-4">
                    <a href="https://github.com/piyushpuroit" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="group">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#181717] transition-all duration-300 transform-gpu group-hover:-translate-y-1 group-hover:scale-105 shadow-sm ring-0 group-hover:ring-3 group-hover:ring-accent-start/20">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill="currentColor" d="M12 .297a12 12 0 00-3.793 23.414c.6.111.82-.26.82-.577 0-.285-.01-1.04-.016-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.238 1.84 1.238 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.304-5.466-1.332-5.466-5.93 0-1.31.469-2.382 1.235-3.222-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.5 11.5 0 016.008 0c2.292-1.552 3.299-1.23 3.299-1.23.653 1.652.242 2.873.119 3.176.77.84 1.233 1.912 1.233 3.222 0 4.61-2.803 5.624-5.475 5.921.43.372.814 1.102.814 2.222 0 1.605-.014 2.898-.014 3.293 0 .32.216.694.825.576A12 12 0 0012 .297z"/></svg>
                      </div>
                    </a>

                    <a href="https://www.linkedin.com/in/piyush-purohit-qs5474/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="group">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white group-hover:bg-[#0077b5] group-hover:text-white transition-all duration-300 transform-gpu group-hover:-translate-y-1 group-hover:scale-105 shadow-sm ring-0 group-hover:ring-3 group-hover:ring-accent-start/20">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="2" fill="#0077B5"/><path d="M6.94 9.5H9.2v8.3H6.94zM8.06 6.9c.78 0 1.26.52 1.26 1.2-.01.68-.48 1.2-1.25 1.2H8.06c-.78 0-1.26-.52-1.26-1.2 0-.68.48-1.2 1.25-1.2zM11.4 9.5h2.15v1.14h.03c.3-.57 1.04-1.17 2.14-1.17 2.29 0 2.71 1.51 2.71 3.47v4.86h-2.26v-4.31c0-1.03-.02-2.36-1.44-2.36-1.44 0-1.66 1.12-1.66 2.29v4.38H11.4z" fill="#fff"/></svg>
                      </div>
                    </a>

                    <a href="https://www.instagram.com/piyush._.peeyush/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="group">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white group-hover:bg-gradient-to-tr group-hover:from-[#f09433] group-hover:via-[#dc2743] group-hover:to-[#bc1888] group-hover:text-white transition-all duration-300 transform-gpu group-hover:-translate-y-1 group-hover:scale-105 shadow-sm ring-0 group-hover:ring-3 group-hover:ring-accent-start/20">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><linearGradient id="igGrad2" x1="0%" x2="100%" y1="0%" y2="100%"><stop offset="0%" stopColor="#f58529"/><stop offset="30%" stopColor="#dd2a7b"/><stop offset="60%" stopColor="#8134af"/><stop offset="100%" stopColor="#515bd4"/></linearGradient></defs><rect x="2" y="2" width="20" height="20" rx="5" fill="url(#igGrad2)"/><path d="M12 7.2a4.8 4.8 0 100 9.6 4.8 4.8 0 000-9.6zm0 7.92a3.12 3.12 0 110-6.24 3.12 3.12 0 010 6.24z" fill="#fff"/><circle cx="17.5" cy="6.5" r="0.9" fill="#fff"/></svg>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants} className="lg:w-7/12">
              <div className="card-glass p-8 md:p-10 rounded-2xl relative">
                {/* Decorative glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent-start/10 rounded-full blur-[80px] -z-10 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-end/10 rounded-full blur-[80px] -z-10 pointer-events-none"></div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-tech text-gray-400">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-start focus:ring-1 focus:ring-accent-start transition-colors"
                        placeholder="Your Name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-tech text-gray-400">Your Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-start focus:ring-1 focus:ring-accent-start transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-tech text-gray-400">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-start focus:ring-1 focus:ring-accent-start transition-colors"
                        placeholder="+91 6367483860"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-tech text-gray-400">Subject</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-start focus:ring-1 focus:ring-accent-start transition-colors"
                        placeholder="Inquiry / Feedback"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-tech text-gray-400">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-start focus:ring-1 focus:ring-accent-start transition-colors resize-none"
                      placeholder="How can I help you?"
                    ></textarea>
                  </div>

                  {status.message && (
                    <div className={`p-4 rounded-xl text-sm ${status.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                      {status.message}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl text-white font-bold text-lg bg-[#0f0f0f] border border-[#00f2fe]/40 hover:border-[#00f2fe] hover:shadow-[0_0_25px_rgba(0,242,254,0.4)] transition-all duration-300 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-accent-start to-accent-end opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        Send Message
                        <Send size={20} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </span>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
