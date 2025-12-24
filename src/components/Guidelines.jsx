import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DecryptedText from './DecryptedText';
import { ParticleCard } from './MagicEffects';
import { useIsMobile } from '../hooks/useIsMobile';
import Reveal from './Reveal';
import { Lightbulb, Code, Trophy, Users, AlertCircle, CheckCircle, X, FileText, Send, Download } from 'lucide-react';

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
    const [activeModal, setActiveModal] = useState(null); // null, 'register', 'submit', 'template'

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

                {/* Registration Instructions Section */}
                <div className="max-w-6xl mx-auto px-4 mb-12">
                    <Reveal delay={0.25}>
                        <div className="text-center mb-8">
                            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-2">How to Participate</h2>
                            <p className="text-sm md:text-base text-[#fbe9bb]">Step-by-step guide to register and submit your idea</p>
                        </div>
                    </Reveal>

                    <div className="grid md:grid-cols-3 gap-4 md:gap-6">
                        <Reveal delay={0.3}>
                            <button
                                onClick={() => setActiveModal('register')}
                                className="glass-strong p-6 rounded-2xl hover:border-yellow-500/40 transition-all group cursor-pointer"
                            >
                                <div className="flex flex-col items-center text-center gap-3">
                                    <div className="p-4 rounded-xl bg-gradient-to-br from-green-500 to-green-600">
                                        <FileText className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold text-[#fff1ce] group-hover:text-yellow-400 transition-colors">
                                        📝 How to Register
                                    </h3>
                                    <p className="text-sm text-[#fbe9bb]/80">
                                        Complete registration process
                                    </p>
                                </div>
                            </button>
                        </Reveal>

                        <Reveal delay={0.35}>
                            <button
                                onClick={() => setActiveModal('submit')}
                                className="glass-strong p-6 rounded-2xl hover:border-yellow-500/40 transition-all group cursor-pointer"
                            >
                                <div className="flex flex-col items-center text-center gap-3">
                                    <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600">
                                        <Send className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold text-[#fff1ce] group-hover:text-yellow-400 transition-colors">
                                        🧠 How to Submit Idea
                                    </h3>
                                    <p className="text-sm text-[#fbe9bb]/80">
                                        Phase 1 idea submission guide
                                    </p>
                                </div>
                            </button>
                        </Reveal>

                        <Reveal delay={0.4}>
                            <button
                                onClick={() => setActiveModal('template')}
                                className="glass-strong p-6 rounded-2xl hover:border-yellow-500/40 transition-all group cursor-pointer"
                            >
                                <div className="flex flex-col items-center text-center gap-3">
                                    <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600">
                                        <Download className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold text-[#fff1ce] group-hover:text-yellow-400 transition-colors">
                                        📄 PPT Template Guide
                                    </h3>
                                    <p className="text-sm text-[#fbe9bb]/80">
                                        Download official template
                                    </p>
                                </div>
                            </button>
                        </Reveal>
                    </div>
                </div>

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
                                'Identify a real-world problem relevant to India',
                                'Design a solution that contributes towards Atmanirbhar Bharat',
                                'Clearly explain: Problem understanding in the Indian context, Proposed solution approach, How the solution supports self-reliance, transparency, or efficiency, Innovation and uniqueness of the idea, Expected real-world impact at scale, Feasibility of implementation'
                            ]}
                        />
                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-sm">
                            <strong>📌 Primary focus:</strong> Clarity of thought, innovation, and national relevance.
                        </div>
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-sm">
                            <strong>📌 Note:</strong> The choice of technology is flexible — impact and problem-solution alignment matter more than tools used.
                        </div>

                        <Section
                            icon="🔹"
                            title="What Participants Submit"
                            items={[
                                'Idea presentation (PPT) / document as per the provided template',
                                'No source code required',
                                'No prototype, UI, or demo required'
                            ]}
                        />

                        <Section
                            icon="🔹"
                            title="What Evaluators Check"
                            items={[
                                'Depth of problem understanding and relevance to India',
                                'Innovation and originality of the solution',
                                'Alignment with the vision of Atmanirbhar Bharat',
                                'Practical feasibility and scalability',
                                'Potential social, economic, or systemic impact'
                            ]}
                        />

                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-sm flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                            <div><strong>Outcome:</strong> Best and most impactful ideas are shortlisted. Selected teams qualify for Phase 2 (Prototype & Development Round).</div>
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

            {/* Modals */}
            <AnimatePresence>
                {activeModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        onClick={() => setActiveModal(null)}
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
                                onClick={() => setActiveModal(null)}
                                className="absolute top-4 right-4 p-2 rounded-full glass hover:bg-red-500/20 transition-colors"
                            >
                                <X className="w-6 h-6 text-[#fff1ce]" />
                            </button>

                            {/* Registration Modal */}
                            {activeModal === 'register' && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl md:text-3xl font-bold gradient-text pr-12">
                                        📝 How to Register for INNOVIT 2026
                                    </h2>
                                    <p className="text-[#fbe9bb]">Step-by-Step Registration Process</p>

                                    <div className="space-y-4">
                                        <div className="glass p-4 rounded-lg">
                                            <h3 className="text-lg font-bold text-yellow-400 mb-2">1️⃣ Form your team</h3>
                                            <ul className="space-y-1 text-[#fbe9bb] text-sm ml-4">
                                                <li>• Team size must be minimum 2 and maximum 4 members</li>
                                                <li>• Select one Team Leader (primary point of contact)</li>
                                            </ul>
                                        </div>

                                        <div className="glass p-4 rounded-lg">
                                            <h3 className="text-lg font-bold text-yellow-400 mb-2">2️⃣ Open the Registration Form</h3>
                                            <a href="https://forms.gle/Fw2BtK7Dhxs1YWo6A" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline text-sm">
                                                🔗 https://forms.gle/Fw2BtK7Dhxs1YWo6A
                                            </a>
                                        </div>

                                        <div className="glass p-4 rounded-lg">
                                            <h3 className="text-lg font-bold text-yellow-400 mb-2">3️⃣ Fill in team details</h3>
                                            <ul className="space-y-1 text-[#fbe9bb] text-sm ml-4">
                                                <li>• Team name</li>
                                                <li>• Team Leader details</li>
                                                <li>• Team member details</li>
                                            </ul>
                                        </div>

                                        <div className="glass p-4 rounded-lg">
                                            <h3 className="text-lg font-bold text-yellow-400 mb-2">4️⃣ Complete the registration fee payment</h3>
                                            <ul className="space-y-1 text-[#fbe9bb] text-sm ml-4">
                                                <li>• ₹40 per member</li>
                                                <li>• Team Leader pays on behalf of the team</li>
                                            </ul>
                                        </div>

                                        <div className="glass p-4 rounded-lg">
                                            <h3 className="text-lg font-bold text-yellow-400 mb-2">5️⃣ Upload payment proof</h3>
                                            <p className="text-[#fbe9bb] text-sm ml-4">• Upload clear screenshot/PDF of the payment confirmation</p>
                                        </div>

                                        <div className="glass p-4 rounded-lg">
                                            <h3 className="text-lg font-bold text-yellow-400 mb-2">6️⃣ Confirm consent & submit</h3>
                                            <ul className="space-y-1 text-[#fbe9bb] text-sm ml-4">
                                                <li>• Verify all details</li>
                                                <li>• Submit the form</li>
                                            </ul>
                                        </div>

                                        <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                                            <p className="text-sm text-[#fbe9bb]">
                                                <strong className="text-green-400">📩 After verification:</strong> The Phase-1 Idea Submission link will be shared via email with the Team Leader.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Idea Submission Modal */}
                            {activeModal === 'submit' && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl md:text-3xl font-bold gradient-text pr-12">
                                        🧠 How to Submit Phase-1 Idea
                                    </h2>
                                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                                        <p className="text-sm text-[#fbe9bb]">
                                            <strong className="text-red-400">⚠️ Important:</strong> Only registered teams can submit ideas.
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="glass p-4 rounded-lg">
                                            <h3 className="text-lg font-bold text-yellow-400 mb-2">1️⃣ Check your email</h3>
                                            <p className="text-[#fbe9bb] text-sm ml-4">• Team Leader will receive the Phase-1 Idea Submission form link</p>
                                        </div>

                                        <div className="glass p-4 rounded-lg">
                                            <h3 className="text-lg font-bold text-yellow-400 mb-2">2️⃣ Select your problem statement</h3>
                                            <p className="text-[#fbe9bb] text-sm ml-4">• Choose one assigned problem statement/theme</p>
                                        </div>

                                        <div className="glass p-4 rounded-lg">
                                            <h3 className="text-lg font-bold text-yellow-400 mb-2">3️⃣ Prepare your idea presentation</h3>
                                            <ul className="space-y-1 text-[#fbe9bb] text-sm ml-4">
                                                <li>• Follow the official PPT template only</li>
                                                <li>• Maximum 8 slides (including title slide)</li>
                                                <li>• Focus on:</li>
                                                <li className="ml-4">○ Problem understanding</li>
                                                <li className="ml-4">○ Proposed solution</li>
                                                <li className="ml-4">○ Innovation & impact</li>
                                                <li className="ml-4">○ Feasibility</li>
                                            </ul>
                                        </div>

                                        <div className="glass p-4 rounded-lg">
                                            <h3 className="text-lg font-bold text-yellow-400 mb-2">4️⃣ Convert PPT to PDF</h3>
                                            <p className="text-[#fbe9bb] text-sm ml-4">• Save the file as TeamName.pdf</p>
                                        </div>

                                        <div className="glass p-4 rounded-lg">
                                            <h3 className="text-lg font-bold text-yellow-400 mb-2">5️⃣ Upload PDF & submit</h3>
                                            <p className="text-[#fbe9bb] text-sm ml-4">• Upload via the Phase-1 Google Form only</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Template Download Modal */}
                            {activeModal === 'template' && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl md:text-3xl font-bold gradient-text pr-12">
                                        📄 How to Download the Official PPT Template
                                    </h2>

                                    <div className="space-y-4">
                                        <div className="glass p-4 rounded-lg">
                                            <h3 className="text-lg font-bold text-yellow-400 mb-2">1️⃣ Open the official PPT template link</h3>
                                            <p className="text-[#fbe9bb] text-sm ml-4">• Link will be shared with registered teams via email</p>
                                        </div>

                                        <div className="glass p-4 rounded-lg">
                                            <h3 className="text-lg font-bold text-yellow-400 mb-2">2️⃣ Click File → Download</h3>
                                            <p className="text-[#fbe9bb] text-sm ml-4">• In Google Slides or PowerPoint Online</p>
                                        </div>

                                        <div className="glass p-4 rounded-lg">
                                            <h3 className="text-lg font-bold text-yellow-400 mb-2">3️⃣ Select Microsoft PowerPoint (.pptx)</h3>
                                            <p className="text-[#fbe9bb] text-sm ml-4">• Download in editable format</p>
                                        </div>

                                        <div className="glass p-4 rounded-lg">
                                            <h3 className="text-lg font-bold text-yellow-400 mb-2">4️⃣ Prepare your slides</h3>
                                            <p className="text-[#fbe9bb] text-sm ml-4">• Do not change the structure or template design</p>
                                        </div>

                                        <div className="glass p-4 rounded-lg">
                                            <h3 className="text-lg font-bold text-yellow-400 mb-2">5️⃣ Export final file as PDF</h3>
                                            <p className="text-[#fbe9bb] text-sm ml-4">• Before submission, convert to PDF format</p>
                                        </div>

                                        <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                                            <p className="text-sm text-[#fbe9bb]">
                                                <strong className="text-blue-400">📌 Note:</strong> Template link will be shared with registered teams via email.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Guidelines;
