import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, FileText, CreditCard, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DownloadFloat = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const navigate = useNavigate();

    const handlePPTDownload = () => {
        // Download PPT template from public folder
        const link = document.createElement('a');
        link.href = '/Innovit-TeamName.pptx';
        link.download = 'Innovit-TeamName.pptx';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setShowMenu(false);
    };

    const handleIDCard = () => {
        navigate('/id-card');
        setShowMenu(false);
    };

    const handlePhase2Guidelines = () => {
        // Download Phase 2 Guidelines PDF from public folder
        const link = document.createElement('a');
        link.href = '/INNOVIT_PHASE2-Guidelines.pdf';
        link.download = 'INNOVIT_PHASE2-Guidelines.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setShowMenu(false);
    };

    const menuItems = [
        {
            icon: <FileText className="w-5 h-5" />,
            label: 'Download PPT Template',
            onClick: handlePPTDownload,
            color: 'from-blue-500 to-blue-600'
        },
        {
            icon: <FileText className="w-5 h-5" />,
            label: 'Phase 2 Guidelines',
            onClick: handlePhase2Guidelines,
            color: 'from-green-500 to-green-600'
        },
        {
            icon: <CreditCard className="w-5 h-5" />,
            label: 'Download ID Card',
            onClick: handleIDCard,
            color: 'from-purple-500 to-purple-600'
        }
    ];

    return (
        <div className="fixed z-50 right-4 sm:right-6 bottom-44 sm:bottom-48">
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.2, type: 'spring', stiffness: 200 }}
                className="relative"
            >
                {/* Menu Items */}
                <AnimatePresence>
                    {showMenu && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.2 }}
                            className="absolute bottom-full mb-3 right-0 flex flex-col gap-2 min-w-[200px]"
                        >
                            {menuItems.map((item, index) => (
                                <motion.button
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={item.onClick}
                                    className={`glass-strong px-4 py-3 rounded-lg border border-yellow-500/30 shadow-lg hover:shadow-xl transition-all flex items-center gap-3 group`}
                                    whileHover={{ scale: 1.05, x: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <div className={`p-2 rounded-lg bg-gradient-to-br ${item.color}`}>
                                        {item.icon}
                                    </div>
                                    <span className="text-sm font-semibold text-[#fff1ce] group-hover:text-yellow-400 transition-colors">
                                        {item.label}
                                    </span>
                                </motion.button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Tooltip */}
                <AnimatePresence>
                    {showTooltip && !showMenu && (
                        <motion.div
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 20, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute mr-3 -translate-y-1/2 right-full top-1/2 whitespace-nowrap"
                        >
                            <div className="px-4 py-2 border rounded-lg shadow-lg glass-strong border-yellow-500/30">
                                <p className="text-sm font-semibold text-[#fff1ce]">
                                    Download Resources
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Download Button */}
                <motion.button
                    onClick={() => setShowMenu(!showMenu)}
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    className="relative flex items-center justify-center transition-shadow rounded-full shadow-2xl w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-yellow-500 to-amber-600 hover:shadow-yellow-500/50 group"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {/* Pulse animation */}
                    <span className="absolute inset-0 bg-yellow-500 rounded-full opacity-75 animate-ping"></span>

                    {/* Icon */}
                    <AnimatePresence mode="wait">
                        {showMenu ? (
                            <motion.div
                                key="close"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <X className="relative z-10 text-white w-7 h-7 sm:w-8 sm:h-8" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="download"
                                initial={{ rotate: 90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Download className="relative z-10 text-white w-7 h-7 sm:w-8 sm:h-8" />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Notification badge */}
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-[#0a0a0f]">
                        3
                    </span>
                </motion.button>
            </motion.div>
        </div>
    );
};

export default DownloadFloat;
