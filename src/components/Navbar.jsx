import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const isHome = location.pathname === '/';

    const getLink = (hash) => {
        return isHome ? hash : `/${hash}`;
    };

    return (
        <motion.nav
            className="absolute top-2 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-6xl px-4"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
        >
            <div className="glass-strong px-6 py-3 rounded-full flex items-center justify-between backdrop-blur-xl border border-yellow-500/20 shadow-lg shadow-yellow-500/10">
                {/* Logo Section */}
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center">
                        <span className="text-black font-bold text-base">I</span>
                    </div>
                    <span className="text-lg font-bold gradient-text">INNOVIT</span>
                </Link>

                {/* Navigation Links - Centered */}
                <div className="flex items-center gap-8">
                    <a
                        href={getLink('#home')}
                        className="text-sm font-medium text-[#fff1ce] hover:text-yellow-400 transition-colors duration-200"
                    >
                        Home
                    </a>
                    <a
                        href={getLink('#timeline')}
                        className="text-sm font-medium text-[#fff1ce] hover:text-yellow-400 transition-colors duration-200"
                    >
                        Timeline
                    </a>
                    <a
                        href={getLink('#rounds')}
                        className="text-sm font-medium text-[#fff1ce] hover:text-yellow-400 transition-colors duration-200"
                    >
                        Rounds
                    </a>
                    <a
                        href={getLink('#prizes')}
                        className="text-sm font-medium text-[#fff1ce] hover:text-yellow-400 transition-colors duration-200"
                    >
                        Prizes
                    </a>
                    <a
                        href={getLink('#mentoring')}
                        className="text-sm font-medium text-[#fff1ce] hover:text-yellow-400 transition-colors duration-200"
                    >
                        Mentoring
                    </a>
                    <Link
                        to="/contact"
                        className="text-sm font-medium text-[#fff1ce] hover:text-yellow-400 transition-colors duration-200"
                    >
                        Contact & FAQs
                    </Link>
                </div>

                {/* Right side - empty for balance */}
                <div className="w-24"></div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
