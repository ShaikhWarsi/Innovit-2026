import { useState, useEffect } from 'react';

const MOBILE_BREAKPOINT = 768;

/**
 * Custom hook to detect if the user is on a mobile device
 * Checks both screen width and user agent for comprehensive detection
 */
export const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(() => {
        if (typeof window === 'undefined') return false;
        return window.innerWidth <= MOBILE_BREAKPOINT;
    });

    useEffect(() => {
        const checkMobile = () => {
            const width = window.innerWidth;
            const isMobileWidth = width <= MOBILE_BREAKPOINT;

            // Also check user agent for mobile devices
            const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
            );

            setIsMobile(isMobileWidth || isMobileUA);
        };

        // Check on mount
        checkMobile();

        // Add resize listener with debounce
        let timeoutId;
        const handleResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(checkMobile, 150);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timeoutId);
        };
    }, []);

    return isMobile;
};

export default useIsMobile;
