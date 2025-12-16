import React from 'react';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import Rounds from './components/Rounds';
import Mentoring from './components/Mentoring';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Timeline />
      <Rounds />
      <Mentoring />
      <Footer />
    </div>
  );
}

export default App;
