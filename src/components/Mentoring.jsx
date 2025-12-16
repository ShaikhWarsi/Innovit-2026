import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Zap, MessageCircle, Award } from 'lucide-react';

const Mentoring = () => {
    const mentoringFeatures = [
        {
            icon: <Target className="w-6 h-6" />,
            title: 'Technical Feedback',
            description: 'Get expert insights on your architecture, code quality, and blockchain implementation',
            color: 'purple'
        },
        {
            icon: <Zap className="w-6 h-6" />,
            title: 'Architecture Review',
            description: 'Improve your system design with suggestions from experienced mentors',
            color: 'blue'
        },
        {
            icon: <MessageCircle className="w-6 h-6" />,
            title: 'UI/UX Guidance',
            description: 'Polish your user interface and enhance user experience',
            color: 'cyan'
        },
        {
            icon: <Award className="w-6 h-6" />,
            title: 'Presentation Tips',
            description: 'Learn how to pitch effectively and handle Q&A sessions',
            color: 'pink'
        }
    ];

    const colorClasses = {
        purple: 'from-purple-500 to-purple-700',
        blue: 'from-blue-500 to-blue-700',
        cyan: 'from-cyan-500 to-cyan-700',
        pink: 'from-pink-500 to-pink-700'
    };

    return (
        <section id="mentoring" className="section-padding relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
            </div>

            <div className="container relative z-10">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-5xl md:text-6xl font-bold mb-6">
                        <span className="gradient-text">Mentoring Phase</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-4">
                        Between Round 2 & Round 3: Intensive guidance to refine your solution
                    </p>
                    <div className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold">
                        11 - 17 February 2026
                    </div>
                </motion.div>

                {/* Main Content */}
                <div className="max-w-5xl mx-auto">
                    {/* Description Card */}
                    <motion.div
                        className="glass-strong p-8 rounded-3xl mb-12 text-center"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex justify-center mb-6">
                            <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500">
                                <Users className="w-12 h-12" />
                            </div>
                        </div>
                        <h3 className="text-3xl font-bold mb-4">Expert Guidance for Finalists</h3>
                        <p className="text-lg text-gray-300 mb-6 max-w-3xl mx-auto">
                            Finalist teams receive personalized mentoring from industry experts and SIH finalists.
                            This intensive week is designed to help you refine your solution, improve your presentation,
                            and prepare for the grand finale.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 text-sm">
                            <div className="glass px-4 py-2 rounded-lg">
                                <span className="text-purple-400">👨‍🏫</span> Industry Mentors
                            </div>
                            <div className="glass px-4 py-2 rounded-lg">
                                <span className="text-blue-400">🏆</span> SIH Finalists
                            </div>
                            <div className="glass px-4 py-2 rounded-lg">
                                <span className="text-cyan-400">💡</span> 1-on-1 Sessions
                            </div>
                        </div>
                    </motion.div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-2 gap-6 mb-12">
                        {mentoringFeatures.map((feature, index) => (
                            <motion.div
                                key={index}
                                className="glass-strong p-6 rounded-2xl card-hover"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${colorClasses[feature.color]} mb-4`}>
                                    {feature.icon}
                                </div>
                                <h4 className="text-xl font-bold mb-2">{feature.title}</h4>
                                <p className="text-gray-400">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* What You'll Get */}
                    <motion.div
                        className="glass-strong p-8 rounded-3xl"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-2xl font-bold mb-6 text-center">What Mentors Will Help You With</h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="text-4xl mb-3">🔧</div>
                                <h4 className="font-semibold mb-2">What to Improve</h4>
                                <p className="text-sm text-gray-400">Identify weaknesses and areas for enhancement</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl mb-3">➕</div>
                                <h4 className="font-semibold mb-2">What to Add/Remove</h4>
                                <p className="text-sm text-gray-400">Optimize features for maximum impact</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl mb-3">🚀</div>
                                <h4 className="font-semibold mb-2">Competition Ready</h4>
                                <p className="text-sm text-gray-400">Make your solution finale-worthy</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Mentoring;
