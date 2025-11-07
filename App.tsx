import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Survey from './pages/Survey';
import Results from './pages/Results';
import Analysis from './pages/Analysis';
import DetailedAnalysis from './pages/DetailedAnalysis'; // New import
import Contact from './pages/Contact';
import Test from './pages/Test';
import Resources from './pages/Resources';
import Calculator from './pages/Calculator';
import Tools from './pages/Tools';
import GlitchBackground from './components/GlitchBackground';
import useTheme from './hooks/useTheme';

const AppRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/results" element={<Results />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/detailed-analysis" element={<DetailedAnalysis />} /> {/* New route */}
        <Route path="/resources" element={<Resources />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/test" element={<Test />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  useTheme(); // Hook applies theme to the app but is not needed by GlitchBackground

  return (
    <HashRouter>
      <GlitchBackground />
      <Layout>
        <AppRoutes />
      </Layout>
    </HashRouter>
  );
};

export default App;