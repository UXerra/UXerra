import React, { lazy, Suspense } from 'react';
import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

// Lazy load the hero animation for better performance
const HeroAnimation = lazy(() => import('./HeroAnimation'));

const HeroSection: React.FC = () => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: 'spring',
        stiffness: 50
      }
    }
  };

  const floatingElementVariants = {
    animate: (i: number) => ({
      y: [0, -10, 0],
      transition: {
        delay: i * 0.5,
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    })
  };

  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      <div className="hero-shape absolute top-0 left-1/2 transform -translate-x-1/2 w-full md:w-2/3 h-96 -z-10"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="inline-flex items-center px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-full mb-6"
            variants={itemVariants}
          >
            <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
            <span className="text-sm font-medium">{t('hero.launchingBadge')}</span>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-6xl font-display font-bold leading-tight mb-6"
            variants={itemVariants}
          >
            <span className="gradient-text">{t('hero.titleHighlight')}</span> {t('hero.titleRest')}
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            {t('hero.description')}
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            variants={itemVariants}
          >
            <Link href="/ai-demo" className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg bg-brand-blue text-white hover:bg-brand-blue/90 transition-all">
              {t('hero.tryAiDemo')}
              <i className="ri-arrow-right-line ml-2"></i>
            </Link>
            <Link href="/#features" className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-gray-200 dark:border-gray-700 text-base font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
              {t('hero.exploreFeatures')}
            </Link>
          </motion.div>
          
          {/* Hero Animation with Lottie */}
          <motion.div 
            className="relative rounded-xl overflow-hidden gradient-border dark-mode-glow"
            variants={itemVariants}
          >
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl p-6">
              <Suspense fallback={
                <div className="w-full h-[400px] flex items-center justify-center">
                  <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              }>
                <HeroAnimation />
              </Suspense>
              
              {/* Floating elements */}
              <motion.div 
                className="absolute top-1/4 left-1/4 w-16 h-16 bg-white dark:bg-brand-dark-gray rounded-lg shadow-lg p-3 z-10"
                variants={floatingElementVariants}
                animate="animate"
                custom={0}
              >
                <i className="ri-palette-line text-brand-blue text-2xl"></i>
              </motion.div>
              
              <motion.div 
                className="absolute top-1/3 right-1/4 w-16 h-16 bg-white dark:bg-brand-dark-gray rounded-lg shadow-lg p-3 z-10"
                variants={floatingElementVariants}
                animate="animate"
                custom={1}
              >
                <i className="ri-code-box-line text-brand-orange text-2xl"></i>
              </motion.div>
              
              <motion.div 
                className="absolute bottom-1/4 left-1/3 w-16 h-16 bg-white dark:bg-brand-dark-gray rounded-lg shadow-lg p-3 z-10"
                variants={floatingElementVariants}
                animate="animate"
                custom={2}
              >
                <i className="ri-translate-2 text-purple-500 text-2xl"></i>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-center justify-center mt-6 space-x-6"
            variants={itemVariants}
          >
            <div className="flex items-center">
              <div className="flex -space-x-2">
                <img className="w-8 h-8 rounded-full border-2 border-white dark:border-brand-dark-gray" 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80" 
                  alt="User profile" 
                />
                <img className="w-8 h-8 rounded-full border-2 border-white dark:border-brand-dark-gray" 
                  src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80" 
                  alt="User profile" 
                />
                <img className="w-8 h-8 rounded-full border-2 border-white dark:border-brand-dark-gray" 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80" 
                  alt="User profile" 
                />
              </div>
              <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">{t('hero.userCount')}</span>
            </div>
            <div className="flex items-center">
              <div className="flex text-yellow-400">
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
              </div>
              <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">{t('hero.rating')}</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
