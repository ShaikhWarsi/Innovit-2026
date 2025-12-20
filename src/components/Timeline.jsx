import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle, Users, FileText, Code, Trophy, Lightbulb } from 'lucide-react';
import ElectricBorder from './ElectricBorder';
import { ParticleCard } from './MagicEffects';

const Timeline = () => {
    const events = [
        {
            date: '26 Dec 2025',
            title: 'Hackathon Launch',
            description: 'Official launch of INNOVIT 2026',
            icon: <Trophy className="w-6 h-6" />,
            color: 'gold'
        },
        {
            date: '26 Dec 2025',
            title: 'Problem Statements Released',
            description: 'All challenge themes and problem statements available',
            icon: <FileText className="w-6 h-6" />,
            color: 'cream'
        },
        {
            date: '26 Dec 2025',
            title: 'Orientation Session',
            description: 'Kickoff session + SIH finalist mentoring',
            icon: <Users className="w-6 h-6" />,
            color: 'light'
        },
        {
            date: '26 Dec 2025',
            title: 'Registration Opens',
            description: 'Team registration & Phase 1 idea submission begins',
            icon: <CheckCircle className="w-6 h-6" />,
            color: 'gold'
        },
        {
            date: '13 Jan 2026',
            title: 'Phase 1 Deadline',
            description: 'Registration & idea submission closes',
            icon: <Lightbulb className="w-6 h-6" />,
            color: 'cream'
        },
        {
            date: '16 Jan 2026',
            title: 'Phase 1 Results',
            description: 'Shortlisted teams announced',
            icon: <CheckCircle className="w-6 h-6" />,
            color: 'cream'
        },
        {
            date: '17 Jan 2026',
            title: 'Phase 2 Opens',
            description: 'Prototype submission forms released',
            icon: <Code className="w-6 h-6" />,
            color: 'light'
        },
        {
            date: '7 Feb 2026',
            title: 'Phase 2 Deadline',
            description: 'Prototype & code submission closes',
            icon: <Code className="w-6 h-6" />,
            color: 'gold'
        },
        {
            date: '9 Feb 2026',
            title: 'Phase 2 Results',
            description: 'Evaluation results announced',
            icon: <CheckCircle className="w-6 h-6" />,
            color: 'cream'
        },
        {
            date: '10 Feb 2026',
            title: 'Finalists Announced',
            description: 'Top teams selected for grand finale',
            icon: <Trophy className="w-6 h-6" />,
            color: 'gold'
        },
        {
            date: '11-17 Feb 2026',
            title: 'Mentoring Week',
            description: 'Intensive mentoring by experts & SIH finalists',
            icon: <Users className="w-6 h-6" />,
            color: 'light'
        },
        {
            date: '19 Feb 2026',
            title: 'Grand Finale',
            description: 'Offline finale event at VIT Bhopal',
            icon: <Trophy className="w-6 h-6" />,
            color: 'gold',
            highlight: true
        }
    ];

    const colorClasses = {
        gold: 'from-yellow-500 to-yellow-600',
        cream: 'from-amber-200 to-yellow-300',
        purple: 'from-purple-700 to-purple-900',
        light: 'from-yellow-300 to-amber-400'
    };

    const colorHex = {
        gold: '#f5bc22',
        cream: '#fff1ce',
        purple: '#2e0d8b',
        light: '#ffd700'
    };

    const glowClasses = {
        gold: 'glow-gold',
        cream: 'glow-cream',
        purple: 'glow-purple',
        light: 'glow-gold'
    };

    return (
        <section id="timeline" className="section-padding relative overflow-hidden">

            {/* Background Elements */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-400 rounded-full blur-3xl"></div>
            </div>

            <div className="container relative z-10">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="gradient-text">Event Timeline</span>
                    </h2>
                    <p className="text-base md:text-lg text-[#fbe9bb] max-w-2xl mx-auto px-4">
                        Your journey from idea to innovation - every milestone mapped out
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="relative max-w-5xl mx-auto">
                    {/* Timeline Line */}
                    <div className="timeline-line hidden md:block"></div>

                    {/* Timeline Events */}
                    <div className="space-y-8 md:space-y-10">
                        {events.map((event, index) => (
                            <motion.div
                                key={index}
                                className={`relative flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                    }`}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                {/* Content Card */}
                                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                    <ElectricBorder
                                        color={event.highlight ? '#f5bc22' : '#ffd700'}
                                        speed={event.highlight ? 0.4 : 0.3}
                                        chaos={0.3}
                                        thickness={event.highlight ? 2 : 1}
                                        className="w-full"
                                    >
                                        <ParticleCard
                                            className="magic-card"
                                            particleCount={event.highlight ? 12 : 8}
                                            glowColor={colorHex[event.color].replace('#', '').match(/.{2}/g).map(x => parseInt(x, 16)).join(', ')}
                                            enableTilt={true}
                                            enableMagnetism={true}
                                            clickEffect={true}
                                            enableBorderGlow={true}
                                        >
                                            <motion.div
                                                className={`glass-strong p-4 md:p-5 rounded-2xl card-hover ${event.highlight ? glowClasses[event.color] : ''
                                                    }`}
                                                whileHover={{ scale: 1.02 }}
                                            >
                                                <div className="flex items-start gap-4 md:hidden mb-3">
                                                    <div className={`p-2.5 rounded-xl bg-gradient-to-br ${colorClasses[event.color]}`}>
                                                        {event.icon}
                                                    </div>
                                                </div>

                                                <div className={`inline-block px-3 py-1 rounded-full text-xs sm:text-sm font-semibold mb-2 bg-gradient-to-r ${colorClasses[event.color]}`}>
                                                    {event.date}
                                                </div>

                                                <h3 className="text-lg md:text-xl font-bold mb-2 text-[#fff1ce]">{event.title}</h3>
                                                <p className="text-sm md:text-base text-[#fbe9bb]">{event.description}</p>
                                            </motion.div>
                                        </ParticleCard>
                                    </ElectricBorder>
                                </div>

                                {/* Icon (Desktop) */}
                                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
                                    <motion.div
                                        className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses[event.color]} ${event.highlight ? 'pulse-glow' : ''
                                            }`}
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        {event.icon}
                                    </motion.div>
                                </div>

                                {/* Spacer */}
                                <div className="flex-1 hidden md:block"></div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Timeline;
