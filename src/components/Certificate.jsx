import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Download, FileText, User, Mail, CheckCircle, Award, Search, CreditCard, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { supabase } from '../lib/supabaseClient';

const Certificate = () => {
  const navigate = useNavigate();
  const [isVerifying, setIsVerifying] = useState(false);
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    team: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleVerifyUser = async () => {
    if (!formData.email) {
      toast.error('Please enter your email address');
      return;
    }

    setIsVerifying(true);
    setUserData(null);

    try {
      const { data, error } = await supabase
        .from('id_card_users')
        .select('*')
        .eq('email_id', formData.email.toLowerCase())
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          toast.error('Email not found in our database. Please use your registered email.');
          setUserData(null);
        } else {
          toast.error('Verification failed. Please try again.');
        }
      } else {
        setUserData(data);
        setFormData(prev => ({
          ...prev,
          name: data.name || prev.name,
          team: data.team || prev.team
        }));
        toast.success('User verified! Your certificate is ready.');
      }
    } catch (err) {
      console.error('Verification error:', err);
      toast.error('An unexpected error occurred');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleDownloadCertificate = () => {
    if (!userData) {
      toast.error('Please verify your email first');
      return;
    }

    toast.loading('Generating your certificate...', { id: 'generating' });

    // Mock download logic
    setTimeout(() => {
      toast.success('Certificate downloaded successfully!', { id: 'generating' });
      // In a real implementation, this would trigger the actual generation/download
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full pt-24 pb-12 px-4 relative overflow-hidden bg-[#0a0a0f]">
      {/* Toast Container */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1a1410',
            color: '#fff1ce',
            border: '1px solid rgba(245, 188, 34, 0.3)',
          },
        }}
      />

      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-yellow-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-amber-600/5 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/')}
          className="mb-8 flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-semibold">Back to Home</span>
        </motion.button>

        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6"
          >
            <Award className="w-4 h-4 text-yellow-500" />
            <span className="text-yellow-500 text-sm font-bold tracking-wider uppercase">Official Certification</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-yellow-100 via-yellow-400 to-amber-600 mb-6 drop-shadow-sm"
          >
            Download Certificate
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed"
          >
            Validate your achievements and download your official INNOVIT 2026 participation or excellence certificates.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Left Side: Verification Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="glass-strong p-8 rounded-3xl border border-yellow-500/10 bg-[#111]/80 backdrop-blur-2xl shadow-2xl relative overflow-hidden group">
              {/* Decorative gradient corner */}
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-yellow-500/10 blur-2xl rounded-full transition-all group-hover:bg-yellow-500/20" />

              <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-yellow-500" />
                User Verification
              </h2>

              <div className="space-y-6">
                {/* Email Input */}
                <div>
                  <label className="block text-[#fff1ce] font-semibold mb-3 text-sm uppercase tracking-wider">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-yellow-400/50" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter registered email"
                      className="w-full pl-12 pr-4 py-4 bg-[#0a0a0f]/80 border border-yellow-500/20 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/10 transition-all font-medium"
                    />
                  </div>
                  <p className="mt-2 text-xs text-gray-500 ml-1">Use the email you used during registration.</p>
                </div>

                {/* Name Input */}
                <div>
                  <label className="block text-[#fff1ce] font-semibold mb-3 text-sm uppercase tracking-wider">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-yellow-400/50" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="w-full pl-12 pr-4 py-4 bg-[#0a0a0f]/80 border border-yellow-500/20 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/10 transition-all font-medium"
                    />
                  </div>
                </div>

                {/* Team Name Input */}
                <div>
                  <label className="block text-[#fff1ce] font-semibold mb-3 text-sm uppercase tracking-wider">
                    Team Name
                  </label>
                  <div className="relative">
                    <Award className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-yellow-400/50" />
                    <input
                      type="text"
                      name="team"
                      value={formData.team}
                      onChange={handleInputChange}
                      placeholder="Enter team name"
                      className="w-full pl-12 pr-4 py-4 bg-[#0a0a0f]/80 border border-yellow-500/20 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/10 transition-all font-medium"
                    />
                  </div>
                </div>

                {/* Verify Button */}
                <motion.button
                  whileHover={{ scale: 1.02, translateY: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleVerifyUser}
                  disabled={!formData.email || isVerifying}
                  className={`
                                        w-full py-4 rounded-2xl font-black text-lg
                                        transition-all duration-300 flex items-center justify-center gap-3 shadow-xl
                                        ${formData.email && !isVerifying
                      ? 'bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 text-[#0a0a0f] hover:shadow-yellow-500/30'
                      : 'bg-gray-800 text-gray-400 cursor-not-allowed opacity-50'
                    }
                                    `}
                >
                  {isVerifying ? (
                    <>
                      <div className="w-6 h-6 border-3 border-[#0a0a0f]/30 border-t-[#0a0a0f] rounded-full animate-spin" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-6 h-6" />
                      <span>Generate Preview</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>

            {/* Info Card */}
            <div className="glass-strong p-6 rounded-3xl border border-blue-500/10 bg-blue-500/5">
              <div className="flex gap-4">
                <div className="p-3 rounded-2xl bg-blue-500/10">
                  <FileText className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-blue-400 font-bold mb-1">Email Verification Required</h4>
                  <p className="text-sm text-blue-200/60 leading-relaxed">
                    You must use your registered email address to download your certificate. Manual entries are not permitted for security and authenticity.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Preview Display */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3 space-y-6"
          >
            <div className="glass-strong p-8 rounded-3xl border border-white/10 bg-[#111]/80 backdrop-blur-2xl shadow-2xl min-h-[500px] flex flex-col">
              <h2 className="text-2xl font-bold text-white mb-8">Certificate Preview</h2>

              <AnimatePresence mode="wait">
                {userData ? (
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex-1 flex flex-col"
                  >
                    {/* Premium Certificate Mockup */}
                    <div className="relative flex-1 bg-gradient-to-br from-[#1a1410] to-[#0a0a0f] rounded-2xl border-4 border-[#c5a059]/30 p-8 flex flex-col items-center justify-center text-center overflow-hidden mb-8">
                      {/* Decorative Corner Borders */}
                      <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-[#c5a059]/50" />
                      <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-[#c5a059]/50" />
                      <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-[#c5a059]/50" />
                      <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-[#c5a059]/50" />

                      {/* Watermark Logo */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                        <Award className="w-96 h-96" />
                      </div>

                      <div className="relative z-10 w-full">
                        <div className="flex justify-center mb-6">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center shadow-lg shadow-yellow-500/20">
                            <Award className="w-10 h-10 text-[#0a0a0f]" />
                          </div>
                        </div>

                        <p className="text-[#c5a059] font-black tracking-[0.3em] uppercase mb-4 text-sm">Certificate of Participation</p>

                        <h3 className="text-lg text-gray-400 font-medium mb-2">This is to certify that</h3>

                        <h2 className="text-3xl md:text-5xl font-black text-white mb-6 font-serif">
                          {userData.name}
                        </h2>

                        <p className="text-gray-400 max-w-md mx-auto leading-relaxed mb-8">
                          of team <span className="text-yellow-400 font-bold">{userData.team || 'Creative Squad'}</span> has successfully participated in
                          <span className="text-white font-bold italic"> INNOVIT 2026 Hackathon</span>, showcasing exceptional innovation and technical skills.
                        </p>

                        <div className="grid grid-cols-2 gap-12 pt-8 border-t border-white/5 w-full max-w-lg mx-auto">
                          <div className="text-center">
                            <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#c5a059]/50 to-transparent mb-2" />
                            <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Organizing Chair</p>
                          </div>
                          <div className="text-center">
                            <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#c5a059]/50 to-transparent mb-2" />
                            <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Co-Organizer</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleDownloadCertificate}
                        className="flex-1 bg-white text-black py-4 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl hover:shadow-white/10 transition-all"
                      >
                        <Download className="w-5 h-5" />
                        Download PDF
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all"
                      >
                        <FileText className="w-5 h-5" />
                        Share Certificate
                      </motion.button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 flex flex-col items-center justify-center text-center p-12"
                  >
                    <div className="w-24 h-24 rounded-full bg-yellow-500/5 flex items-center justify-center mb-6 relative">
                      <div className="absolute inset-0 bg-yellow-500/10 rounded-full animate-pulse" />
                      <Search className="w-10 h-10 text-yellow-500/30" />
                    </div>
                    <h3 className="text-xl font-bold text-[#fff1ce] mb-2">No Certificate Selected</h3>
                    <p className="text-gray-500 max-w-xs leading-relaxed">
                      Please enter and verify your registered email address to unlock your certificates.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
