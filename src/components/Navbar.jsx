import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useIsMobile } from '../hooks/useIsMobile';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const isMobile = useIsMobile();
    const isHome = location.pathname === '/';

    const getLink = (hash) => {
        return isHome ? hash : `/${hash}`;
    };

    const handleRegister = () => {
        window.open('https://forms.gle/vbYnvFGaUz3AU1nJA', '_blank');
        setIsMenuOpen(false);
    };

    const navLinks = [
        { href: '#home', label: 'Home', isHash: true },
        { href: '#timeline', label: 'Timeline', isHash: true },
        { href: '#prizes', label: 'Prizes', isHash: true },
        { href: '/guidelines', label: 'Guidelines', isHash: false },
        { href: '/problem-statement', label: 'Problem Statement', isHash: false },
        { href: '/contact', label: 'Contact & FAQs', isHash: false }
    ];

    return (
        <>
            <motion.nav
                className="absolute top-2 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-6xl px-4"
                initial={isMobile ? {} : { y: -100, opacity: 0 }}
                animate={isMobile ? {} : { y: 0, opacity: 1 }}
                transition={isMobile ? {} : { duration: 0.6, delay: 0.2 }}
            >
                <div className="glass-strong px-4 sm:px-6 py-3 rounded-full flex items-center justify-between backdrop-blur-xl border-2 border-saffron-400/30 shadow-lg shadow-saffron-400/15">
                    {/* Logo Section */}
                    <Link to="/" className="flex items-center gap-2">
                        <img
                            src="/Blockchain Club logo.png"
                            alt="Blockchain Club VIT Bhopal"
                            className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="text-base sm:text-lg font-bold gradient-text">Blockchain Club</span>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map(link => (
                            link.isHash ? (
                                <a
                                    key={link.href}
                                    href={getLink(link.href)}
                                    className="text-sm font-medium text-white/90 hover:text-saffron-400 transition-all duration-200 hover:drop-shadow-[0_0_8px_rgba(255,153,51,0.6)]"
                                >
                                    {link.label}
                                </a>
                            ) : (
                                <Link
                                    key={link.href}
                                    to={link.href}
                                    className="text-sm font-medium text-white/90 hover:text-saffron-400 transition-all duration-200 hover:drop-shadow-[0_0_8px_rgba(255,153,51,0.6)]"
                                >
                                    {link.label}
                                </Link>
                            )
                        ))}
                    </div>

                    {/* Desktop Register Button */}
                    <button
                        onClick={handleRegister}
                        className="hidden md:block btn-primary text-sm px-4 sm:px-6 py-2 rounded-full hover:scale-105 transition-transform"
                    >
                        Register
                    </button>

                    {/* Mobile Hamburger Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden text-white/90 hover:text-saffron-400 transition-colors"
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && isMobile && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed top-16 left-4 right-4 z-40 md:hidden"
                    >
                        <div className="glass-strong p-4 rounded-2xl border-2 border-saffron-400/30 shadow-2xl shadow-saffron-400/20 backdrop-blur-xl">
                            <div className="flex flex-col gap-3">
                                {navLinks.map(link => (
                                    link.isHash ? (
                                        <a
                                            key={link.href}
                                            href={getLink(link.href)}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="text-sm font-medium text-white/90 hover:text-saffron-400 transition-colors py-2 px-3 rounded-lg hover:bg-saffron-400/10 border border-transparent hover:border-saffron-400/20"
                                        >
                                            {link.label}
                                        </a>
                                    ) : (
                                        <Link
                                            key={link.href}
                                            to={link.href}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="text-sm font-medium text-white/90 hover:text-saffron-400 transition-colors py-2 px-3 rounded-lg hover:bg-saffron-400/10 border border-transparent hover:border-saffron-400/20"
                                        >
                                            {link.label}
                                        </Link>
                                    )
                                ))}
                                <button
                                    onClick={handleRegister}
                                    className="btn-primary text-sm py-2 px-4 rounded-lg mt-2"
                                >
                                    Register Now
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
