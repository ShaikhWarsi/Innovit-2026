import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, MapPin, Calendar } from 'lucide-react';

const Footer = () => {
    const socialLinks = [
        { icon: <Github className="w-5 h-5" />, label: 'GitHub', href: '#' },
        { icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn', href: '#' },
        { icon: <Twitter className="w-5 h-5" />, label: 'Twitter', href: '#' },
        { icon: <Mail className="w-5 h-5" />, label: 'Email', href: 'mailto:blockchain@vitbhopal.ac.in' }
    ];

    const quickLinks = [
        { label: 'Timeline', href: '#timeline' },
        { label: 'Rounds', href: '#rounds' },
        { label: 'Mentoring', href: '#mentoring' }
    ];

    return (
        <footer className="relative bg-gradient-to-b from-transparent to-black/50 border-t border-white/10">
            <div className="container py-16">
                <div className="grid md:grid-cols-3 gap-12 mb-12">
                    {/* About */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-3xl font-bold mb-4">
                            <span className="gradient-text">INNOVIT 2026</span>
                        </h3>
                        <p className="text-gray-400 mb-4">
                            SIH-Inspired Internal Hackathon organized by the Blockchain Club at VIT Bhopal University.
                        </p>
                        <div className="space-y-2 text-sm text-gray-400">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-purple-400" />
                                <span>VIT Bhopal University</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-blue-400" />
                                <span>Finale: February 19, 2026</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <h4 className="text-xl font-bold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Event Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h4 className="text-xl font-bold mb-4">Event Details</h4>
                        <div className="space-y-3">
                            <div className="glass p-3 rounded-lg">
                                <p className="text-sm text-gray-400">Mode</p>
                                <p className="font-semibold">Hybrid (Online + Offline)</p>
                            </div>
                            <div className="glass p-3 rounded-lg">
                                <p className="text-sm text-gray-400">Participation</p>
                                <p className="font-semibold">VIT Bhopal Students</p>
                            </div>
                            <div className="glass p-3 rounded-lg">
                                <p className="text-sm text-gray-400">Focus</p>
                                <p className="font-semibold">Blockchain Technology</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Social Links */}
                <motion.div
                    className="flex justify-center gap-4 mb-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    {socialLinks.map((social, index) => (
                        <motion.a
                            key={index}
                            href={social.href}
                            className="glass p-3 rounded-xl hover:bg-white/10 transition-all"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label={social.label}
                        >
                            {social.icon}
                        </motion.a>
                    ))}
                </motion.div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 text-center">
                    <p className="text-gray-400 text-sm">
                        © 2026 Blockchain Club, VIT Bhopal University. All rights reserved.
                    </p>
                    <p className="text-gray-500 text-xs mt-2">
                        Built with 💜 for innovation and blockchain enthusiasts
                    </p>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500"></div>
        </footer>
    );
};

export default Footer;
