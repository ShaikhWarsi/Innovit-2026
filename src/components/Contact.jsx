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

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulate submission
    setTimeout(() => {
      setFormStatus('success');
      // Reset after 3 seconds
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 1500);
  };

  const faqs = [
    {
      question: "When is the hackathon happening?",
      answer: "Innovit 2026 is scheduled for October 15-17, 2026. It will be a 36-hour continuous innovation marathon."
    },
    {
      question: "Who can participate?",
      answer: "We welcome students, professionals, and innovators from all backgrounds. Teams can consist of 2-4 members. No prior coding experience is strictly required, but it helps!"
    },
    {
      question: "Is there a registration fee?",
      answer: "No, participation in Innovit 2026 is completely free! We believe in accessing opportunity for everyone."
    },
    {
      question: "Will food and accommodation be provided?",
      answer: "Yes, we provide all meals, snacks, and drinks throughout the event. There will be designated resting areas for participants."
    },
    {
      question: "What are the prizes?",
      answer: "We have a total prize pool of $50,000 distributed across multiple tracks, plus internship opportunities with our sponsors."
    }
  ];

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] pt-24 pb-12 px-4 relative overflow-hidden">

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
                          required
                          type="text"
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition-all placeholder-gray-600"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider text-yellow-500/80 font-semibold">Email</label>
                        <input
                          required
                          type="email"
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition-all placeholder-gray-600"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider text-yellow-500/80 font-semibold">Subject</label>
                      <select className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition-all [&>option]:bg-[#111] [&>option]:text-white">
                        <option value="general">General Inquiry</option>
                        <option value="sponsorship">Sponsorship</option>
                        <option value="technical">Technical Issue</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider text-yellow-500/80 font-semibold">Message</label>
                      <textarea
                        required
                        rows={5}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition-all placeholder-gray-600 resize-none"
                        placeholder="How can we help you?"
                      />
                    </div>

                    <button
                      disabled={formStatus === 'submitting' || formStatus === 'success'}
                      type="submit"
                      className={`w-full py-4 rounded-lg font-bold text-black transition-all transform active:scale-[0.98] flex items-center justify-center gap-2
                        ${formStatus === 'success' ? 'bg-green-500' : 'bg-gradient-to-r from-yellow-400 to-amber-500 hover:shadow-lg hover:shadow-yellow-500/20'}
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
