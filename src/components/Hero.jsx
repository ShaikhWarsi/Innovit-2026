import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Rocket, Sparkles, ChevronDown } from 'lucide-react';
import { Link } from 'react-scroll';

const Hero = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const launchDate = new Date('2025-12-26T00:00:00');

        const timer = setInterval(() => {
            const now = new Date();
            const difference = launchDate - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Create floating particles
    const particles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 20}s`,
        animationDuration: `${15 + Math.random() * 10}s`
    }));

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-12 px-4">
            {/* Animated Background */}
            <div className="absolute inset-0 animated-gradient opacity-30"></div>

            {/* Particles */}
            <div className="particles">
                {particles.map(particle => (
                    <div
                        key={particle.id}
                        className="particle"
                        style={{
                            left: particle.left,
                            animationDelay: particle.animationDelay,
                            animationDuration: particle.animationDuration
                        }}
                    />
                ))}
            </div>

            {/* Grid Overlay */}
            <div className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)`,
                    backgroundSize: '50px 50px'
                }}
            />

            {/* Content */}
            <div className="w-full max-w-6xl mx-auto relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Badge */}
                    <motion.div
                        className="inline-flex items-center gap-2 glass px-4 py-2 mb-6"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <span className="text-xs sm:text-sm font-medium">VIT Bhopal Blockchain Club Presents</span>
                    </motion.div>

                    {/* Main Title */}
                    <motion.h1
                        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-4 tracking-tight leading-tight"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        <span className="gradient-text block">INNOVIT</span>
                        <span className="gradient-text-cyber block text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-2">2026</span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 max-w-2xl mx-auto px-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        SIH-Inspired Internal Hackathon
                    </motion.p>

                    <motion.div
                        className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 text-xs sm:text-sm px-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <div className="glass px-3 py-1.5 rounded-lg">
                            <span className="text-purple-400">🏆</span> Hybrid Mode
                        </div>
                        <div className="glass px-3 py-1.5 rounded-lg">
                            <span className="text-blue-400">🎯</span> Blockchain Focus
                        </div>
                        <div className="glass px-3 py-1.5 rounded-lg">
                            <span className="text-cyan-400">📅</span> Finale: Feb 19, 2026
                        </div>
                    </motion.div>

                    {/* Countdown Timer */}
                    <motion.div
                        className="mb-8 px-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                    >
                        <p className="text-xs sm:text-sm uppercase tracking-wider text-gray-400 mb-3">Launch Countdown</p>
                        <div className="flex justify-center gap-2 sm:gap-3 md:gap-4">
                            {[
                                { label: 'Days', value: timeLeft.days },
                                { label: 'Hours', value: timeLeft.hours },
                                { label: 'Minutes', value: timeLeft.minutes },
                                { label: 'Seconds', value: timeLeft.seconds }
                            ].map((item, index) => (
                                <div key={item.label} className="glass-strong p-2 sm:p-3 md:p-4 rounded-xl min-w-[60px] sm:min-w-[70px] md:min-w-[85px]">
                                    <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold gradient-text mb-1">
                                        {String(item.value).padStart(2, '0')}
                                    </div>
                                    <div className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider">
                                        {item.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        className="flex flex-col sm:flex-row gap-3 justify-center items-center px-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                    >
                        <Link to="timeline" smooth={true} duration={800}>
                            <button className="btn-primary flex items-center gap-2 w-full sm:w-auto">
                                <Rocket className="w-4 h-4" />
                                View Timeline
                            </button>
                        </Link>
                        <Link to="rounds" smooth={true} duration={800}>
                            <button className="btn-secondary flex items-center gap-2 w-full sm:w-auto">
                                <Calendar className="w-4 h-4" />
                                Explore Rounds
                            </button>
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0] }}
                    transition={{ delay: 1, duration: 2, repeat: Infinity }}
                >
                    <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
