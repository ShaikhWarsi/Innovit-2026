import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Download, CheckCircle, AlertCircle, Loader2, ArrowLeft } from 'lucide-react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import Papa from 'papaparse';
import jsPDF from 'jspdf';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import Reveal from './Reveal';

const Certificate = () => {
    const [formData, setFormData] = useState({
        name: '',
        teamName: '',
        email: ''
    });

    const [isVerifying, setIsVerifying] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [results, setResults] = useState({});
    const [verifiedUser, setVerifiedUser] = useState(null);
    const [verifiedTheme, setVerifiedTheme] = useState(null);
    const [isLoadingSupabase, setIsLoadingSupabase] = useState(true);

    const themes = [
        { id: 'TH01', name: 'Open Innovation', color: '#FF9933' },
        { id: 'TH02', name: 'Heritage & Culture', color: '#FFFFFF' },
        { id: 'TH03', name: 'MedTech / BioTech / HealthTech', color: '#138808' },
        { id: 'TH04', name: 'Agriculture, FoodTech & Rural Development', color: '#FF9933' },
        { id: 'TH05', name: 'Blockchain & Cybersecurity', color: '#1E3A8A' }
    ];

    const fetchSupabaseData = async () => {
        try {
            setIsLoadingSupabase(true);
            // Table name is 'id_card_users' as confirmed by fetch script
            const { data, error } = await supabase
                .from('id_card_users')
                .select('*');

            if (error) throw error;
            console.log('Supabase data loaded:', data?.length, 'records');
            if (data && data.length > 0) {
                console.log('--- DEBUG: AVAILABLE EMAILS IN SUPABASE ---');
                console.table(data.slice(0, 10).map(p => ({ 
                    Email: p.email_id || p.Email, 
                    Team: p.team || p['Team Name'] 
                })));
                console.log('-------------------------------------------');
            }
        } catch (error) {
            console.error('Error fetching from Supabase:', error);
        } finally {
            setIsLoadingSupabase(false);
        }
    };

    // Load results from all 5 theme CSV files
    useEffect(() => {
        fetchSupabaseData();
        const loadAllResults = async () => {
            console.log('Starting to load CSV results...');
            const resultsData = {};
            
            for (const theme of themes) {
                try {
                    const response = await fetch(`/Result-Phase-1/${theme.id}.csv`);
                    if (!response.ok) throw new Error(`Failed to fetch ${theme.id}.csv`);
                    const csvText = await response.text();
                    
                    const result = Papa.parse(csvText, { header: true, skipEmptyLines: true });
                    
                    // We don't need to merge with emails here anymore
                    // because we are verifying emails via Supabase now.
                    // We just need the Name/Team Name from the CSVs to match themes.
                    resultsData[theme.id] = result.data;
                    console.log(`Loaded ${theme.id}: ${result.data.length} records`);
                } catch (error) {
                    console.error(`Error loading ${theme.id}:`, error);
                    resultsData[theme.id] = [];
                }
            }
            
            setResults(resultsData);
            console.log('All CSV data loaded. Ready for verification.');
        };

        loadAllResults();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleVerify = async (e) => {
        if (e) e.preventDefault();
        console.log('handleVerify called with:', { email: formData.email, name: formData.name });
        
        if (!formData.email) {
            toast.error('Please enter your registered email address');
            return;
        }

        // Check if CSV data is loaded
        if (Object.keys(results).length === 0) {
            toast.error('System is still loading data. Please wait a moment...');
            return;
        }

        setIsVerifying(true);
        
        try {
            // 1. Verify Email from Supabase and get Name and Team Name
            // Table name is 'id_card_users'
            const { data: sbUser, error } = await supabase
                .from('id_card_users')
                .select('email_id, name, team')
                .ilike('email_id', formData.email.trim())
                .maybeSingle();

            if (error) {
                console.error('Supabase error:', error);
            }

            let userData = sbUser;
            
            if (!userData || !userData.team) {
                toast.error('Email or Team not found in our records.');
                setIsVerifying(false);
                return;
            }

            const teamNameFromSupabase = userData.team.trim();
            const userNameFromSupabase = userData.name || formData.name;
            
            console.log('User found:', { userNameFromSupabase, teamNameFromSupabase });

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

            // Fallback: If team name search failed, try searching for the user's name (in case they are the leader)
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
                console.log('Theme match found!', { foundInCSV, foundTheme, teamNameFromSupabase });
                setVerifiedUser({
                    ...foundInCSV,
                    'Team Name': teamNameFromSupabase, // Use exact team name from Supabase
                    'Name': userNameFromSupabase // Use exact name from Supabase
                });
                setVerifiedTheme(foundTheme);
                setIsVerified(true);
                
                // Update form data with fetched info
                setFormData(prev => ({
                    ...prev,
                    name: userNameFromSupabase,
                    teamName: teamNameFromSupabase
                }));
                
                toast.success(`Verified! Theme: ${foundTheme.name}`);
            } else {
                console.log('Team/Name not found in any theme records:', { searchTeamName, userNameFromSupabase });
                toast.error('Your team was not found in any theme records. Please contact support.');
            }
        } catch (err) {
            console.error('Verification error:', err);
            toast.error('An error occurred during verification. Please try again.');
        } finally {
            setIsVerifying(false);
        }
    };

    const generateCertificate = async () => {
        setIsGenerating(true);
        try {
            // Fetch the PDF template
            const templateUrl = '/phase-1-innovit_certitcate (1).pdf';
            const templateBytes = await fetch(templateUrl).then(res => {
                if (!res.ok) throw new Error('Failed to download template');
                return res.arrayBuffer();
            });

            // Load the PDF document
            const pdfDoc = await PDFDocument.load(templateBytes);
            const pages = pdfDoc.getPages();
            const firstPage = pages[0];
            const { width, height } = firstPage.getSize();
            console.log('PDF Dimensions:', width, 'x', height);

            // Embed fonts (Times New Roman)
            const fontBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
            const fontRegular = await pdfDoc.embedFont(StandardFonts.TimesRoman);

            // Coordinates calculation for the provided template
            // The template seems to have name field around Y=500 (middle)
            // pdf-lib uses bottom-left origin
            
            // Name & Team: Combined on the first blank line
            const formatToTitleCase = (str) => {
                if (!str) return '';
                return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            };
            
            const displayName = formatToTitleCase(formData.name);
            const displayTeam = formatToTitleCase(formData.teamName);
            const combinedNameTeam = `${displayName} | Team: ${displayTeam}`;
            
            const nameFontSize = 24; // Slightly smaller to fit both on one line
            const nameWidth = fontBold.widthOfTextAtSize(combinedNameTeam, nameFontSize);
            
            firstPage.drawText(combinedNameTeam, {
                x: width / 2 - nameWidth / 2 + 85, 
                y: height - 262,                  
                size: nameFontSize,
                font: fontBold,
                color: rgb(0, 0, 0), // #FF8A2E
            });

            // Theme: On the second line
            const themeText = `${verifiedTheme.id} : ${verifiedTheme.name}`;
            const themeFontSize = 22; // Increased from 18 to 20
            const themeWidth = fontRegular.widthOfTextAtSize(themeText, themeFontSize);
            firstPage.drawText(themeText, {
                x: width / 2 - themeWidth / 2 + 85, 
                y: height - 377, 
                size: themeFontSize,
                font: fontRegular,
                color: rgb(0.12, 0.16, 0.22), // #1F2937
            });

            // Date: SUPPLEMENTARY (The template already has a date line, but we can add ours if needed)
            const today = new Date().toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
            const dateFontSize = 12;
            const dateWidth = fontRegular.widthOfTextAtSize(today, dateFontSize);
            firstPage.drawText(today, {
                x: 180, // Near pre-printed "Date: 18/01/2026"
                y: height - 718, 
                size: dateFontSize,
                font: fontRegular,
                color: rgb(0.12, 0.16, 0.22),
            });

            // Serialize the PDFDocument to bytes (a Uint8Array)
            const pdfBytes = await pdfDoc.save();

            // Create a blob and download
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `Certificate_${formData.name.replace(/\s+/g, '_')}.pdf`;
            link.click();
            
            toast.success('Certificate generated successfully!');
        } catch (error) {
            console.error('Error generating certificate:', error);
            toast.error('Failed to generate certificate: ' + error.message);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 relative overflow-hidden">
            {/* Background elements to match site theme */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-yellow-500/5 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-amber-600/5 blur-[100px] pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">
                <Link 
                    to="/" 
                    className="inline-flex items-center gap-2 text-yellow-400/70 hover:text-yellow-400 transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Link>

                <Reveal>
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-4">
                            Participation Certificate
                        </h1>
                        <p className="text-[#fbe9bb] text-lg max-w-2xl mx-auto">
                            Enter your details as registered to verify and download your INNOVIT 2026 participation certificate.
                        </p>
                    </div>
                </Reveal>

                <div className="grid md:grid-cols-2 gap-8 items-start">
                    {/* Form Section */}
                    <Reveal delay={0.2}>
                        <div className="glass-strong p-8 rounded-3xl border border-yellow-500/20 shadow-2xl shadow-yellow-500/5">
                            <form onSubmit={handleVerify} className="space-y-6">
                                {!isVerified && (
                                    <div>
                                        <label className="block text-[#fff1ce] font-semibold mb-2">Email Address</label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-yellow-400/50" />
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                placeholder="Enter registered email"
                                                className="w-full pl-12 pr-4 py-3 bg-[#0a0a0f]/50 border border-yellow-500/20 rounded-xl text-[#fff1ce] focus:outline-none focus:border-yellow-400/50 transition-all"
                                            />
                                        </div>
                                    </div>
                                )}

                                {isVerified && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="space-y-4"
                                    >
                                        <div>
                                            <label className="block text-[#fff1ce]/50 text-sm mb-1">Full Name</label>
                                            <div className="relative">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-yellow-400/30" />
                                                <input
                                                    type="text"
                                                    value={formData.name}
                                                    disabled
                                                    className="w-full pl-12 pr-4 py-3 bg-[#0a0a0f]/30 border border-yellow-500/10 rounded-xl text-[#fff1ce]/70 cursor-not-allowed"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-[#fff1ce]/50 text-sm mb-1">Team Name</label>
                                            <div className="relative">
                                                <CheckCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-yellow-400/30" />
                                                <input
                                                    type="text"
                                                    value={formData.teamName}
                                                    disabled
                                                    className="w-full pl-12 pr-4 py-3 bg-[#0a0a0f]/30 border border-yellow-500/10 rounded-xl text-[#fff1ce]/70 cursor-not-allowed"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-[#fff1ce]/50 text-sm mb-1">Theme</label>
                                            <div className="relative text-yellow-400/90 font-semibold px-4 py-2 bg-yellow-500/5 rounded-lg border border-yellow-500/10">
                                                {verifiedTheme?.name}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {!isVerified ? (
                                    <button
                                        type="submit"
                                        disabled={isVerifying}
                                        className="w-full py-4 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-xl text-black font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform disabled:opacity-50"
                                    >
                                        {isVerifying ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Verifying Details...
                                            </>
                                        ) : (
                                            'Verify Details'
                                        )}
                                    </button>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center gap-3 text-green-400">
                                            <CheckCircle className="w-5 h-5" />
                                            <span>Details verified successfully!</span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={generateCertificate}
                                            disabled={isGenerating}
                                            className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-black font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
                                        >
                                            {isGenerating ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    Generating PDF...
                                                </>
                                            ) : (
                                                <>
                                                    <Download className="w-5 h-5" />
                                                    Download Certificate
                                                </>
                                            )}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setIsVerified(false)}
                                            className="w-full text-yellow-400/70 hover:text-yellow-400 text-sm transition-colors"
                                        >
                                            Use different details
                                        </button>
                                    </div>
                                )}
                            </form>
                        </div>
                    </Reveal>

                    {/* Preview/Info Section */}
                    <Reveal delay={0.4}>
                        <div className="space-y-6">
                            <div className="glass-strong p-8 rounded-3xl border border-yellow-500/10 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-yellow-500/10 transition-colors" />
                                
                                <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
                                    <AlertCircle className="w-5 h-5" />
                                    Instructions
                                </h3>
                                <ul className="space-y-4 text-[#fbe9bb]/80 text-sm">
                                    <li className="flex gap-3">
                                        <span className="w-6 h-6 rounded-full bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center flex-shrink-0 text-yellow-400">1</span>
                                        <span>Enter your registered email address to verify your participation.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="w-6 h-6 rounded-full bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center flex-shrink-0 text-yellow-400">2</span>
                                        <span>Your email will be cross-checked with the official INNOVIT 2026 participant records across all themes.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="w-6 h-6 rounded-full bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center flex-shrink-0 text-yellow-400">3</span>
                                        <span>Once verified, you can download your certificate with your registered team and theme details.</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="glass-strong p-4 rounded-3xl border border-yellow-500/10 aspect-[1.414/1] flex items-center justify-center relative group overflow-hidden">
                                <div className="absolute inset-0 bg-white/5" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-10">
                                    <div className="w-16 h-16 rounded-full bg-yellow-500/10 flex items-center justify-center mb-4">
                                        <Download className="w-8 h-8 text-yellow-400" />
                                    </div>
                                    <p className="text-yellow-400 font-bold text-lg">Official Certificate Template</p>
                                    <p className="text-[#fbe9bb]/60 text-sm mt-2 max-w-[200px]">
                                        Your details will be printed on the official INNOVIT 2026 Phase-1 design
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </div>
    );
};

export default Certificate;
