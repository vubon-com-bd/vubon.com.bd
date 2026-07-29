/**
 * Customer Header Component
 * Responsive header with navigation, user menu, and mobile toggle
 */

import React, { useState } from 'react';
import { Button } from '../../ui/Button.js';

export interface HeaderProps {
  logoUrl?: string;
  logoText?: string;
  navLinks?: Array<{ label: string; href: string }>;
}

const defaultNavLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
];

export const Header: React.FC<HeaderProps> = ({
  logoUrl = '',
  logoText = 'Vubon',
  navLinks = defaultNavLinks,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <nav className="container mx-auto px-4" role="navigation" aria-label="Main navigation">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            {logoUrl ? (
              <img src={logoUrl} alt={logoText} className="h-8 w-auto" />
            ) : (
              <span className="text-xl font-bold text-primary-600">{logoText}</span>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-700 transition-colors hover:text-primary-600"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Auth Buttons - always show login/register since no user */}
          <div className="hidden items-center space-x-4 md:flex">
            <a href="/login">
              <Button variant="ghost" size="sm">
                Log In
              </Button>
            </a>
            <a href="/register">
              <Button variant="primary" size="sm">
                Sign Up
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="rounded-md p-2 text-gray-600 hover:bg-gray-100 md:hidden"
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div id="mobile-menu" className="py-4 md:hidden">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col space-y-2 border-t border-gray-200 pt-4">
                <a
                  href="/login"
                  className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Log In
                </a>
                <a
                  href="/register"
                  className="block px-3 py-2 text-sm font-medium text-primary-600 hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

Header.displayName = 'Header';
