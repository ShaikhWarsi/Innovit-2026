import React from 'react';
import { motion } from 'framer-motion';
import DecryptedText from './DecryptedText';
import { ParticleCard } from './MagicEffects';
import { useIsMobile } from '../hooks/useIsMobile';
import Reveal from './Reveal';
import { Lightbulb, Code, Trophy, Users, AlertCircle, CheckCircle } from 'lucide-react';

const PhaseCard = ({ icon, title, badge, children, delay = 0, color = 'from-yellow-500 to-amber-600' }) => (
    <Reveal delay={delay}>
        <ParticleCard
            className="magic-card"
            particleCount={8}
            glowColor="245, 188, 34"
            enableTilt
            enableBorderGlow
        >
            <div className="glass-strong rounded-2xl p-5 md:p-6">
                <div className="flex items-start gap-3 mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${color} flex-shrink-0`}>
                            {icon}
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl md:text-2xl font-bold gradient-text">{title}</h3>
                            {badge && (
                                <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mt-2 bg-gradient-to-r ${color}`}>
                                    {badge}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="text-[#fbe9bb] text-sm md:text-base leading-relaxed space-y-4">
                        {children}
                    </div>
                </div>
        </ParticleCard>
    </Reveal>
);

const Section = ({ icon, title, items }) => (
    <div className="mb-4">
        <h4 className="text-base md:text-lg font-bold mb-3 flex items-center gap-2">
            {icon && <span className="text-yellow-400">{icon}</span>}
            <span>{title}</span>
        </h4>
        <ul className="space-y-2 ml-4">
            {items.map((item, i) => (
                <li key={i} className="flex gap-2 items-start">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    </div>
);

const RulesSection = ({ title, items, delay = 0 }) => (
    <Reveal delay={delay}>
        <ParticleCard className="magic-card" particleCount={6} glowColor="245, 188, 34" enableTilt enableBorderGlow>
            <div className="glass-strong rounded-2xl p-5 md:p-6">
                    <h3 className="text-xl md:text-2xl font-bold mb-3 gradient-text">{title}</h3>
                    <ul className="space-y-2 text-sm md:text-base text-[#fbe9bb]">
                        {items.map((item, i) => (
                            <li key={i} className="flex gap-2 items-start">
                                <span className="text-yellow-400 mt-1">•</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
        </ParticleCard>
    </Reveal>
);

const Guidelines = () => {
    const isMobile = useIsMobile();

    const rulesData = [
        {
            title: 'Eligibility',
            items: [
                'Open to all students from VIT Bhopal and other institutions',
                'Teams of 2-4 members allowed; solo participation permitted',
                'One team per person maximum'
            ]
        },
        {
            title: 'Team Formation',
            items: [
                'Minimum 2, maximum 4 members per team',
                'Cross-year collaboration allowed',
                'Team changes permitted until Phase 1 confirmation'
            ]
        },
        {
            title: 'Submission Guidelines',
            items: [
                'Use official portals for all submissions',
                'Repository must be public or grant judge access',
                'Demo videos: 3–5 minutes with clear voiceover'
            ]
        },
        {
            title: 'Code of Conduct',
            items: [
                'Maintain respectful behavior; zero-tolerance for harassment',
                'Original work preferred; credit all libraries and datasets',
                'AI tools permitted; disclose usage in README.md'
            ]
        },
        {
            title: 'Judging & Evaluation',
            items: [
                'Criteria: innovation, feasibility, blockchain fit, impact potential, clarity',
                'Bonus points for polish, documentation, and wow factor',
                'Judges\' decisions are final and binding'
            ]
        },
        {
            title: 'Intellectual Property',
            items: [
                'You retain ownership of your work',
                'Limited showcase rights granted for demos, social media, and awards',
                'Third-party licenses apply as declared'
            ]
        },
        {
            title: 'Disqualification',
            items: [
                'Plagiarism, tampering, or rule violations lead to instant disqualification',
                'Late submissions may not be evaluated',
                'Misconduct toward peers, mentors, or judges prohibited'
            ]
        },
        {
            title: 'Logistics & Support',
            items: [
                'All timings in IST; updates via official channels',
                'Questions: contact via WhatsApp or contact page',
                'Tech issues: retry, capture evidence, and notify team'
            ]
        }
    ];

    return (
        <section className="section-padding relative overflow-hidden pt-24 md:pt-32 mt-16 md:mt-20">
            <div className="container relative z-10">
                {/* Header */}
                <motion.div
                    className="text-center mb-10 md:mb-14 px-4"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-3">
                        <DecryptedText
                            text="Hackathon Structure & Guidelines"
                            animateOn="view"
                            speed={8}
                            className="gradient-text"
                            encryptedClassName="text-yellow-200/50"
                        />
                    </h1>
                    <p className="text-base md:text-lg text-[#fbe9bb] max-w-3xl mx-auto">
                        INNOVIT 2026 is conducted in three structured phases, designed to guide participants from ideation to a competition-ready solution.
                    </p>
                </motion.div>

                {/* Phase Cards */}
                <div className="max-w-6xl mx-auto px-4 space-y-6 mb-12">
                    {/* Round 1 */}
                    <PhaseCard
                        icon={<Lightbulb className="w-6 h-6" />}
                        title="ROUND 1 – Idea Submission"
                        badge="PHASE 1"
                        color="from-yellow-500 to-amber-600"
                        delay={0.05}
                    >
                        <Section
                            icon="🔹"
                            title="What Participants Do"
                            items={[
                                'Select one assigned problem statement',
                                'Develop a clear and well-thought-out idea',
                                'Clearly explain: Problem understanding, Proposed solution approach, Why blockchain technology is required, Innovation/uniqueness, Expected real-world impact, Feasibility of implementation'
                            ]}
                        />
                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-sm">
                            <strong>📌 Focus:</strong> Clarity of thought and innovation, not coding.
                        </div>

                        <Section
                            icon="🔹"
                            title="What Participants Submit"
                            items={[
                                'Idea document or PPT',
                                'No source code required',
                                'No prototype or UI required'
                            ]}
                        />

                        <Section
                            icon="🔹"
                            title="What Evaluators Check"
                            items={[
                                'Clarity and depth of problem understanding',
                                'Originality and innovation',
                                'Relevance and correct justification of blockchain usage',
                                'Practical feasibility',
                                'Potential social, economic, or technical impact'
                            ]}
                        />

                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-sm flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                            <div><strong>Outcome:</strong> Best ideas are shortlisted. Selected teams qualify for Phase 2.</div>
                        </div>
                    </PhaseCard>

                    {/* Round 2 */}
                    <PhaseCard
                        icon={<Code className="w-6 h-6" />}
                        title="ROUND 2 – Prototype & Code Submission"
                        badge="PHASE 2"
                        color="from-blue-500 to-cyan-500"
                        delay={0.1}
                    >
                        <Section
                            icon="🔹"
                            title="What Participants Do"
                            items={[
                                'Convert the shortlisted idea into a working solution',
                                'Implement: Core logic and smart contracts (where applicable), Key features of the solution, Basic UI (polish not required)',
                                'Achieve at least 50% completion of the proposed solution'
                            ]}
                        />

                        <Section
                            icon="🔹"
                            title="What Participants Submit"
                            items={[
                                'Source code (GitHub repository link)',
                                'Basic working prototype / MVP',
                                'Architecture or workflow explanation',
                                'Demo video clearly explaining: What has been built, How the solution works, What components are remaining'
                            ]}
                        />

                        <Section
                            icon="🔹"
                            title="What Evaluators Check"
                            items={[
                                'Quality of technical implementation',
                                'Correct and meaningful use of blockchain',
                                'Functionality of core features',
                                'Feasibility of completing remaining work',
                                'Clarity and effectiveness of the demo video'
                            ]}
                        />

                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-sm flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                            <div><strong>Outcome:</strong> Top-performing teams are selected as Finalists. Finalist teams move to the Grand Finale.</div>
                        </div>
                    </PhaseCard>

                    {/* Mentoring Phase */}
                    <PhaseCard
                        icon={<Users className="w-6 h-6" />}
                        title="MENTORING PHASE"
                        badge="Between Phase 2 & Phase 3"
                        color="from-purple-500 to-pink-500"
                        delay={0.15}
                    >
                        <Section
                            icon="🔹"
                            title="What Happens"
                            items={[
                                'Finalist teams receive exclusive mentoring',
                                'Guidance provided by: SIH Grand Finalists, Domain and technical mentors'
                            ]}
                        />

                        <Section
                            icon="🔹"
                            title="Mentors Help Teams With"
                            items={[
                                'Technical and architectural improvements',
                                'Correcting design or implementation gaps',
                                'UI/UX and presentation enhancement',
                                'Making the solution competition-ready'
                            ]}
                        />

                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20 text-sm">
                            <strong>📌 Note:</strong> Mentorship is advisory and does not directly affect judging scores.
                        </div>
                    </PhaseCard>

                    {/* Round 3 */}
                    <PhaseCard
                        icon={<Trophy className="w-6 h-6" />}
                        title="ROUND 3 – Grand Finale"
                        badge="FINAL ROUND"
                        color="from-pink-500 to-rose-600"
                        delay={0.2}
                    >
                        <Section
                            icon="🔹"
                            title="What Participants Do"
                            items={[
                                'Present a fully refined and completed solution',
                                'Incorporate mentor feedback',
                                'Demonstrate: End-to-end working of the solution, Real-world use case, Scalability and future scope'
                            ]}
                        />

                        <Section
                            icon="🔹"
                            title="What Participants Present"
                            items={[
                                'Final pitch presentation',
                                'Live product demo',
                                'System architecture and technical explanation',
                                'Clear articulation of impact and value proposition'
                            ]}
                        />

                        <Section
                            icon="🔹"
                            title="What Judges Evaluate"
                            items={[
                                'Innovation and uniqueness',
                                'Technical depth and execution quality',
                                'Effectiveness of blockchain integration',
                                'Real-world applicability and scalability',
                                'Presentation quality and Q&A handling'
                            ]}
                        />

                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-sm flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                            <div><strong>Outcome:</strong> Top teams are declared winners. Special recognitions and awards are announced during the finale.</div>
                        </div>
                    </PhaseCard>
                </div>

                {/* General Rules Section */}
                <div className="max-w-6xl mx-auto px-4 mb-12">
                    <Reveal delay={0.25}>
                        <div className="text-center mb-8">
                            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-2">General Rules & Instructions</h2>
                            <p className="text-sm md:text-base text-[#fbe9bb]">Essential guidelines for all participants</p>
                        </div>
                    </Reveal>

                    <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                        {rulesData.map((rule, i) => (
                            <RulesSection key={rule.title} title={rule.title} items={rule.items} delay={0.3 + i * 0.05} />
                        ))}
                    </div>
                </div>

                {/* Important Notice */}
                <Reveal delay={0.5}>
                    <div className="max-w-4xl mx-auto px-4">
                        <div className="glass-strong rounded-2xl p-5 md:p-6 flex items-start gap-4">
                                <AlertCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                                <div className="text-sm md:text-base text-[#fbe9bb]">
                                    <strong className="text-yellow-400">Important:</strong> All submissions must be original. Plagiarism or misrepresentation will lead to disqualification. Teams must adhere strictly to deadlines. Judges' decisions are final and binding. Organizers reserve the right to make necessary changes to the schedule.
                                </div>
                            </div>
                    </div>
                </Reveal>

                {/* CTA */}
                <motion.div
                    className="mt-10 md:mt-14 flex justify-center px-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <a
                        href="/problem-statement"
                        className="btn-primary px-6 py-3 rounded-full hover:scale-105 transition-transform"
                    >
                        View Problem Statements
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Guidelines;
