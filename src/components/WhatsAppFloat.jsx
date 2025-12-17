import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

const WhatsAppFloat = () => {
    const [showTooltip, setShowTooltip] = useState(false);

    const handleClick = () => {
        window.open('https://chat.whatsapp.com/HL1Ctn9nv0C0ny2lkQeZp0', '_blank');
    };

    return (
        <div className="fixed right-4 sm:right-6 bottom-20 sm:bottom-24 z-50">
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1, type: 'spring', stiffness: 200 }}
                className="relative"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            >
                {/* Tooltip */}
                <AnimatePresence>
                    {showTooltip && (
                        <motion.div
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 20, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap"
                        >
                            <div className="glass-strong px-4 py-2 rounded-lg border border-green-500/30 shadow-lg">
                                <p className="text-sm font-semibold text-[#fff1ce]">
                                    Join INNOVIT'26 Community
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* WhatsApp Button */}
                <motion.button
                    onClick={handleClick}
                    className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-2xl hover:shadow-green-500/50 transition-shadow group"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {/* Pulse animation */}
                    <span className="absolute inset-0 rounded-full bg-green-500 opacity-75 animate-ping"></span>

                    {/* Icon */}
                    <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 text-white relative z-10" />

                    {/* Notification badge */}
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-[#0a0a0f]">
                        !
                    </span>
                </motion.button>
            </motion.div>
        </div>
    );
};

export default WhatsAppFloat;
