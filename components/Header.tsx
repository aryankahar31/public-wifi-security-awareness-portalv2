import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/survey', label: 'Survey' },
  { path: '/test', label: 'Test' },
  { path: '/results', label: 'Results' },
  { path: '/analysis', label: 'Analysis' },
  { path: '/detailed-analysis', label: 'Detailed Analysis' },
  { path: '/resources', label: 'Resources' },
  { path: '/tools', label: 'Tools' },
  { path: '/calculator', label: 'Calculator' },
  { path: '/contact', label: 'Contact' },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const NavItem: React.FC<{ path: string; label: string }> = ({ path, label }) => (
    <li className="shrink whitespace-nowrap">
      <NavLink
        to={path}
        className={({ isActive }) =>
          `block px-3 py-[6px] rounded-full font-medium transition-colors duration-300 text-xs ${
            isActive
              ? 'bg-primary text-black'
              : 'text-text-primary-light dark:text-text-primary-dark hover:bg-border-light dark:hover:bg-border-dark hover:text-text-primary-light dark:hover:text-white'
          }`
        }
      >
        {label}
      </NavLink>
    </li>
  );

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50">
      <nav className="flex items-center justify-between p-2 bg-card-light/80 dark:bg-card-dark/80 backdrop-blur-xl border border-border-light dark:border-border-dark rounded-full shadow-lg">

        {/* ---- Logo ---- */}
        <NavLink to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-full flex items-center justify-center border border-border-light dark:border-border-dark">
            <span className="text-primary font-bold text-sm">A</span>
          </div>
          <span className="hidden sm:inline font-semibold text-xs tracking-wide text-text-primary-light dark:text-text-primary-dark">
            AlienXEdu
          </span>
        </NavLink>

        {/* ---- Nav Items (Fit without scrolling) ---- */}
        <ul className="hidden xl:flex items-center gap-[6px] whitespace-nowrap">
          {navLinks.map(link => <NavItem key={link.path} {...link} />)}
        </ul>

        {/* ---- Theme toggle + menu (mobile) ---- */}
        <div className="flex items-center gap-2 shrink-0">
          <ThemeToggle />

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary xl:hidden"
          >
            <svg className="w-6 h-6 text-text-primary-light dark:text-text-primary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
            </svg>
          </button>
        </div>
      </nav>

      {/* ---- Mobile navbar ---- */}
      {isMenuOpen && (
        <div className="xl:hidden mt-2 bg-card-light/95 dark:bg-card-dark/95 backdrop-blur-xl border border-border-light dark:border-border-dark rounded-2xl shadow-lg p-2">
          <ul className="flex flex-col space-y-1">
            {navLinks.map(link => <NavItem key={link.path} {...link} />)}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
