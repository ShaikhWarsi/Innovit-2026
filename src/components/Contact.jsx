import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageSquare, ChevronDown, Send, CheckCircle, AlertCircle } from 'lucide-react';

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <motion.div
      initial={false}
      className={`border-b border-yellow-500/10 last:border-0 ${isOpen ? 'bg-yellow-500/5' : ''}`}
    >
      <button
        className="w-full py-4 text-left flex items-center justify-between focus:outline-none group"
        onClick={onClick}
      >
        <span className={`text-base font-medium transition-colors ${isOpen ? 'text-yellow-400' : 'text-[#fff1ce] group-hover:text-yellow-200'}`}>
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`text-yellow-500/70 group-hover:text-yellow-400`}
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto", marginBottom: 16 },
              collapsed: { opacity: 0, height: 0, marginBottom: 0 }
            }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className="text-gray-300 text-sm leading-relaxed pr-8">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Contact = () => {
  const [activeTab, setActiveTab] = useState('contact'); // 'contact' or 'faq'
  const [formStatus, setFormStatus] = useState('idle'); // 'idle', 'submitting', 'success', 'error'
  const [openFAQ, setOpenFAQ] = useState(0);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';

    // Email validation regex check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setFormStatus('submitting');

    // Construct mailto link with encoded parameters
    const subjectLine = `[${formData.subject.toUpperCase()}] Inquiry from ${formData.name}`;
    const bodyContent = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;

    const mailtoLink = `mailto:blockchainclub@vitbhopal.ac.in?subject=${encodeURIComponent(subjectLine)}&body=${encodeURIComponent(bodyContent)}`;

    // Open default mail client
    window.location.href = mailtoLink;

    // Show simulated success feedback
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', subject: 'general', message: '' });
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 1000);
  };

  const faqs = [
    {
      question: "What is INNOVIT 2026?",
      answer: "INNOVIT 2026 is an innovation-driven, multi-phase hackathon organized by the Blockchain Club, VIT Bhopal University, aligned with the vision of Atmanirbhar Bharat. It encourages students to build technology-based solutions for real-world Indian challenges."
    },
    {
      question: "Who can participate in INNOVIT 2026?",
      answer: "All students of VIT Bhopal University are eligible to participate. Students from any year, branch, or specialization can take part."
    },
    {
      question: "Is attending the orientation session mandatory?",
      answer: "While not mandatory, attending the orientation session is highly recommended as it includes hackathon guidance, timeline overview, and mentoring insights from SIH 2025 Grand Finalists."
    },
    {
      question: "Who are the mentors for INNOVIT 2026?",
      answer: (
        <div className="space-y-2">
          <p>Mentorship will be provided by:</p>
          <ul className="list-disc pl-4 space-y-1 text-gray-300/90">
            <li>SIH 2025 Grand Finalists (Team GATI)</li>
            <li>Domain experts and invited mentors</li>
          </ul>
          <p>Mentoring sessions will be conducted before the Grand Finale.</p>
        </div>
      )
    },
    {
      question: "What kind of projects are expected?",
      answer: (
        <div className="space-y-2">
          <p>Projects should be:</p>
          <ul className="list-disc pl-4 space-y-1 text-gray-300/90">
            <li>Original and innovative</li>
            <li>Technology-driven</li>
            <li>Aligned with Indian challenges</li>
            <li>Scalable and impactful</li>
          </ul>
          <p>Use of open-source tools is allowed with proper attribution.</p>
        </div>
      )
    },
    {
      question: "Will there be cash prizes?",
      answer: "Yes. Cash prizes and exciting goodies will be awarded to top-performing teams. Prize details will be announced at a later stage."
    },
    {
      question: "How can I stay updated about the hackathon?",
      answer: (
        <div className="space-y-2">
          <p>All official updates will be shared through:</p>
          <ul className="list-disc pl-4 space-y-1 text-gray-300/90">
            <li>INNOVIT 2026 WhatsApp Community</li>
            <li>Official website</li>
            <li>Email notifications</li>
          </ul>
          <p>Participants are strongly encouraged to join the WhatsApp group.</p>
        </div>
      )
    },
    {
      question: "Where can I register for the orientation session?",
      answer: "You can register for the orientation session through the Google Form link provided on the website and official announcements."
    }
  ];

  return (
    <div className="min-h-screen w-full pt-24 pb-12 px-4 relative overflow-hidden">

      {/* Background Elements matching site theme */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-yellow-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-amber-600/5 blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 via-yellow-400 to-amber-500 mb-4"
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-lg mx-auto"
          >
            Have questions about the hackathon? We're here to help you on your innovation journey.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 flex justify-center"
          >
            <a
              href="https://chat.whatsapp.com/KI3mnptIqiR6gTgv0grRJG"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 rounded-full font-bold text-black bg-green-500 hover:bg-green-400 transition-all shadow-lg shadow-green-500/20 flex items-center gap-2 hover:scale-105"
            >
              <MessageSquare size={18} /> Join Us
            </a>
          </motion.div>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-10">
          <div className="bg-white/5 backdrop-blur-md p-1 rounded-full border border-white/10 flex">
            <button
              onClick={() => setActiveTab('contact')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'contact'
                ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/20'
                : 'text-gray-400 hover:text-white'
                }`}
            >
              Contact Us
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'faq'
                ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/20'
                : 'text-gray-400 hover:text-white'
                }`}
            >
              FAQs
            </button>
          </div>
        </div>

        {/* Content Container */}
        <div className="grid md:grid-cols-1 gap-8">

          <AnimatePresence mode="wait">
            {activeTab === 'contact' ? (
              <motion.div
                key="contact"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="max-w-2xl mx-auto w-full"
              >
                <div className="glass-strong p-8 rounded-2xl border border-yellow-500/10 bg-[#111]/80 backdrop-blur-xl shadow-2xl">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider text-yellow-500/80 font-semibold">Name</label>
                        <input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          type="text"
                          className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 transition-all placeholder-gray-600 ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' : 'border-white/10 focus:border-yellow-500/50 focus:ring-yellow-500/50'}`}
                          placeholder="John Doe"
                        />
                        {errors.name && <p className="text-red-400 text-xs flex items-center gap-1"><AlertCircle size={12} /> {errors.name}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider text-yellow-500/80 font-semibold">Email</label>
                        <input
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          type="email"
                          className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 transition-all placeholder-gray-600 ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' : 'border-white/10 focus:border-yellow-500/50 focus:ring-yellow-500/50'}`}
                          placeholder="john@example.com"
                        />
                        {errors.email && <p className="text-red-400 text-xs flex items-center gap-1"><AlertCircle size={12} /> {errors.email}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider text-yellow-500/80 font-semibold">Subject</label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition-all [&>option]:bg-[#111] [&>option]:text-white">
                        <option value="general">General Inquiry</option>
                        <option value="sponsorship">Sponsorship</option>
                        <option value="technical">Technical Issue</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider text-yellow-500/80 font-semibold">Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 transition-all placeholder-gray-600 resize-none ${errors.message ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' : 'border-white/10 focus:border-yellow-500/50 focus:ring-yellow-500/50'}`}
                        placeholder="How can we help you?"
                      />
                      {errors.message && <p className="text-red-400 text-xs flex items-center gap-1"><AlertCircle size={12} /> {errors.message}</p>}
                    </div>

                    <button
                      disabled={formStatus === 'submitting' || formStatus === 'success'}
                      type="submit"
                      className={`w-full py-4 rounded-lg font-bold text-black transition-all transform active:scale-[0.98] flex items-center justify-center gap-2
                        ${formStatus === 'success' ? 'bg-green-500' : 'bg-gradient-to-r from-yellow-400 to-amber-500 hover:shadow-lg hover:shadow-yellow-500/20'}
                        ${(formStatus === 'submitting' || formStatus === 'success') ? 'cursor-not-allowed opacity-90' : ''}
                      `}
                    >
                      {formStatus === 'idle' && (
                        <>
                          Send Message <Send size={18} />
                        </>
                      )}
                      {formStatus === 'submitting' && (
                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      )}
                      {formStatus === 'success' && (
                        <>
                          Message Sent <CheckCircle size={18} />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="faq"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-2xl mx-auto w-full"
              >
                <div className="glass-strong p-8 rounded-2xl border border-yellow-500/10 bg-[#111]/80 backdrop-blur-xl shadow-2xl">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <MessageSquare className="text-yellow-500" size={24} />
                    Frequently Asked Questions
                  </h3>
                  <div className="space-y-2">
                    {faqs.map((faq, index) => (
                      <FAQItem
                        key={index}
                        question={faq.question}
                        answer={faq.answer}
                        isOpen={openFAQ === index}
                        onClick={() => setOpenFAQ(openFAQ === index ? -1 : index)}
                      />
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/5 text-center">
                    <p className="text-gray-400 text-sm">
                      Can't find what you're looking for?
                      <button onClick={() => setActiveTab('contact')} className="text-yellow-500 hover:text-yellow-400 ml-1 font-medium underline-offset-2 hover:underline">
                        Contact our team
                      </button>
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Contact;
