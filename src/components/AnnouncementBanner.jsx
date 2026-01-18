import React from 'react';
import ScrollVelocity from './ScrollVelocity';

const AnnouncementBanner = () => {
    return (
        <div className="absolute top-[68px] md:hidden left-0 right-0 z-40 bg-gradient-to-r from-yellow-500/20 via-yellow-400/30 to-yellow-500/20 border-y border-yellow-500/30 backdrop-blur-sm">
            <ScrollVelocity
                texts={[
                    '!!! Phase 2 Open - Submit Your Prototype by Feb 7, 2026! 🚀',
                ]}
                velocity={50}
                numCopies={8}
                className="font-semibold text-yellow-300"
                parallaxClassName="py-1.5 md:py-1"
                scrollerClassName="flex whitespace-nowrap text-sm md:text-[15px]"
                parallaxStyle={{}}
                scrollerStyle={{}}
                damping={50}
                stiffness={400}
                velocityMapping={{ input: [0, 1000], output: [0, 3] }}
            />
        </div>
    );
};

export default AnnouncementBanner;
