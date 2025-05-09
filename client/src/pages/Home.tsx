import React, { useEffect } from 'react';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import AIDemoSection from '@/components/home/AIDemoSection';
import PricingSection from '@/components/home/PricingSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CTASection from '@/components/home/CTASection';
import { useLocation } from 'wouter';

const Home: React.FC = () => {
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
    <>
      <HeroSection />
      <FeaturesSection />
      <AIDemoSection />
      <PricingSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
};

export default Home;
