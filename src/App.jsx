import React from 'react';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import Rounds from './components/Rounds';
import Prizes from './components/Prizes';
import Mentoring from './components/Mentoring';
import Footer from './components/Footer';
import { GlobalSpotlight } from './components/MagicEffects';
import { useIsMobile } from './hooks/useIsMobile';

function App() {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen">
      {/* Disable GlobalSpotlight on mobile for performance */}
      <GlobalSpotlight
        enabled={!isMobile}
        spotlightRadius={300}
        glowColor="245, 188, 34"
        targetSelector=".magic-card"
      />
      <Hero />
      <Timeline />
      <Rounds />
      <Mentoring />
      <Prizes />
      <Footer />
    </div>
  );
}

export default App;
