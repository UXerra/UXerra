import React, { useEffect, Suspense } from 'react';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import AIDemoSection from '@/components/home/AIDemoSection';
import PricingSection from '@/components/home/PricingSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CTASection from '@/components/home/CTASection';
import { useLocation } from 'wouter';

export function Home() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Handle hash navigation (for smooth scrolling to sections)
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          // Wait for the DOM to be fully loaded
          setTimeout(() => {
            window.scrollTo({
              top: element.offsetTop - 80, // Account for header height
              behavior: 'smooth'
            });
          }, 100);
        }
      }
    };

    // Handle hash on initial load
    handleHashChange();

    // Add event listener for hash changes
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [setLocation]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Suspense fallback={<div className="flex-1 flex items-center justify-center text-2xl">Loading...</div>}>
        <HeroSection />
      </Suspense>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-6 rounded-lg shadow bg-white dark:bg-gray-900">
          <h2 className="text-2xl font-semibold mb-2">AI Branding Wizard</h2>
          <p>Generate a complete brand identity in minutes.</p>
        </div>
        <div className="p-6 rounded-lg shadow bg-white dark:bg-gray-900">
          <h2 className="text-2xl font-semibold mb-2">AI Page Builder</h2>
          <p>Design stunning pages with AI assistance.</p>
        </div>
        <div className="p-6 rounded-lg shadow bg-white dark:bg-gray-900">
          <h2 className="text-2xl font-semibold mb-2">Templates Gallery</h2>
          <p>Choose from a wide range of professional templates.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
