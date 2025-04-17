'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import HeroTypewriter from './components/HeroTypewriter';
import LanguageSelector from './components/LanguageSelector';
import { useLanguage } from './context/LanguageContext';

export default function Home() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menu = document.getElementById('mobile-menu');
      const button = document.getElementById('menu-button');
      if (menu && !menu.contains(event.target as Node) && button && !button.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent scrolling when menu is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('loading');
    setErrorMessage('');
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details || 'Failed to submit');
      }

      setSubmitStatus('success');
      setEmail('');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } catch (error: any) {
      setSubmitStatus('error');
      setErrorMessage(error.message || 'There was an error. Please try again.');
      console.error('Error submitting email:', error);
    }
  };

  // Add smooth scroll handler
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <main className="min-h-screen bg-white pt-28">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-28">
            <div className="flex items-center">
              <Image
                src="/logo.png"
                alt="SegTech Logo"
                width={400}
                height={133}
                className="w-auto h-20 md:h-24"
                priority
                quality={100}
                style={{ objectFit: 'contain' }}
              />
            </div>
            {/* Mobile menu button */}
            <button
              id="menu-button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6 text-primary-dark"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
            {/* Desktop menu */}
            <div className="hidden md:flex space-x-8 text-lg">
              <a 
                href="#about" 
                onClick={(e) => handleNavClick(e, 'about')}
                className="text-primary-dark hover:text-primary-medium transition-all duration-300 ease-in-out"
              >
                {t.nav.about}
              </a>
              <a 
                href="#benefits" 
                onClick={(e) => handleNavClick(e, 'benefits')}
                className="text-primary-dark hover:text-primary-medium transition-all duration-300 ease-in-out"
              >
                {t.nav.benefits}
              </a>
              <a 
                href="#survey" 
                onClick={(e) => handleNavClick(e, 'survey')}
                className="text-primary-dark hover:text-primary-medium transition-all duration-300 ease-in-out"
              >
                {t.nav.survey}
              </a>
              <LanguageSelector />
            </div>
          </div>
          {/* Mobile menu overlay */}
          <div
            id="mobile-menu"
            className={`md:hidden fixed inset-0 z-50 transition-all duration-300 ease-in-out ${
              isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
          >
            {/* Semi-transparent backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            
            {/* Menu content */}
            <div className={`absolute inset-y-0 right-0 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
              isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}>
              {/* Close button */}
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                aria-label="Close menu"
              >
                <svg
                  className="w-6 h-6 text-primary-dark"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="flex flex-col items-start pt-16 px-6 h-full">
                <a 
                  href="#about" 
                  onClick={(e) => {
                    handleNavClick(e, 'about');
                    setIsMobileMenuOpen(false);
                  }}
                  className="py-3 text-primary-dark hover:text-primary-medium transition-all duration-300 ease-in-out w-full border-b border-gray-200"
                >
                  {t.nav.about}
                </a>
                <a 
                  href="#benefits" 
                  onClick={(e) => {
                    handleNavClick(e, 'benefits');
                    setIsMobileMenuOpen(false);
                  }}
                  className="py-3 text-primary-dark hover:text-primary-medium transition-all duration-300 ease-in-out w-full border-b border-gray-200"
                >
                  {t.nav.benefits}
                </a>
                <a 
                  href="#survey" 
                  onClick={(e) => {
                    handleNavClick(e, 'survey');
                    setIsMobileMenuOpen(false);
                  }}
                  className="py-3 text-primary-dark hover:text-primary-medium transition-all duration-300 ease-in-out w-full border-b border-gray-200"
                >
                  {t.nav.survey}
                </a>
                <div className="mt-4 w-full">
                  <LanguageSelector />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroTypewriter />

      {/* About Section */}
      <section id="about" className="py-20 bg-background-light scroll-mt-28 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-dark mb-10">{t.about.title}</h2>
            <div className="text-lg text-gray-700 space-y-6 whitespace-pre-wrap px-4 md:px-0">
              {t.about.description}
            </div>
          </div>
        </div>
      </section>

      {/* Why SegTech Matters */}
      <section className="py-20 bg-white scroll-mt-28 border-b border-gray-200">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-dark mb-14 text-center">{t.whyMatters.title}</h2>
          <div className="grid md:grid-cols-3 gap-8 justify-center">
            <div className="p-6 bg-background-light rounded-lg shadow-sm hover:shadow-md transition duration-300 border border-gray-300">
              <h3 className="text-xl font-semibold text-primary-dark mb-4">{t.whyMatters.dataOverload.title}</h3>
              <p className="text-gray-700">{t.whyMatters.dataOverload.description}</p>
            </div>
            <div className="p-6 bg-background-light rounded-lg shadow-sm hover:shadow-md transition duration-300 border border-gray-300">
              <h3 className="text-xl font-semibold text-primary-dark mb-4">{t.whyMatters.inefficientTargeting.title}</h3>
              <p className="text-gray-700">{t.whyMatters.inefficientTargeting.description}</p>
            </div>
            <div className="p-6 bg-background-light rounded-lg shadow-sm hover:shadow-md transition duration-300 border border-gray-300">
              <h3 className="text-xl font-semibold text-primary-dark mb-4">{t.whyMatters.limitedInsights.title}</h3>
              <p className="text-gray-700">{t.whyMatters.limitedInsights.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Survey Benefits */}
      <section id="benefits" className="py-20 bg-background-light scroll-mt-28 border-b border-gray-200">
        <div className="container">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-dark mb-14 text-center">{t.benefits.title}</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {t.benefits.items.slice(0, 4).map((item, index) => (
                <div key={index} className="flex items-start bg-white p-4 rounded-lg shadow-sm border border-gray-300">
                  <span className="text-primary-light mr-3 text-xl">✓</span>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
              {t.benefits.items.slice(4).map((item, index) => (
                <div key={index + 4} className="flex items-start bg-white p-4 rounded-lg shadow-sm border border-gray-300">
                  <span className="text-primary-light mr-3 text-xl">✓</span>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="survey" className="py-20 bg-white scroll-mt-28 border-b border-gray-200">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-dark mb-10">{t.cta.title}</h2>
            <button 
              onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSeGmjiwfplwltv4AU3qt9X-kvztL7JAjxUloJYB9lXxtX6E9A/viewform?usp=dialog', '_blank')}
              className="bg-primary-medium text-white font-bold py-5 px-12 rounded-full shadow-2xl border border-primary-dark hover:bg-primary-dark hover:text-white hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-dark text-xl"
            >
              {t.cta.button}
            </button>
          </div>
        </div>
      </section>

      {/* Email Collection */}
      <section className="py-16 bg-gradient-to-r from-background-light to-white">
        <div className="container">
          <div className="max-w-md mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-dark mb-10">{t.newsletter.title}</h2>
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.newsletter.placeholder}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-medium focus:border-transparent"
                required
              />
              <button
                type="submit"
                disabled={submitStatus === 'loading'}
                className="w-full bg-primary-medium text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-primary-dark transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitStatus === 'loading' ? '...' : t.newsletter.button}
              </button>
              {submitStatus === 'success' && (
                <p className="text-green-600">{t.newsletter.success}</p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-600">{errorMessage || t.newsletter.error}</p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Footer - Compact Redesign */}
      <footer className="bg-primary-dark text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Logo and Copyright */}
            <div className="flex items-center gap-4">
              <Image
                src="/logo.png"
                alt="SegTech Logo"
                width={200}
                height={66}
                className="w-auto h-12"
                priority
                quality={100}
                style={{ objectFit: 'contain' }}
              />
              <p className="text-sm text-gray-300">© 2024 All rights reserved</p>
            </div>

            {/* Quick Links */}
            <div className="flex items-center gap-6">
              <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="text-gray-300 hover:text-white transition-colors duration-300">About</a>
              <a href="#benefits" onClick={(e) => handleNavClick(e, 'benefits')} className="text-gray-300 hover:text-white transition-colors duration-300">Benefits</a>
              <a href="#survey" onClick={(e) => handleNavClick(e, 'survey')} className="text-gray-300 hover:text-white transition-colors duration-300">Survey</a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 10.268h-3v-4.604c0-1.099-.021-2.513-1.532-2.513-1.533 0-1.768 1.197-1.768 2.434v4.683h-3v-9h2.881v1.229h.041c.401-.761 1.379-1.563 2.838-1.563 3.036 0 3.6 2.001 3.6 4.6v4.734z"/></svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M22.162 5.656c-.793.352-1.645.59-2.54.698.913-.547 1.615-1.414 1.946-2.448-.855.508-1.803.877-2.81 1.077-.807-.86-1.958-1.398-3.233-1.398-2.445 0-4.428 1.983-4.428 4.428 0 .347.039.684.114 1.008-3.682-.185-6.946-1.949-9.129-4.63-.382.656-.601 1.418-.601 2.233 0 1.54.784 2.899 1.978 3.696-.728-.023-1.413-.223-2.012-.557v.056c0 2.151 1.53 3.946 3.563 4.353-.372.102-.764.157-1.168.157-.286 0-.561-.028-.831-.08.562 1.753 2.191 3.029 4.124 3.062-1.51 1.184-3.417 1.89-5.491 1.89-.357 0-.709-.021-1.056-.062 1.957 1.256 4.285 1.99 6.787 1.99 8.142 0 12.6-6.747 12.6-12.6 0-.192-.004-.384-.013-.574.865-.624 1.615-1.404 2.209-2.292z"/></svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c-5.468 0-9.837 4.369-9.837 9.837 0 4.355 2.824 8.065 6.839 9.387.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.109-1.462-1.109-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.031 1.532 1.031.892 1.529 2.341 1.088 2.91.832.092-.646.35-1.088.636-1.339-2.221-.253-4.555-1.111-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.025a9.564 9.564 0 012.5-.336c.849.004 1.705.115 2.5.336 1.909-1.294 2.748-1.025 2.748-1.025.545 1.378.202 2.397.1 2.65.64.699 1.028 1.592 1.028 2.683 0 3.841-2.337 4.687-4.566 4.936.359.309.678.919.678 1.852 0 1.336-.012 2.417-.012 2.747 0 .267.18.577.688.48C19.176 20.064 22 16.355 22 12c0-5.468-4.369-9.837-9.837-9.837z"/></svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9 114.9-51.3 114.9-114.9S287.7 141 224.1 141zm0 186c-39.5 0-71.5-32-71.5-71.5s32-71.5 71.5-71.5 71.5 32 71.5 71.5-32 71.5-71.5 71.5zm146.4-194.3c0 14.9-12 26.9-26.9 26.9s-26.9-12-26.9-26.9 12-26.9 26.9-26.9 26.9 12 26.9 26.9zm76.1 27.2c-1.7-35.3-9.9-66.7-36.2-92.1S388.6 24.6 353.3 22.9C317.7 21.2 130.3 21.2 94.7 22.9 59.4 24.6 28 32.8 2.7 59.1S-1.7 94.7.1 130.3c1.7 35.3 9.9 66.7 36.2 92.1s56.8 34.5 92.1 36.2c35.6 1.7 223 1.7 258.6 0 35.3-1.7 66.7-9.9 92.1-36.2s34.5-56.8 36.2-92.1c1.7-35.6 1.7-223 0-258.6zm-48.1 288c-7.8 19.6-22.9 34.7-42.5 42.5-29.4 11.7-99.2 9-132.9 9s-103.5 2.6-132.9-9c-19.6-7.8-34.7-22.9-42.5-42.5-11.7-29.4-9-99.2-9-132.9s-2.6-103.5 9-132.9c7.8-19.6 22.9-34.7 42.5-42.5C120.6 2.6 190.4 0 224.1 0s103.5-2.6 132.9 9c19.6 7.8 34.7 22.9 42.5 42.5 11.7 29.4 9 99.2 9 132.9s2.7 103.5-9 132.9z"/></svg>
              </a>
            </div>
          </div>

          {/* Privacy Notice */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-400">
              By signing up, you agree to receive updates from SegTech. Your email will never be shared.{' '}
              <a href="/privacy-policy" className="text-gray-300 hover:text-white underline transition-colors duration-300">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
} 