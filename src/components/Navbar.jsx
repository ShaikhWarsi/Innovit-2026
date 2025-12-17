import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useIsMobile } from '../hooks/useIsMobile';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isMobile = useIsMobile();

    const handleRegister = () => {
        window.open('https://forms.gle/P2wFMiZ9xrms9rg67', '_blank');
        setIsMenuOpen(false);
    };

    const navLinks = [
        { href: '#home', label: 'Home' },
        { href: '#timeline', label: 'Timeline' },
        { href: '#rounds', label: 'Rounds' },
        { href: '#prizes', label: 'Prizes' },
        { href: '#mentoring', label: 'Mentoring' }
    ];

    return (
        <>
            <motion.nav
                className="absolute top-2 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-6xl px-4"
                initial={isMobile ? {} : { y: -100, opacity: 0 }}
                animate={isMobile ? {} : { y: 0, opacity: 1 }}
                transition={isMobile ? {} : { duration: 0.6, delay: 0.2 }}
            >
                <div className="glass-strong px-4 sm:px-6 py-3 rounded-full flex items-center justify-between backdrop-blur-xl border border-yellow-500/20 shadow-lg shadow-yellow-500/10">
                    {/* Logo Section */}
                    <Link to="/" className="flex items-center gap-2">
                        <img
                            src="/Blockchain Club logo.png"
                            alt="Blockchain Club VIT Bhopal"
                            className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="text-base sm:text-lg font-bold gradient-text">INNOVIT</span>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map(link => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="text-sm font-medium text-[#fff1ce] hover:text-yellow-400 transition-colors duration-200"
                            >
                                {link.label}
                            </a>
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
                        className="md:hidden text-[#fff1ce] hover:text-yellow-400 transition-colors"
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
                        <div className="glass-strong p-4 rounded-2xl border border-yellow-500/20 shadow-2xl backdrop-blur-xl">
                            <div className="flex flex-col gap-3">
                                {navLinks.map(link => (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-sm font-medium text-[#fff1ce] hover:text-yellow-400 transition-colors py-2 px-3 rounded-lg hover:bg-yellow-500/10"
                                    >
                                        {link.label}
                                    </a>
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
