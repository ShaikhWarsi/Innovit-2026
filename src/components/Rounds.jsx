import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Code, Trophy, ChevronDown, ChevronUp, FileText, Video, Github, Presentation, X, Users } from 'lucide-react';
import { ParticleCard } from './MagicEffects';
import { useIsMobile } from '../hooks/useIsMobile';

const Rounds = () => {
    const isMobile = useIsMobile();
    const [selectedRound, setSelectedRound] = useState(null);

    // Close modal on escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') setSelectedRound(null);
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, []);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (selectedRound) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedRound]);

    const roundsData = {
        1: {
            title: '🧠 ROUND 1 – IDEA SUBMISSION (PHASE 1)',
            sections: [
                {
                    heading: '🔹 What Participants Do',
                    items: [
                        'Select one assigned problem statement',
                        'Identify a real-world problem relevant to India',
                        'Design a solution that contributes towards Atmanirbhar Bharat',
                        'Clearly explain:',
                        '  ○ Problem understanding in the Indian context',
                        '  ○ Proposed solution approach',
                        '  ○ How the solution supports self-reliance, transparency, or efficiency',
                        '  ○ Innovation and uniqueness of the idea',
                        '  ○ Expected real-world impact at scale',
                        '  ○ Feasibility of implementation'
                    ],
                    note: '📌 Primary focus of this phase is clarity of thought, innovation, and national relevance.\n📌 The choice of technology is flexible — impact and problem-solution alignment matter more than tools used.'
                },
                {
                    heading: '🔹 What Participants Submit',
                    items: [
                        'Idea presentation (PPT) / document as per the provided template',
                        'No source code required',
                        'No prototype, UI, or demo required'
                    ]
                },
                {
                    heading: '🔹 What Evaluators Check',
                    items: [
                        'Depth of problem understanding and relevance to India',
                        'Innovation and originality of the solution',
                        'Alignment with the vision of Atmanirbhar Bharat',
                        'Practical feasibility and scalability',
                        'Potential social, economic, or systemic impact'
                    ]
                },
                {
                    heading: '🔹 Outcome',
                    items: [
                        'Best and most impactful ideas are shortlisted',
                        'Selected teams qualify for Phase 2 (Prototype & Development Round)'
                    ]
                }
            ]
        },
        2: {
            title: '⚙️ ROUND 2 – PROTOTYPE & BASIC CODE SUBMISSION (PHASE 2)',
            sections: [
                {
                    heading: '🔹 What Participants Do',
                    items: [
                        'Convert the shortlisted idea into a working solution',
                        'Implement:',
                        '  ○ Core logic and smart contracts (where applicable)',
                        '  ○ Key features of the solution',
                        '  ○ Basic UI (polish not required at this stage)',
                        'Achieve at least 50% completion of the proposed solution'
                    ]
                },
                {
                    heading: '🔹 What Participants Submit',
                    items: [
                        'Source code (GitHub repository link)',
                        'Basic working prototype / MVP',
                        'Architecture or workflow explanation',
                        'Demo video clearly explaining:',
                        '  ○ What has been built',
                        '  ○ How the solution works',
                        '  ○ What components are remaining'
                    ]
                },
                {
                    heading: '🔹 What Evaluators Check',
                    items: [
                        'Quality of technical implementation',
                        'Correct and meaningful use of blockchain',
                        'Functionality of core features',
                        'Feasibility of completing remaining work',
                        'Clarity and effectiveness of the demo video'
                    ]
                },
                {
                    heading: '🔹 Outcome',
                    items: [
                        'Top-performing teams are selected as Finalists',
                        'Finalist teams move to the Grand Finale'
                    ]
                }
            ]
        },
        3: {
            title: '🏁 ROUND 3 – GRAND FINALE (FINAL ROUND)',
            sections: [
                {
                    heading: '🔹 What Participants Do',
                    items: [
                        'Present a fully refined and completed solution',
                        'Incorporate mentor feedback',
                        'Demonstrate:',
                        '  ○ End-to-end working of the solution',
                        '  ○ Real-world use case',
                        '  ○ Scalability and future scope'
                    ]
                },
                {
                    heading: '🔹 What Participants Present',
                    items: [
                        'Final pitch presentation',
                        'Live product demo',
                        'System architecture and technical explanation',
                        'Clear articulation of impact and value proposition'
                    ]
                },
                {
                    heading: '🔹 What Judges Evaluate',
                    items: [
                        'Innovation and uniqueness',
                        'Technical depth and execution quality',
                        'Effectiveness of blockchain integration',
                        'Real-world applicability and scalability',
                        'Presentation quality and Q&A handling'
                    ]
                },
                {
                    heading: '🔹 Outcome',
                    items: [
                        'Top teams are declared winners',
                        'Special recognitions and awards are announced during the finale'
                    ]
                }
            ]
        }
    };

    const mentoringPhase = {
        title: '🤝 MENTORING PHASE',
        subtitle: '(Between Phase 2 & Phase 3)',
        sections: [
            {
                heading: '🔹 What Happens',
                items: [
                    'Finalist teams receive exclusive mentoring',
                    'Guidance provided by:',
                    '  ○ SIH Grand Finalists',
                    '  ○ Domain and technical mentors'
                ]
            },
            {
                heading: '🔹 Mentors Help Teams With',
                items: [
                    'Technical and architectural improvements',
                    'Correcting design or implementation gaps',
                    'UI/UX and presentation enhancement',
                    'Making the solution competition-ready'
                ],
                note: '📌 Mentorship is advisory and does not directly affect judging scores.'
            }
        ]
    };

    const generalRules = {
        title: '📌 General Rules & Instructions',
        items: [
            'All submissions must be original',
            'Plagiarism or misrepresentation will lead to disqualification',
            'Teams must adhere strictly to deadlines',
            'Judges\' decisions are final and binding',
            'Organizers reserve the right to make necessary changes to the schedule'
        ]
    };

    const rounds = [
        {
            id: 1,
            phase: 'ROUND 1',
            title: 'Idea Submission',
            subtitle: 'Phase 1',
            icon: <Lightbulb className="w-8 h-8" />,
            color: 'gold',
            gradient: 'from-yellow-500 to-amber-600',
            description: 'Transform your vision into a compelling proposal'
        },
        {
            id: 2,
            phase: 'ROUND 2',
            title: 'Prototype & Code',
            subtitle: 'Phase 2',
            icon: <Code className="w-8 h-8" />,
            color: 'blue',
            gradient: 'from-blue-500 to-cyan-500',
            description: 'Bring your idea to life with working code'
        },
        {
            id: 3,
            phase: 'ROUND 3',
            title: 'Grand Finale',
            subtitle: 'Final Round',
            icon: <Trophy className="w-8 h-8" />,
            color: 'pink',
            gradient: 'from-pink-500 to-rose-600',
            description: 'Showcase your refined solution to the judges'
        }
    ];

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
                                    className="glass-strong p-4 md:p-5 rounded-2xl cursor-pointer transition-all duration-300"
                                    whileHover={{ y: -8 }}
                                    onClick={() => setSelectedRound(round.id)}
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

                                    {/* View Details Button */}
                                    <button className="flex items-center gap-2 text-sm font-semibold text-yellow-400 hover:text-yellow-300 transition-colors">
                                        <span>View Details</span>
                                        <ChevronDown className="w-4 h-4" />
                                    </button>
                                </motion.div>
                            </ParticleCard>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedRound && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedRound(null)}
                    >
                        {/* Backdrop */}
                        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-strong rounded-2xl p-6 md:p-8"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedRound(null)}
                                className="absolute top-4 right-4 p-2 rounded-full glass hover:bg-red-500/20 transition-colors"
                            >
                                <X className="w-6 h-6 text-[#fff1ce]" />
                            </button>

                            {/* Round Details */}
                            <div className="space-y-6">
                                <h2 className="text-2xl md:text-3xl font-bold gradient-text pr-12">
                                    {roundsData[selectedRound].title}
                                </h2>

                                {roundsData[selectedRound].sections.map((section, idx) => (
                                    <div key={idx} className="space-y-3">
                                        <h3 className="text-lg md:text-xl font-bold text-[#fff1ce]">
                                            {section.heading}
                                        </h3>
                                        <ul className="space-y-2 pl-4">
                                            {section.items.map((item, i) => (
                                                <li key={i} className="text-sm md:text-base text-[#fbe9bb] flex items-start gap-2">
                                                    <span className="text-yellow-400 mt-1">●</span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        {section.note && (
                                            <p className="text-sm md:text-base text-yellow-300 italic mt-2">
                                                {section.note}
                                            </p>
                                        )}
                                    </div>
                                ))}

                                {/* Add Mentoring Phase after Round 2 */}
                                {selectedRound === 2 && (
                                    <div className="mt-8 p-6 glass rounded-xl border-2 border-yellow-400/30">
                                        <h2 className="text-xl md:text-2xl font-bold gradient-text mb-2">
                                            {mentoringPhase.title}
                                        </h2>
                                        <p className="text-sm text-yellow-400 mb-4">{mentoringPhase.subtitle}</p>

                                        {mentoringPhase.sections.map((section, idx) => (
                                            <div key={idx} className="space-y-3 mb-4">
                                                <h3 className="text-lg font-bold text-[#fff1ce]">
                                                    {section.heading}
                                                </h3>
                                                <ul className="space-y-2 pl-4">
                                                    {section.items.map((item, i) => (
                                                        <li key={i} className="text-sm md:text-base text-[#fbe9bb] flex items-start gap-2">
                                                            <span className="text-yellow-400 mt-1">●</span>
                                                            <span>{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                                {section.note && (
                                                    <p className="text-sm md:text-base text-yellow-300 italic mt-2">
                                                        {section.note}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Add General Rules after Round 3 */}
                                {selectedRound === 3 && (
                                    <div className="mt-8 p-6 glass rounded-xl border-2 border-red-400/30">
                                        <h2 className="text-xl md:text-2xl font-bold gradient-text mb-4">
                                            {generalRules.title}
                                        </h2>
                                        <ul className="space-y-2 pl-4">
                                            {generalRules.items.map((item, i) => (
                                                <li key={i} className="text-sm md:text-base text-[#fbe9bb] flex items-start gap-2">
                                                    <span className="text-yellow-400 mt-1">●</span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Rounds;

