import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Rocket, Sparkles, ChevronDown } from 'lucide-react';
import { Link } from 'react-scroll';
import ElectricBorder from './ElectricBorder';
import { ParticleCard } from './MagicEffects';
import PixelBlast from './PixelBlast';
import { useIsMobile } from '../hooks/useIsMobile';
import DecryptedText from './DecryptedText';

const Hero = () => {
    const isMobile = useIsMobile();

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

    // Create floating particles - reduced count on mobile for performance
    const particleCount = isMobile ? 6 : 30;
    const particles = Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 20}s`,
        animationDuration: `${15 + Math.random() * 10}s`
    }));

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-12 px-4">
            {/* PixelBlast Animated Background */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <PixelBlast
                    variant="circle"
                    pixelSize={4}
                    color="#f5bc22"
                    patternScale={2.5}
                    patternDensity={0.8}
                    pixelSizeJitter={0.3}
                    enableRipples={true}
                    rippleSpeed={0.5}
                    rippleThickness={0.15}
                    rippleIntensityScale={2.0}
                    liquid={true}
                    liquidStrength={0.08}
                    liquidRadius={1.0}
                    liquidWobbleSpeed={4}
                    speed={2.5}
                    edgeFade={0.2}
                    transparent={true}
                />
            </div>

            {/* Gradient Overlays for Text Visibility - Non-interactive */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40 z-[1] pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 z-[1] pointer-events-none"></div>

            {/* Particles */}
            <div className="particles z-[2]">
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
            <div className="absolute inset-0 opacity-10 z-[2]"
                style={{
                    backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)`,
                    backgroundSize: '50px 50px'
                }}
            />

            {/* Content Container with proper spacing */}
            <div className="relative z-10 w-full max-w-6xl mx-auto text-center pt-24 sm:pt-20">
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
                        <Sparkles className="w-4 h-4 text-yellow-400" />
                        <span className="text-xs sm:text-sm font-medium text-[#fff1ce]">VIT Bhopal Blockchain Club Presents</span>
                    </motion.div>

                    {/* Main Title */}
                    <motion.h1
                        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-4 tracking-tight leading-tight"
                        initial={isMobile ? {} : { opacity: 0, y: 30 }}
                        animate={isMobile ? {} : { opacity: 1, y: 0 }}
                        transition={isMobile ? {} : { delay: 0.3, duration: 0.8 }}
                    >
                        <span className="gradient-text block">
                            {isMobile ? (
                                'INNOVIT'
                            ) : (
                                <DecryptedText
                                    text="INNOVIT"
                                    animateOn="load"
                                    speed={3}
                                    maxIterations={20}
                                    sequential={true}
                                    revealDirection="start"
                                />
                            )}
                        </span>
                        <span className="gradient-text-cyber block text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-2">
                            {isMobile ? (
                                '2026'
                            ) : (
                                <DecryptedText
                                    text="2026"
                                    animateOn="load"
                                    speed={3}
                                    maxIterations={15}
                                    sequential={true}
                                    revealDirection="start"
                                />
                            )}
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        className="text-lg sm:text-xl md:text-2xl text-[#fff1ce] mb-8 max-w-2xl mx-auto"
                        initial={isMobile ? {} : { opacity: 0, y: 20 }}
                        animate={isMobile ? {} : { opacity: 1, y: 0 }}
                        transition={isMobile ? {} : { delay: 0.5, duration: 0.8 }}
                    >
                        {isMobile ? (
                            'Ideas Powering Atmanirbhar Bharat'
                        ) : (
                            <DecryptedText
                                text="Ideas Powering Atmanirbhar Bharat"
                                animateOn="load"
                                speed={3}
                                maxIterations={18}
                                sequential={true}
                                revealDirection="start"
                            />
                        )}
                    </motion.p>

                    <motion.div
                        className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 text-xs sm:text-sm px-4"
                        initial={isMobile ? {} : { opacity: 0 }}
                        animate={isMobile ? {} : { opacity: 1 }}
                        transition={isMobile ? {} : { delay: 0.6 }}
                    >
                        <div className="glass px-3 py-1.5 rounded-lg text-[#fff1ce]">
                            <span className="text-yellow-400">🏆</span> Hybrid Mode
                        </div>
                        <div className="glass px-3 py-1.5 rounded-lg text-[#fff1ce]">
                            <span className="text-yellow-400">📅</span> Finale: Feb 19, 2026
                        </div>
                        <a
                            href="https://calendar.app.google/GsCcyPz8NqUHFmtt5"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass px-3 py-1.5 rounded-lg text-[#fff1ce] hover:text-yellow-400 hover:border-yellow-400/40 transition-all duration-200 cursor-pointer"
                        >
                            <span className="text-yellow-400">📆</span> Meeting Schedule
                        </a>
                        <a
                            href="https://youtube.com/live/9uVy8RJVCjM?feature=share"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass px-3 py-1.5 rounded-lg text-[#fff1ce] hover:text-yellow-400 hover:border-yellow-400/40 transition-all duration-200 cursor-pointer"
                        >
                            <span className="text-yellow-400">📺</span> YouTube Live
                        </a>
                    </motion.div>

                    {/* Countdown Timer */}
                    <motion.div
                        className="mb-8 px-4"
                        initial={isMobile ? {} : { opacity: 0, y: 20 }}
                        animate={isMobile ? {} : { opacity: 1, y: 0 }}
                        transition={isMobile ? {} : { delay: 0.7 }}
                    >
                        <p className="text-xs sm:text-sm uppercase tracking-wider text-[#fbe9bb] mb-3">Launch Countdown</p>
                        <div className="flex justify-center gap-2 sm:gap-3 md:gap-4">
                            {[
                                { label: 'Days', value: timeLeft.days, color: '#f5bc22' },
                                { label: 'Hours', value: timeLeft.hours, color: '#ffd700' },
                                { label: 'Minutes', value: timeLeft.minutes, color: '#fff1ce' },
                                { label: 'Seconds', value: timeLeft.seconds, color: '#f5bc22' }
                            ].map((item, index) => (
                                <ElectricBorder
                                    key={item.label}
                                    color={item.color}
                                    speed={0.3}
                                    chaos={0.5}
                                    thickness={2}
                                    style={{ borderRadius: 12 }}
                                >
                                    <ParticleCard
                                        className="magic-card"
                                        particleCount={isMobile ? 3 : 6}
                                        glowColor={item.color.replace('#', '').match(/.{2}/g).map(x => parseInt(x, 16)).join(', ')}
                                        enableTilt={!isMobile}
                                        enableMagnetism={false}
                                        clickEffect={!isMobile}
                                        enableBorderGlow={!isMobile}
                                    >
                                        <div className="glass-strong p-2 sm:p-3 md:p-4 rounded-xl min-w-[60px] sm:min-w-[70px] md:min-w-[85px]">
                                            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold gradient-text mb-1">
                                                {String(item.value).padStart(2, '0')}
                                            </div>
                                            <div className="text-[10px] sm:text-xs text-[#fbe9bb] uppercase tracking-wider">
                                                {item.label}
                                            </div>
                                        </div>
                                    </ParticleCard>
                                </ElectricBorder>
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
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                    initial={isMobile ? {} : { opacity: 0 }}
                    animate={isMobile ? {} : { opacity: 1 }}
                    transition={isMobile ? {} : { delay: 1.2 }}
                >
                    <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
