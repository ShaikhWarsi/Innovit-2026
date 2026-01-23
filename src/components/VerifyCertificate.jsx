import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShieldCheck, AlertCircle, CheckCircle, ArrowLeft, Loader2, Award } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import toast, { Toaster } from 'react-hot-toast';

const VerifyCertificate = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [certificateId, setCertificateId] = useState(searchParams.get('id') || '');
    const [isVerifying, setIsVerifying] = useState(false);
    const [verificationResult, setVerificationResult] = useState(null);
    const [error, setError] = useState(null);

    // Auto-verify if ID is in URL
    React.useEffect(() => {
        const idFromUrl = searchParams.get('id');
        if (idFromUrl) {
            handleVerify(idFromUrl);
        }
    }, []);

    const handleVerify = async (idToVerify = certificateId) => {
        if (!idToVerify.trim()) {
            toast.error('Please enter a Certificate ID');
            return;
        }

        setIsVerifying(true);
        setVerificationResult(null);
        setError(null);

        try {
            const { data, error } = await supabase
                .from('id_card_users')
                .select('*')
                .eq('certificate_hash_id', idToVerify.trim())
                .maybeSingle();

            if (error) throw error;

            if (data) {
                setVerificationResult(data);
                toast.success('Certificate Verified Successfully!');
            } else {
                setError('Certificate invalid or not found.');
                toast.error('Certificate not found');
            }
        } catch (err) {
            console.error('Verification failed:', err);
            setError('An error occurred during verification. Please try again.');
        } finally {
            setIsVerifying(false);
        }
    };

    return (
        <div className="min-h-screen w-full pt-24 pb-12 px-4 relative overflow-hidden bg-[#0a0a0f]">
            <Toaster position="top-center" />

            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/5 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[100px] pointer-events-none" />

            <div className="max-w-3xl mx-auto relative z-10">
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate('/')}
                    className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back to Home</span>
                </motion.button>

                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-6"
                    >
                        <ShieldCheck className="w-4 h-4 text-green-500" />
                        <span className="text-green-500 text-sm font-bold tracking-wider uppercase">Official Verification</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-black text-white mb-6"
                    >
                        Verify Certificate
                    </motion.h1>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="glass-strong p-8 rounded-3xl border border-white/10 bg-[#111]/80 backdrop-blur-xl shadow-2xl"
                >
                    <div className="flex flex-col md:flex-row gap-4 mb-8">
                        <div className="relative flex-1">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                                <Search className="w-5 h-5" />
                            </div>
                            <input
                                type="text"
                                value={certificateId}
                                onChange={(e) => setCertificateId(e.target.value)}
                                placeholder="Enter Certificate ID"
                                className="w-full pl-12 pr-4 py-4 bg-[#0a0a0f]/80 border border-white/10 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-all font-mono"
                            />
                        </div>
                        <button
                            onClick={() => handleVerify()}
                            disabled={!certificateId || isVerifying}
                            className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-2xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[140px]"
                        >
                            {isVerifying ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Verify'}
                        </button>
                    </div>

                    <AnimatePresence mode="wait">
                        {verificationResult && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="bg-green-500/5 border border-green-500/20 rounded-2xl p-6 md:p-8"
                            >
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="p-3 bg-green-500/20 rounded-xl">
                                        <CheckCircle className="w-8 h-8 text-green-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-1">Valid Certificate</h3>
                                        <p className="text-green-400/80 text-sm">This certificate is authentic and issued by INNOVIT 2026.</p>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-xs uppercase tracking-wider text-gray-500 font-semibold block mb-2">Issued To</label>
                                        <p className="text-lg text-white font-medium">{verificationResult.name}</p>
                                    </div>
                                    <div>
                                        <label className="text-xs uppercase tracking-wider text-gray-500 font-semibold block mb-2">Team</label>
                                        <p className="text-lg text-white font-medium">{verificationResult.team}</p>
                                    </div>
                                    {/* Since themes are not in Supabase user table directly but derived or potentialy saved, 
                      we might not display Theme unless we save it or re-derive it. 
                      However, the certificate issuance saves the hash. 
                      If theme is not in user table, we might skip it or re-calculate it if we had the logic here.
                      For now, showing Name and Team is primary verification.
                  */}
                                    <div className="md:col-span-2">
                                        <label className="text-xs uppercase tracking-wider text-gray-500 font-semibold block mb-2">Certificate ID</label>
                                        <p className="font-mono text-green-400 bg-green-500/10 inline-block px-3 py-1 rounded-lg border border-green-500/20">
                                            {verificationResult.certificate_hash_id}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6 flex items-center gap-4"
                            >
                                <AlertCircle className="w-8 h-8 text-red-500" />
                                <div>
                                    <h3 className="text-lg font-bold text-red-400">Verification Failed</h3>
                                    <p className="text-red-400/80 text-sm">{error}</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
};

export default VerifyCertificate;
