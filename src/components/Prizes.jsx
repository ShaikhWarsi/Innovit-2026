import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Gift, Award, Users, Code, BookOpen, Star, Sparkles } from 'lucide-react';
import { ParticleCard } from './MagicEffects';
import ElectricBorder from './ElectricBorder';
import { useIsMobile } from '../hooks/useIsMobile';

const Prizes = () => {
    const isMobile = useIsMobile();

    const prizeCategories = [
        {
            icon: <Trophy className="w-8 h-8" />,
            title: "Cash Prizes",
            color: "from-yellow-500 to-amber-500",
            items: [
                "Cash prizes for top-performing teams",
                "Top winning teams from all themes awarded during Grand Finale",
                "Details to be revealed later"
            ]
        },
        {
            icon: <Award className="w-8 h-8" />,
            title: "Certificates",
            color: "from-amber-400 to-yellow-500",
            items: [
                "Phase-wise certificates for all participants",
                "Finalist certificates for Top 15 teams",
                "Winner & Runner-Up certificates for top teams"
            ]
        },
        {
            icon: <Code className="w-8 h-8" />,
            title: "Learning & Career Benefits",
            color: "from-amber-400 to-yellow-500",
            items: [
                "Guidance to claim GitHub Student Developer Pack",
                "Access to premium developer tools and resources",
                "Mentorship by SIH Grand Finalists",
                "Domain & industry mentors guidance before finals"
            ]
        },
        {
            icon: <Star className="w-8 h-8" />,
            title: "Additional Benefits",
            color: "from-yellow-400 to-amber-600",
            items: [
                "Exposure to SIH-style evaluation & presentation",
                "Recognition under ADVITIYA – Annual Tech Fest, VIT Bhopal",
                "Build India-focused, Atmanirbhar Bharat–aligned solutions",
                "Exciting goodies & special recognitions"
            ]
        }
    ];

    return (
        <section id="prizes" className="section-padding relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-500 rounded-full blur-3xl"></div>
            </div>

            <div className="container relative z-10">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-12 px-4"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.div
                        className="inline-flex items-center gap-2 glass px-4 py-2 mb-4"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <Trophy className="w-5 h-5 text-yellow-400" />
                        <span className="text-sm font-semibold text-[#fff1ce]">Rewards & Recognition</span>
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="gradient-text">Prizes & Benefits</span>
                    </h2>
                    <p className="text-base md:text-lg text-[#fbe9bb] max-w-2xl mx-auto">
                        Compete for exciting rewards, gain valuable learning experiences, and get recognized for your innovation
                    </p>
                </motion.div>

                {/* Prize Cards Grid */}
                <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto px-4">
                    {prizeCategories.map((category, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <ElectricBorder
                                color={index === 0 ? '#f5bc22' : '#ffd700'}
                                speed={0.3}
                                chaos={0.3}
                                thickness={index === 0 ? 3 : 2}
                                style={{ borderRadius: 16 }}
                            >
                                <ParticleCard
                                    className="magic-card"
                                    particleCount={isMobile ? 3 : 8}
                                    glowColor={index === 0 ? '245, 188, 34' : index === 1 ? '245, 188, 34' : index === 2 ? '255, 215, 0' : '245, 188, 34'}
                                    enableTilt={!isMobile}
                                    enableMagnetism={!isMobile}
                                    clickEffect={!isMobile}
                                    enableBorderGlow={!isMobile}
                                >
                                    <motion.div
                                        className="glass-strong p-6 rounded-2xl h-full"
                                        whileHover={{ y: -8 }}
                                    >
                                        {/* Icon */}
                                        <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${category.color} mb-4`}>
                                            {category.icon}
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-xl md:text-2xl font-bold mb-4 text-[#fff1ce]">{category.title}</h3>

                                        {/* Items List */}
                                        <ul className="space-y-3">
                                            {category.items.map((item, i) => (
                                                <li key={i} className="flex items-start gap-3 text-sm md:text-base text-[#fbe9bb]">
                                                    <Sparkles className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                </ParticleCard>
                            </ElectricBorder>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    className="text-center mt-12 px-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                >
                    <div className="glass p-6 rounded-2xl max-w-3xl mx-auto">
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <Gift className="w-6 h-6 text-yellow-400" />
                            <h4 className="text-lg md:text-xl font-bold text-[#fff1ce]">More Surprises Await!</h4>
                        </div>
                        <p className="text-sm md:text-base text-[#fbe9bb]">
                            Additional prizes, goodies, and special recognitions will be announced in later stages.
                            Stay tuned for more exciting updates!
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Prizes;
