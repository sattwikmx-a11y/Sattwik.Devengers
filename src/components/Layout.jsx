import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X, Globe, Moon, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import EmergencyWidget from './EmergencyWidget';

const Layout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'AI Assistant', path: '/assistant' },
    { name: 'Services', path: '/services' },
    { name: 'Docs', path: '/documents' },
    { name: 'Report', path: '/report' },
    { name: 'Tracker', path: '/tracker' },
    { name: 'Map', path: '/map' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="glass-panel px-6 py-4 flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative">
                <Shield className="w-8 h-8 text-primary group-hover:text-secondary transition-colors" />
                <div className="absolute inset-0 bg-primary blur-lg opacity-50 group-hover:opacity-80 group-hover:bg-secondary transition-all"></div>
              </div>
              <span className="font-poppins font-bold text-xl tracking-wide">
                Sattwik<span className="text-secondary">.Safety</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-white ${
                    location.pathname === link.path ? 'text-white' : 'text-muted'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="hidden md:flex items-center gap-4">
              <button className="p-2 text-muted hover:text-white transition-colors" aria-label="Language">
                <Globe className="w-5 h-5" />
              </button>
              <button className="p-2 text-muted hover:text-white transition-colors" aria-label="Toggle Theme">
                <Moon className="w-5 h-5" />
              </button>
              <div className="w-px h-6 bg-white/20"></div>
              <button className="p-2 text-muted hover:text-white transition-colors flex items-center gap-2" aria-label="Profile">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                  <User className="w-4 h-4" />
                </div>
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-24 left-6 right-6 p-4 glass-panel flex flex-col gap-4 md:hidden"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block py-2 text-lg font-medium text-white/80 hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-white/10 my-2"></div>
              <div className="flex justify-around">
                <button className="p-2 text-white"><Globe className="w-5 h-5" /></button>
                <button className="p-2 text-white"><Moon className="w-5 h-5" /></button>
                <button className="p-2 text-white"><User className="w-5 h-5" /></button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow pt-32 pb-12 px-6 max-w-7xl mx-auto w-full">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-muted text-sm mt-auto">
        <p>&copy; {new Date().getFullYear()} Sattwik.Safety. All rights reserved.</p>
        <p className="mt-2 flex items-center justify-center gap-1">
          Powered by <span className="font-semibold text-white">AI</span> for a safer tomorrow.
        </p>
      </footer>
      
      <EmergencyWidget />
    </div>
  );
};

export default Layout;
