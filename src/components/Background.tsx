import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Background = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;
        let particles: Array<{
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            opacity: number;
            hue: number;
        }> = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const createParticles = () => {
            const count = Math.min(100, Math.floor((window.innerWidth * window.innerHeight) / 15000));
            particles = [];
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.3,
                    vy: (Math.random() - 0.5) * 0.3,
                    size: Math.random() * 2 + 0.5,
                    opacity: Math.random() * 0.5 + 0.2,
                    hue: 40 + Math.random() * 20 // Gold to amber range
                });
            }
        };

        const drawConnections = () => {
            const maxDistance = 150;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < maxDistance) {
                        const opacity = (1 - distance / maxDistance) * 0.15;
                        ctx!.beginPath();
                        ctx!.strokeStyle = `hsla(45, 92%, 55%, ${opacity})`;
                        ctx!.lineWidth = 0.5;
                        ctx!.moveTo(particles[i].x, particles[i].y);
                        ctx!.lineTo(particles[j].x, particles[j].y);
                        ctx!.stroke();
                    }
                }
            }
        };

        const animate = () => {
            ctx.fillStyle = 'rgba(10, 10, 20, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Wrap around edges
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;

                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${particle.hue}, 92%, 55%, ${particle.opacity})`;
                ctx.fill();

                // Glow effect
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
                const gradient = ctx.createRadialGradient(
                    particle.x, particle.y, 0,
                    particle.x, particle.y, particle.size * 3
                );
                gradient.addColorStop(0, `hsla(${particle.hue}, 92%, 55%, ${particle.opacity * 0.3})`);
                gradient.addColorStop(1, 'transparent');
                ctx.fillStyle = gradient;
                ctx.fill();
            });

            drawConnections();
            animationId = requestAnimationFrame(animate);
        };

        resize();
        createParticles();
        animate();

        window.addEventListener('resize', () => {
            resize();
            createParticles();
        });

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
            {/* Base gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-[hsl(260,70%,8%)]" />
            
            {/* Radial gradient overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(260,70%,12%)_0%,_transparent_70%)]" />
            
            {/* Grid pattern */}
            <div className="absolute inset-0 bg-grid opacity-30" />
            
            {/* Animated canvas particles */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 opacity-60"
            />
            
            {/* Floating orbs */}
            <motion.div
                className="floating-orb w-[600px] h-[600px] bg-primary/10 -top-40 -left-40"
                animate={{
                    x: [0, 50, -30, 0],
                    y: [0, 30, 60, 0],
                    scale: [1, 1.1, 0.95, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            
            <motion.div
                className="floating-orb w-[500px] h-[500px] bg-accent/10 top-1/3 -right-40"
                animate={{
                    x: [0, -40, 20, 0],
                    y: [0, 50, -20, 0],
                    scale: [1, 0.9, 1.1, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
            />
            
            <motion.div
                className="floating-orb w-[400px] h-[400px] bg-gold/5 bottom-20 left-1/4"
                animate={{
                    x: [0, 60, -40, 0],
                    y: [0, -30, 40, 0],
                    scale: [1, 1.05, 0.98, 1],
                }}
                transition={{
                    duration: 22,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 5
                }}
            />

            {/* Subtle noise overlay */}
            <div className="noise-overlay" />
            
            {/* Vignette effect */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_hsl(240,20%,6%)_100%)] opacity-60" />
        </div>
    );
};

export default Background;
