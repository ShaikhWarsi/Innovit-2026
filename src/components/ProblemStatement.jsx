import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import DecryptedText from './DecryptedText';
import { ParticleCard } from './MagicEffects';
import { useIsMobile } from '../hooks/useIsMobile';
import Reveal from './Reveal';

const TrackCard = ({ title, colorClass = 'from-yellow-500 to-amber-600', problems = [], delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        className="relative"
    >
        <ParticleCard className="magic-card rounded-2xl" particleCount={8} glowColor="245, 188, 34" enableTilt enableBorderGlow>
            <div className="glass-strong rounded-2xl p-5 md:p-6">
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 bg-gradient-to-r ${colorClass}`}>
                        TRACK
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold mb-3 gradient-text">{title}</h3>
                    <ul className="space-y-2 text-sm md:text-base text-[#fbe9bb]">
                        {problems.map((p, i) => (
                            <li key={i} className="flex gap-2 items-start">
                                <span className="text-yellow-400 mt-1">•</span>
                                <span>{p}</span>
                            </li>
                        ))}
                    </ul>
            </div>
        </ParticleCard>
    </motion.div>
);

const ProblemStatement = () => {
    const isMobile = useIsMobile();
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [isLocked, setIsLocked] = useState(true);

    // Release: 26 Dec 2025, 3 PM (local time)
    const releaseDate = new Date('2025-12-26T15:00:00');

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const diff = releaseDate - now;
            if (diff > 0) {
                setIsLocked(true);
                setTimeLeft({
                    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((diff / 1000 / 60) % 60),
                    seconds: Math.floor((diff / 1000) % 60)
                });
            } else {
                setIsLocked(false);
            }
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const tracks = [
        {
            title: 'On-Chain Governance & Identity',
            colorClass: 'from-amber-500 to-orange-600',
            problems: [
                'Lorem DAO-logicum: quadratic ipsum votingum with soulbound sprinkles.',
                'Civic ID vault: verifiable claims custard with zk-flavor.',
                'Delegate galaxy: meta-governance orchestrator for multi-realm councils.'
            ]
        },
        {
            title: 'DeFi & Payments',
            colorClass: 'from-yellow-500 to-amber-600',
            problems: [
                'Streaming treasury pipes: drip-drip payouts with escrow glitter.',
                'Micro-payments rail: sub-cent lightning-esque swirls on L2 gelato.',
                'Risk oracle blender: composable scores for under-collateralized sorcery.'
            ]
        },
        {
            title: 'Supply Chain & Provenance',
            colorClass: 'from-orange-500 to-rose-600',
            problems: [
                'Chill chain: cold-storage traceability with QR pixie dust.',
                'NFT twins: physical-to-digital bridge for shiny widgets.',
                'Recall radar: tamper-proof alerts and batch lineage marmalade.'
            ]
        },
        {
            title: 'Social & Community Apps',
            colorClass: 'from-pink-500 to-rose-600',
            problems: [
                'Creator passes: token-gated goodies with fair drops confetti.',
                'Reputation nectar: on-chain kudos and spam shield spritz.',
                'Event magic: verifiable check-ins and raffle sparkle.'
            ]
        },
        {
            title: 'Infra, Tooling & Security',
            colorClass: 'from-blue-500 to-cyan-500',
            problems: [
                'DevX wand: scaffold + deploy potion with audit lint shimmer.',
                'Watcher sentinel: anomaly canary for mempool goblins.',
                'Gas-optimizer kit: byte-slimmer with tasty assembly syrup.'
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
                            text="Problem Statements"
                            animateOn="view"
                            speed={8}
                            className="gradient-text"
                            encryptedClassName="text-yellow-200/50"
                        />
                    </h1>
                    
                </motion.div>

                {/* Countdown Overlay (before release) */}
                {isLocked && (
                    <motion.div
                        className="max-w-3xl mx-auto px-4 mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <ParticleCard
                            className="magic-card rounded-2xl"
                                particleCount={isMobile ? 3 : 8}
                                glowColor="245, 188, 34"
                                enableTilt={!isMobile}
                                enableMagnetism={!isMobile}
                                clickEffect={!isMobile}
                                enableBorderGlow={!isMobile}
                            >
                                <div className="glass-strong p-5 md:p-6 rounded-2xl text-center">
                                    <Reveal delay={0.05}>
                                        <h3 className="text-xl md:text-2xl font-bold mb-2 gradient-text">Will release on 26 Dec, 3 PM IST</h3>
                                    </Reveal>
                                    <Reveal delay={0.1}>
                                        <p className="text-sm md:text-base text-[#fbe9bb] mb-4">Problem statements are locked until release.</p>
                                    </Reveal>
                                    <Reveal delay={0.15}>
                                        <div className="flex justify-center gap-2 sm:gap-3">
                                            {[
                                                { label: 'Days', value: timeLeft.days },
                                                { label: 'Hours', value: timeLeft.hours },
                                                { label: 'Minutes', value: timeLeft.minutes },
                                                { label: 'Seconds', value: timeLeft.seconds }
                                            ].map((item, index) => (
                                                <div key={item.label} className="glass p-2 sm:p-3 rounded-xl min-w-[64px]">
                                                    <div className="text-2xl sm:text-3xl font-bold gradient-text">
                                                        {String(item.value).padStart(2, '0')}
                                                    </div>
                                                    <div className="text-[10px] sm:text-xs text-[#fbe9bb] uppercase tracking-wider">{item.label}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </Reveal>
                                </div>
                        </ParticleCard>
                    </motion.div>
                )}

                {/* Tracks (blurred until release) */}
                <div
                    className="max-w-6xl mx-auto px-4 grid gap-4 md:gap-6 md:grid-cols-2"
                    style={isLocked ? { filter: 'blur(6px)', pointerEvents: 'none' } : {}}
                    aria-hidden={isLocked}
                >
                    {tracks.map((t, i) => (
                        <TrackCard key={t.title} title={t.title} colorClass={t.colorClass} problems={t.problems} delay={i * 0.08} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProblemStatement;
