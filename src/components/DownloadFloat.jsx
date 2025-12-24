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

    const menuItems = [
        {
            icon: <FileText className="w-5 h-5" />,
            label: 'Download PPT Template',
            onClick: handlePPTDownload,
            color: 'from-blue-500 to-blue-600'
        },
        {
            icon: <CreditCard className="w-5 h-5" />,
            label: 'Download ID Card',
            onClick: handleIDCard,
            color: 'from-purple-500 to-purple-600'
        }
    ];

    return (
        <div className="fixed right-4 sm:right-6 bottom-44 sm:bottom-48 z-50">
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
                            className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap"
                        >
                            <div className="glass-strong px-4 py-2 rounded-lg border border-yellow-500/30 shadow-lg">
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
                    className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center shadow-2xl hover:shadow-yellow-500/50 transition-shadow group"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {/* Pulse animation */}
                    <span className="absolute inset-0 rounded-full bg-yellow-500 opacity-75 animate-ping"></span>

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
                                <X className="w-7 h-7 sm:w-8 sm:h-8 text-white relative z-10" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="download"
                                initial={{ rotate: 90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Download className="w-7 h-7 sm:w-8 sm:h-8 text-white relative z-10" />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Notification badge */}
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-[#0a0a0f]">
                        2
                    </span>
                </motion.button>
            </motion.div>
        </div>
    );
};

export default DownloadFloat;
