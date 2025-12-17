import React from 'react';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import Rounds from './components/Rounds';
import Prizes from './components/Prizes';
import Mentoring from './components/Mentoring';
import Footer from './components/Footer';
import { GlobalSpotlight } from './components/MagicEffects';

function App() {
  return (
    <div className="min-h-screen">
      <GlobalSpotlight
        enabled={true}
        spotlightRadius={300}
        glowColor="139, 92, 246"
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
