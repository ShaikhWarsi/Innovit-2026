import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Code, Trophy, ChevronDown, ChevronUp, FileText, Video, Github, Presentation } from 'lucide-react';
import { ParticleCard } from './MagicEffects';
import { useIsMobile } from '../hooks/useIsMobile';

const Rounds = () => {
    const isMobile = useIsMobile();
    const [expandedRound, setExpandedRound] = useState(null);

    const rounds = [
        {
            id: 1,
            phase: 'ROUND 1',
            title: 'Idea Submission',
            subtitle: 'Phase 1',
            icon: <Lightbulb className="w-8 h-8" />,
            color: 'gold',
            gradient: 'from-yellow-500 to-amber-600',
            description: 'Transform your vision into a compelling proposal',
            whatToDo: [
                'Choose one problem statement from the released themes',
                'Clearly explain your understanding of the problem',
                'Propose an innovative solution approach',
                'Justify why blockchain technology is essential',
                'Highlight the innovation and uniqueness of your idea',
                'Demonstrate expected impact and feasibility'
            ],
            submissions: [
                'Idea document or PowerPoint presentation',
                'No code implementation required',
                'No prototype required at this stage'
            ],
            evaluation: [
                'Clarity of problem understanding',
                'Originality and innovation of the idea',
                'Relevance and correct application of blockchain',
                'Practical feasibility of implementation',
                'Potential real-world impact'
            ],
            outcome: 'Best ideas shortlisted for Phase 2'
        },
        {
            id: 2,
            phase: 'ROUND 2',
            title: 'Prototype & Code',
            subtitle: 'Phase 2',
            icon: <Code className="w-8 h-8" />,
            color: 'blue',
            gradient: 'from-blue-500 to-cyan-500',
            description: 'Bring your idea to life with working code',
            whatToDo: [
                'Convert approved idea into a working solution',
                'Implement core logic and key features',
                'Develop basic UI (final polish not required)',
                'Show at least 50% completion of proposed solution',
                'Prepare architecture and workflow documentation'
            ],
            submissions: [
                'Source code via GitHub repository',
                'Basic working prototype / MVP',
                'Architecture and workflow explanation',
                'Demo video explaining what is built, how it works, and what remains'
            ],
            evaluation: [
                'Technical implementation quality',
                'Correctness of blockchain integration',
                'Functionality of core features',
                'Feasibility to complete remaining work',
                'Clarity of video explanation'
            ],
            outcome: 'Top-performing teams selected as Finalists'
        },
        {
            id: 3,
            phase: 'ROUND 3',
            title: 'Grand Finale',
            subtitle: 'Final Round',
            icon: <Trophy className="w-8 h-8" />,
            color: 'pink',
            gradient: 'from-pink-500 to-rose-600',
            description: 'Showcase your refined solution to the judges',
            whatToDo: [
                'Present fully refined and polished solution',
                'Incorporate mentor feedback from mentoring phase',
                'Demonstrate end-to-end working functionality',
                'Show real-world use case applications',
                'Explain scalability and future scope'
            ],
            submissions: [
                'Final pitch presentation',
                'Live product demonstration',
                'Complete architecture & technical explanation',
                'Clear articulation of impact and innovation'
            ],
            evaluation: [
                'Innovation and uniqueness',
                'Technical depth and execution quality',
                'Effectiveness of blockchain integration',
                'Real-world applicability',
                'Presentation skills and Q&A handling'
            ],
            outcome: 'Winners declared and special recognitions awarded'
        }
    ];

    const iconMap = {
        'Idea document or PowerPoint presentation': <FileText className="w-5 h-5" />,
        'Source code via GitHub repository': <Github className="w-5 h-5" />,
        'Demo video explaining what is built, how it works, and what remains': <Video className="w-5 h-5" />,
        'Final pitch presentation': <Presentation className="w-5 h-5" />
    };

    return (
        <section id="rounds" className="section-padding relative overflow-hidden bg-gradient-to-b from-transparent via-yellow-900/5 to-transparent">
            <div className="container relative z-10">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-12 px-4"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="gradient-text">Competition Rounds</span>
                    </h2>
                    <p className="text-base md:text-lg text-[#fbe9bb] max-w-2xl mx-auto">
                        Three challenging phases to test your innovation, implementation, and presentation skills
                    </p>
                </motion.div>

                {/* Rounds Grid */}
                <div className="grid md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto px-4">
                    {rounds.map((round, index) => (
                        <motion.div
                            key={round.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="relative"
                        >
                            <ParticleCard
                                className="magic-card"
                                particleCount={isMobile ? 4 : 10}
                                glowColor="139, 92, 246"
                                enableTilt={!isMobile}
                                enableMagnetism={!isMobile}
                                clickEffect={!isMobile}
                                enableBorderGlow={!isMobile}
                            >
                                <motion.div
                                    className={`glass-strong p-4 md:p-5 rounded-2xl cursor-pointer transition-all duration-300 ${expandedRound === round.id ? 'ring-2 ring-offset-2 ring-offset-gray-900' : ''
                                        }`}
                                    style={{
                                        ringColor: expandedRound === round.id ? `var(--accent-${round.color})` : 'transparent'
                                    }}
                                    whileHover={{ y: -8 }}
                                    onClick={() => setExpandedRound(expandedRound === round.id ? null : round.id)}
                                >
                                    {/* Icon */}
                                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${round.gradient} mb-3`}>
                                        {round.icon}
                                    </div>

                                    {/* Phase Badge */}
                                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-2 bg-gradient-to-r ${round.gradient}`}>
                                        {round.phase}
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl md:text-2xl font-bold mb-2">{round.title}</h3>
                                    <p className="text-xs md:text-sm text-yellow-400 mb-3">{round.subtitle}</p>
                                    <p className="text-sm md:text-base text-[#fbe9bb] mb-4">{round.description}</p>

                                    {/* Expand Button */}
                                    <button className="flex items-center gap-2 text-sm font-semibold text-yellow-400 hover:text-yellow-300 transition-colors">
                                        {expandedRound === round.id ? (
                                            <>
                                                <span>Show Less</span>
                                                <ChevronUp className="w-4 h-4" />
                                            </>
                                        ) : (
                                            <>
                                                <span>View Details</span>
                                                <ChevronDown className="w-4 h-4" />
                                            </>
                                        )}
                                    </button>
                                </motion.div>
                            </ParticleCard>

                            {/* Expanded Content */}
                            <AnimatePresence>
                                {expandedRound === round.id && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                        animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="glass-strong p-4 md:p-5 rounded-2xl space-y-4">
                                            {/* What to Do */}
                                            <div>
                                                <h4 className="text-lg font-bold mb-3 flex items-center gap-2">
                                                    <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${round.gradient}`}></span>
                                                    What Participants Do
                                                </h4>
                                                <ul className="space-y-2">
                                                    {round.whatToDo.map((item, i) => (
                                                        <li key={i} className="text-sm text-[#fbe9bb] flex items-start gap-2">
                                                            <span className="text-yellow-400 mt-1">•</span>
                                                            <span>{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Submissions */}
                                            <div>
                                                <h4 className="text-lg font-bold mb-3 flex items-center gap-2">
                                                    <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${round.gradient}`}></span>
                                                    What to Submit
                                                </h4>
                                                <ul className="space-y-2">
                                                    {round.submissions.map((item, i) => (
                                                        <li key={i} className="text-sm text-[#fbe9bb] flex items-start gap-2">
                                                            <span className="text-blue-400">
                                                                {iconMap[item] || <FileText className="w-5 h-5" />}
                                                            </span>
                                                            <span>{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Evaluation */}
                                            <div>
                                                <h4 className="text-lg font-bold mb-3 flex items-center gap-2">
                                                    <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${round.gradient}`}></span>
                                                    Evaluation Criteria
                                                </h4>
                                                <ul className="space-y-2">
                                                    {round.evaluation.map((item, i) => (
                                                        <li key={i} className="text-sm text-[#fbe9bb] flex items-start gap-2">
                                                            <span className="text-cyan-400">✓</span>
                                                            <span>{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Outcome */}
                                            <div className={`p-4 rounded-xl bg-gradient-to-r ${round.gradient} bg-opacity-10 border border-opacity-20`}
                                                style={{ borderColor: `var(--accent-${round.color})` }}>
                                                <p className="text-sm font-semibold">
                                                    <span className="text-[#fbe9bb]">Outcome:</span> {round.outcome}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Rounds;

