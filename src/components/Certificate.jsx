import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Download, FileText, User, Mail, CheckCircle, Award, Search, ShieldCheck, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { supabase } from '../lib/supabaseClient';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import Papa from 'papaparse';

const themes = [
  { id: 'TH01', name: 'Open Innovation', color: '#FF9933' },
  { id: 'TH02', name: 'Heritage & Culture', color: '#FFFFFF' },
  { id: 'TH03', name: 'MedTech / BioTech / HealthTech', color: '#138808' },
  { id: 'TH04', name: 'Agriculture, FoodTech & Rural Development', color: '#FF9933' },
  { id: 'TH05', name: 'Blockchain & Cybersecurity', color: '#1E3A8A' }
];

const Certificate = () => {
  const navigate = useNavigate();
  const [isVerifying, setIsVerifying] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [userData, setUserData] = useState(null);
  const [verifiedTheme, setVerifiedTheme] = useState(null);
  const [results, setResults] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    team: ''
  });
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState(null);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);

  // Load results from all 5 theme CSV files
  useEffect(() => {
    const loadAllResults = async () => {
      const resultsData = {};
      
      for (const theme of themes) {
        try {
          const response = await fetch(`/Result-Phase-1/${theme.id}.csv`);
          if (!response.ok) throw new Error(`Failed to fetch ${theme.id}.csv`);
          const csvText = await response.text();
          
          const result = Papa.parse(csvText, { header: true, skipEmptyLines: true });
          resultsData[theme.id] = result.data;
        } catch (error) {
          console.error(`Error loading ${theme.id}:`, error);
          resultsData[theme.id] = [];
        }
      }
      
      setResults(resultsData);
    };

    loadAllResults();
  }, []);

  // Clean up PDF preview URL on unmount or change
  useEffect(() => {
    return () => {
      if (pdfPreviewUrl) {
        URL.revokeObjectURL(pdfPreviewUrl);
      }
    };
  }, [pdfPreviewUrl]);

  const updatePdfPreview = async (data, theme) => {
    setIsPreviewLoading(true);
    try {
      if (pdfPreviewUrl) {
        URL.revokeObjectURL(pdfPreviewUrl);
      }
      const blob = await generateCertificateBlob(data, theme);
      const url = URL.createObjectURL(blob);
      setPdfPreviewUrl(url);
    } catch (error) {
      console.error('Preview generation failed', error);
    } finally {
      setIsPreviewLoading(false);
    }
  };

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

    // Check if CSV data is loaded
    if (Object.keys(results).length === 0) {
      toast.error('System is still loading data. Please wait a moment...');
      return;
    }

    setIsVerifying(true);
    setUserData(null);
    setVerifiedTheme(null);
    if (pdfPreviewUrl) {
      URL.revokeObjectURL(pdfPreviewUrl);
      setPdfPreviewUrl(null);
    }

    try {
      // 1. Verify Email from Supabase
      const { data: sbUser, error } = await supabase
        .from('id_card_users')
        .select('*')
        .eq('email_id', formData.email.toLowerCase().trim())
        .maybeSingle();

      if (error) {
        toast.error('Verification failed. Please try again.');
        console.error('Supabase error:', error);
        return;
      }

      if (!sbUser) {
        toast.error('Email not found in our database. Please use your registered email.');
        return;
      }

      const teamNameFromSupabase = sbUser.team || '';
      const userNameFromSupabase = sbUser.name || '';
      
      // 2. Search for Team Name in theme CSVs to get Theme ID
      let foundTheme = null;
      let foundInCSV = null;
      const searchTeamName = teamNameFromSupabase.toLowerCase().trim();
      
      for (const theme of themes) {
        const data = results[theme.id] || [];
        const teamMatch = data.find(p => {
          const csvTeamName = (p['Team Name'] || '').toLowerCase().trim();
          return csvTeamName === searchTeamName;
        });

        if (teamMatch) {
          foundTheme = theme;
          foundInCSV = teamMatch;
          break;
        }
      }

      // Fallback: Try searching for the user's name
      if (!foundTheme) {
        const searchName = userNameFromSupabase.toLowerCase().trim();
        for (const theme of themes) {
          const data = results[theme.id] || [];
          const nameMatch = data.find(p => {
            const csvName = (p['Team Leader Name'] || p['Name'] || '').toLowerCase().trim();
            return csvName === searchName;
          });

          if (nameMatch) {
            foundTheme = theme;
            foundInCSV = nameMatch;
            break;
          }
        }
      }

      if (foundTheme) {
        const finalUserData = {
          ...sbUser,
          csvData: foundInCSV
        };
        setUserData(finalUserData);
        setVerifiedTheme(foundTheme);
        setFormData(prev => ({
          ...prev,
          name: userNameFromSupabase,
          team: teamNameFromSupabase
        }));
        toast.success(`Verified! Your certificate for ${foundTheme.name} is ready.`);
        
        // Generate PDF preview
        await updatePdfPreview(finalUserData, foundTheme);
      } else {
        toast.error('Your team was not found in any theme records. Please contact support.');
      }
    } catch (err) {
      console.error('Verification error:', err);
      toast.error('An unexpected error occurred');
    } finally {
      setIsVerifying(false);
    }
  };


  const generateCertificateBlob = async (userData, verifiedTheme) => {
    // Fetch the PDF template
    const templateUrl = '/phase-1-innovit_certitcate (1).pdf';
    const response = await fetch(templateUrl);
    if (!response.ok) throw new Error('Failed to download template');
    const templateBytes = await response.arrayBuffer();

    // Load the PDF document
    const pdfDoc = await PDFDocument.load(templateBytes);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { width, height } = firstPage.getSize();

    // Embed fonts
    const fontBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
    const fontRegular = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    const formatToTitleCase = (str) => {
      if (!str) return '';
      return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };
    
    const displayName = formatToTitleCase(userData.name);
    const displayTeam = formatToTitleCase(userData.team);
    const combinedNameTeam = `${displayName} | Team: ${displayTeam}`;
    
    const nameFontSize = 24;
    const nameWidth = fontBold.widthOfTextAtSize(combinedNameTeam, nameFontSize);
    
    // Draw Name & Team
    firstPage.drawText(combinedNameTeam, {
      x: width / 2 - nameWidth / 2 + 85, 
      y: height - 262,                  
      size: nameFontSize,
      font: fontBold,
      color: rgb(0, 0, 0),
    });

    // Draw Theme
    const themeText = `${verifiedTheme.id} : ${verifiedTheme.name}`;
    const themeFontSize = 22;
    const themeWidth = fontRegular.widthOfTextAtSize(themeText, themeFontSize);
    firstPage.drawText(themeText, {
      x: width / 2 - themeWidth / 2 + 85, 
      y: height - 377, 
      size: themeFontSize,
      font: fontRegular,
      color: rgb(0.12, 0.16, 0.22),
    });

    // Draw Date
    const today = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    const dateFontSize = 12;
    firstPage.drawText(today, {
      x: 180, 
      y: height - 718, 
      size: dateFontSize,
      font: fontRegular,
      color: rgb(0.12, 0.16, 0.22),
    });

    // Save and return blob
    const pdfBytes = await pdfDoc.save();
    return new Blob([pdfBytes], { type: 'application/pdf' });
  };

  const handleDownloadCertificate = async () => {
    if (!userData || !verifiedTheme) {
      toast.error('Please verify your email first');
      return;
    }

    setIsGenerating(true);
    const toastId = toast.loading('Downloading your certificate...');

    try {
      let blob;
      if (pdfPreviewUrl) {
        // Reuse the blob from preview if available
        const response = await fetch(pdfPreviewUrl);
        blob = await response.blob();
      } else {
        blob = await generateCertificateBlob(userData, verifiedTheme);
      }

      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `Certificate_${userData.name.replace(/\s+/g, '_')}.pdf`;
      link.click();
      
      toast.success('Certificate downloaded successfully!', { id: toastId });
    } catch (error) {
      console.error('Error generating certificate:', error);
      toast.error('Failed to generate certificate: ' + error.message, { id: toastId });
    } finally {
      setIsGenerating(false);
    }
  };


  return (
    <div className="min-h-screen w-full pt-24 pb-12 px-4 relative overflow-hidden bg-[#0a0a0f]">
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
            Validate your achievements and download your official INNOVIT 2026 participation certificates.
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
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-yellow-500/10 blur-2xl rounded-full transition-all group-hover:bg-yellow-500/20" />

              <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-yellow-500" />
                User Verification
              </h2>

              <div className="space-y-6">
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

                {!userData && (
                  <>
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
                          placeholder="Enter your name"
                          className="w-full pl-12 pr-4 py-4 bg-[#0a0a0f]/80 border border-yellow-500/20 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/10 transition-all font-medium"
                        />
                      </div>
                    </div>

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
                  </>
                )}

                {userData && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-[#fff1ce] font-semibold mb-3 text-sm uppercase tracking-wider">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-yellow-400/50" />
                        <input
                          type="text"
                          value={formData.name}
                          readOnly
                          className="w-full pl-12 pr-4 py-4 bg-[#0a0a0f]/40 border border-yellow-500/10 rounded-2xl text-gray-400 cursor-not-allowed font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[#fff1ce] font-semibold mb-3 text-sm uppercase tracking-wider">
                        Team Name
                      </label>
                      <div className="relative">
                        <Award className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-yellow-400/50" />
                        <input
                          type="text"
                          value={formData.team}
                          readOnly
                          className="w-full pl-12 pr-4 py-4 bg-[#0a0a0f]/40 border border-yellow-500/10 rounded-2xl text-gray-400 cursor-not-allowed font-medium"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

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
                      <Loader2 className="w-6 h-6 animate-spin" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-6 h-6" />
                      <span>{userData ? 'Re-verify' : 'Verify & Preview'}</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>

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
                {isPreviewLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 flex flex-col items-center justify-center text-center p-12"
                  >
                    <div className="w-20 h-20 rounded-2xl bg-yellow-500/10 flex items-center justify-center mb-6 relative">
                      <Loader2 className="w-10 h-10 text-yellow-500 animate-spin" />
                    </div>
                    <h3 className="text-xl font-bold text-[#fff1ce] mb-2">Generating Actual PDF</h3>
                    <p className="text-gray-500 max-w-xs leading-relaxed">
                      Preparing your official certificate preview using the high-resolution template...
                    </p>
                  </motion.div>
                ) : userData && verifiedTheme && pdfPreviewUrl ? (
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex-1 flex flex-col"
                  >
                    <div className="relative w-full aspect-[1.414/1] bg-[#1a1a1a] rounded-2xl border border-white/10 overflow-hidden mb-8 shadow-2xl">
                      <iframe
                        src={`${pdfPreviewUrl}#toolbar=0&navpanes=0&scrollbar=0&view=Fit`}
                        className="absolute inset-0 w-full h-full border-none"
                        title="Certificate PDF Preview"
                      />
                      
                      {/* Decorative border overlay */}
                      <div className="absolute inset-0 pointer-events-none border-2 border-yellow-500/20 rounded-2xl" />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleDownloadCertificate}
                        disabled={isGenerating}
                        className="flex-1 bg-gradient-to-r from-yellow-500 to-amber-600 text-[#0a0a0f] py-4 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl hover:shadow-yellow-500/20 transition-all disabled:opacity-50"
                      >
                        {isGenerating ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Generating...</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-5 h-5" />
                            <span>Download High-Res PDF</span>
                          </>
                        )}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 bg-white/5 border border-white/10 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all hover:bg-white/10"
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
