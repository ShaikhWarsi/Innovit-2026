import React from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '../hooks/useIsMobile';

const LiveStream = () => {
    const isMobile = useIsMobile();

    return (
        <section className="relative px-4 py-12 overflow-hidden sm:py-16 md:py-20">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40"></div>

            <div className="relative z-10 max-w-5xl mx-auto">
                {/* Section Header */}
                <motion.div
                    className="mb-8 text-center sm:mb-12"
                    initial={isMobile ? {} : { opacity: 0, y: 20 }}
                    whileInView={isMobile ? {} : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="mb-3 text-3xl font-black sm:text-4xl md:text-5xl sm:mb-4">
                        <span className="gradient-text">Watch Launch Session </span>
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg text-[#fff1ce]/80 max-w-2xl mx-auto">
                        Join us for INNOVIT 2026 updates and Phase 1 information
                    </p>
                </motion.div>

                {/* YouTube Embed */}
                <motion.div
                    className="p-3 border glass-strong sm:p-4 md:p-6 rounded-2xl border-yellow-500/20"
                    initial={isMobile ? {} : { opacity: 0, scale: 0.95 }}
                    whileInView={isMobile ? {} : { opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                        <iframe
                            className="absolute top-0 left-0 w-full h-full rounded-xl"
                            src="https://www.youtube.com/embed/9uVy8RJVCjM"
                            title="INNOVIT 2026 Live Stream"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>

                    {/* Stream Info */}
                    <div className="flex flex-wrap items-center justify-center gap-3 mt-4 text-xs sm:mt-6 sm:gap-4 sm:text-sm">
                        
                        <a
                            href="https://youtube.com/live/9uVy8RJVCjM?feature=share"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass px-3 sm:px-4 py-2 rounded-lg text-[#fff1ce] hover:text-yellow-400 hover:border-yellow-400/40 transition-all duration-200"
                        >
                            <span className="text-yellow-400">📺</span> Watch on YouTube
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default LiveStream;
