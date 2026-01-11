import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Trophy, Lightbulb } from 'lucide-react';
import { ParticleCard } from './MagicEffects';

const Results = () => {
    // Result declaration date and time
    const resultDate = new Date('2026-01-18T15:00:00'); // Jan 18, 2026, 3 PM
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    const [isResultDeclared, setIsResultDeclared] = useState(false);

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const difference = resultDate - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
                setIsResultDeclared(false);
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                setIsResultDeclared(true);
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative flex items-center justify-center min-h-screen px-3 pt-24 pb-16 sm:px-4 sm:pt-28 md:pt-32 md:pb-20 lg:px-8">
            <div className="w-full max-w-4xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-8 text-center sm:mb-10 md:mb-12"
                >
                    <h1 className="mb-3 text-2xl font-bold sm:text-3xl md:text-5xl lg:text-6xl gradient-text">
                        Phase 1 Results
                    </h1>
                    <p className="max-w-3xl px-2 mx-auto text-sm sm:text-base md:text-lg lg:text-xl text-white/80">
                        INNOVIT 2026 - Idea Submission Phase
                    </p>
                </motion.div>

                {/* Main Content */}
                {!isResultDeclared ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <ParticleCard className="p-5 sm:p-6 md:p-8 lg:p-12">
                            {/* Submit Ideas Message */}
                            <div className="mb-8 text-center sm:mb-10 md:mb-12">
                                <div className="inline-flex items-center justify-center p-3 mb-4 rounded-full sm:p-4 sm:mb-6 bg-gradient-to-br from-saffron-400 to-amber-500">
                                    <Lightbulb className="w-8 h-8 text-white sm:w-10 sm:h-10 md:w-12 md:h-12" />
                                </div>
                                <h2 className="mb-2 text-xl font-bold text-white sm:text-2xl md:text-3xl lg:text-4xl">
                                    Submit Your Ideas!
                                </h2>
                                <p className="px-2 mb-4 text-xs sm:text-sm md:text-base lg:text-lg text-white/70">
                                    Phase 1 idea submission is open. Share your innovative solutions with us.
                                </p>
                               
                            </div>

                            {/* Countdown Timer */}
                            <div className="pt-6 border-t-2 sm:pt-8 md:pt-8 border-saffron-400/30">
                                <div className="flex items-center justify-center gap-2 mb-4 sm:gap-3 sm:mb-6">
                                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-saffron-400" />
                                    <h3 className="text-lg font-bold text-white sm:text-xl md:text-2xl">
                                        Results Announcement
                                    </h3>
                                </div>
                                
                                <div className="flex items-center justify-center gap-1 mb-6 sm:gap-2 sm:mb-8 text-white/70">
                                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                                    <span className="text-xs sm:text-sm md:text-base">
                                        18 January 2026 | 3:00 PM
                                    </span>
                                </div>

                                {/* Countdown Boxes */}
                                <div className="grid max-w-2xl grid-cols-4 gap-2 mx-auto sm:gap-3 md:gap-4">
                                    <div className="p-2 text-center border-2 rounded-lg sm:p-3 md:p-4 glass-strong sm:rounded-xl border-saffron-400/30">
                                        <div className="mb-1 text-2xl font-bold sm:mb-2 sm:text-3xl md:text-4xl lg:text-5xl gradient-text">
                                            {timeLeft.days}
                                        </div>
                                        <div className="text-xs tracking-wide uppercase sm:text-sm text-white/60">
                                            Days
                                        </div>
                                    </div>
                                    <div className="p-2 text-center border-2 rounded-lg sm:p-3 md:p-4 glass-strong sm:rounded-xl border-saffron-400/30">
                                        <div className="mb-1 text-2xl font-bold sm:mb-2 sm:text-3xl md:text-4xl lg:text-5xl gradient-text">
                                            {timeLeft.hours}
                                        </div>
                                        <div className="text-xs tracking-wide uppercase sm:text-sm text-white/60">
                                            Hours
                                        </div>
                                    </div>
                                    <div className="p-2 text-center border-2 rounded-lg sm:p-3 md:p-4 glass-strong sm:rounded-xl border-saffron-400/30">
                                        <div className="mb-1 text-2xl font-bold sm:mb-2 sm:text-3xl md:text-4xl lg:text-5xl gradient-text">
                                            {timeLeft.minutes}
                                        </div>
                                        <div className="text-xs tracking-wide uppercase sm:text-sm text-white/60">
                                            Minutes
                                        </div>
                                    </div>
                                    <div className="p-2 text-center border-2 rounded-lg sm:p-3 md:p-4 glass-strong sm:rounded-xl border-saffron-400/30">
                                        <div className="mb-1 text-2xl font-bold sm:mb-2 sm:text-3xl md:text-4xl lg:text-5xl gradient-text">
                                            {timeLeft.seconds}
                                        </div>
                                        <div className="text-xs tracking-wide uppercase sm:text-sm text-white/60">
                                            Seconds
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ParticleCard>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <ParticleCard className="p-5 text-center sm:p-6 md:p-8 lg:p-12">
                            <div className="inline-flex items-center justify-center p-3 mb-4 rounded-full sm:p-4 sm:mb-6 bg-gradient-to-br from-green-500 to-emerald-600">
                                <Trophy className="w-8 h-8 text-white sm:w-10 sm:h-10 md:w-12 md:h-12" />
                            </div>
                            <h2 className="mb-3 text-xl font-bold text-white sm:text-2xl md:text-3xl lg:text-4xl">
                                Results Declared!
                            </h2>
                            <p className="px-2 mb-4 text-xs sm:text-sm md:text-base lg:text-lg text-white/80">
                                Congratulations to all shortlisted teams! Check your registered email for detailed information about the next round.
                            </p>
                            <a
                                href="mailto:blockchain.club@vitbhopal.ac.in"
                                className="inline-block px-6 py-2 text-sm transition-transform rounded-full sm:px-8 sm:py-3 sm:text-base btn-primary hover:scale-105"
                            >
                                Contact Us
                            </a>
                        </ParticleCard>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default Results;
