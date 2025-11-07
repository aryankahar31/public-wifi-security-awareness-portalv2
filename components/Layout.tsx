import React from 'react';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col font-sans text-text-primary-light dark:text-text-primary-dark transition-colors duration-300">
      <Header />
      <main className="flex-grow pt-28 pb-12 z-10 relative">
        <div className="container mx-auto px-4">
          {children}
        </div>
      </main>
      <footer className="w-full py-6 text-center text-text-secondary-light dark:text-text-secondary-dark bg-card-light/80 dark:bg-card-dark/80 backdrop-blur-xl border-t border-border-light dark:border-border-dark z-10 relative">
        <p>Public Wi-Fi Security Initiative &copy; 2025-26</p>
      </footer>
    </div>
  );
};

export default Layout;