import React, { lazy, Suspense, useEffect, useRef } from 'react';
import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';
import { gsap } from 'gsap';

// Lazy load the hero animation for better performance
const HeroAnimation = lazy(() => import('./HeroAnimation'));

const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const threeCanvasRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const { scrollY } = useScroll();
  
  // Parallax effect on scroll
  const y = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.5]);

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
      x: [0, i % 2 === 0 ? 5 : -5, 0],
      transition: {
        delay: i * 0.3,
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    })
  };
  
  const textHighlightVariants = {
    animate: {
      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      transition: {
        duration: 15,
        repeat: Infinity,
        ease: 'linear'
      }
    }
  };

  // Initialize Three.js background
  useEffect(() => {
    if (!threeCanvasRef.current) return;
    
    // Create scene, camera, renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    const canvasContainer = threeCanvasRef.current;
    renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
    canvasContainer.appendChild(renderer.domElement);
    
    // Add particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 500;
    
    const posArray = new Float32Array(particlesCount * 3);
    for(let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 5;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x4e95ff,
      transparent: true,
      opacity: 0.8
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    camera.position.z = 2;
    
    // Handle window resize
    const handleResize = () => {
      const width = canvasContainer.clientWidth;
      const height = canvasContainer.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      particlesMesh.rotation.x += 0.0005;
      particlesMesh.rotation.y += 0.0005;
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup
    return () => {
      if (canvasContainer && renderer.domElement) {
        canvasContainer.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative pt-28 pb-28 overflow-hidden">
      {/* Three.js background canvas */}
      <div ref={threeCanvasRef} className="absolute inset-0 -z-10 opacity-40 dark:opacity-30" />
      
      {/* Gradient shapes in the background */}
      <div className="absolute top-0 left-10 w-[500px] h-[500px] bg-purple-500/20 dark:bg-purple-500/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-blue-500/20 dark:bg-blue-500/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-1/3 w-[600px] h-[400px] bg-pink-500/10 dark:bg-pink-500/5 rounded-full blur-[120px] -z-10" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col lg:flex-row items-center max-w-7xl mx-auto gap-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{ opacity, y }}
        >
          {/* Left Content */}
          <motion.div className="lg:w-1/2 text-center lg:text-left">
            <motion.div 
              className="inline-flex items-center px-4 py-2 bg-white/90 dark:bg-gray-800/80 backdrop-blur-sm rounded-full mb-6 shadow-sm"
              variants={itemVariants}
            >
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
              <span className="text-sm font-medium">{t('hero.launchingBadge')}</span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-6xl font-display font-bold leading-tight mb-6"
              variants={itemVariants}
            >
              <motion.span 
                className="bg-clip-text text-transparent bg-gradient-to-r from-brand-blue via-purple-500 to-brand-blue bg-size-200"
                variants={textHighlightVariants}
                animate="animate"
              >
                {t('hero.titleHighlight')}
              </motion.span>{' '}
              {t('hero.titleRest')}
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-xl"
              variants={itemVariants}
            >
              {t('hero.description')}
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row items-center lg:justify-start gap-4 mb-6"
              variants={itemVariants}
            >
              <Link href="/ai-demo" className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 border border-transparent text-base font-medium rounded-full bg-brand-blue text-white hover:bg-brand-blue/90 transition-all shadow-lg shadow-brand-blue/20 hover:shadow-xl hover:shadow-brand-blue/30 hover:-translate-y-0.5">
                {t('hero.tryAiDemo')}
                <i className="ri-arrow-right-line ml-2"></i>
              </Link>
              <Link href="/#features" className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 border border-gray-200 dark:border-gray-700 text-base font-medium rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
                {t('hero.exploreFeatures')}
              </Link>
            </motion.div>
            
            <motion.div 
              className="flex items-center space-x-4 justify-center lg:justify-start"
              variants={itemVariants}
            >
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  <img className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 shadow-sm" 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80" 
                    alt="User profile" 
                  />
                  <img className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 shadow-sm" 
                    src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80" 
                    alt="User profile" 
                  />
                  <img className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 shadow-sm" 
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80" 
                    alt="User profile" 
                  />
                </div>
                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">{t('hero.userCount')}</span>
              </div>
              <div className="h-4 w-px bg-gray-200 dark:bg-gray-700"></div>
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
          
          {/* Right Content - Hero Animation */}
          <motion.div 
            className="lg:w-1/2 w-full"
            variants={itemVariants}
          >
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6 w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-lg rotate-12 -z-10"></div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-purple-50 dark:bg-purple-900/20 rounded-lg -rotate-12 -z-10"></div>
              
              {/* Main animation container */}
              <motion.div 
                className="relative rounded-2xl overflow-hidden gradient-border dark-mode-glow shadow-2xl"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="bg-white/70 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6">
                  <Suspense fallback={
                    <div className="w-full h-[400px] flex items-center justify-center">
                      <div className="w-12 h-12 border-4 border-brand-blue border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  }>
                    <HeroAnimation />
                  </Suspense>
                  
                  {/* Floating UI elements */}
                  <motion.div 
                    className="absolute top-10 left-10 w-16 h-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg flex items-center justify-center z-10"
                    variants={floatingElementVariants}
                    animate="animate"
                    custom={0}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <i className="ri-palette-line text-brand-blue text-2xl"></i>
                  </motion.div>
                  
                  <motion.div 
                    className="absolute top-1/4 right-10 w-16 h-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg flex items-center justify-center z-10"
                    variants={floatingElementVariants}
                    animate="animate"
                    custom={1}
                    whileHover={{ scale: 1.1, rotate: -5 }}
                  >
                    <i className="ri-code-box-line text-purple-500 text-2xl"></i>
                  </motion.div>
                  
                  <motion.div 
                    className="absolute bottom-12 left-12 w-16 h-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg flex items-center justify-center z-10"
                    variants={floatingElementVariants}
                    animate="animate"
                    custom={2}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <i className="ri-translate-2 text-pink-500 text-2xl"></i>
                  </motion.div>
                  
                  <motion.div 
                    className="absolute bottom-20 right-16 w-16 h-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg flex items-center justify-center z-10"
                    variants={floatingElementVariants}
                    animate="animate"
                    custom={3}
                    whileHover={{ scale: 1.1, rotate: -5 }}
                  >
                    <i className="ri-magic-line text-green-500 text-2xl"></i>
                  </motion.div>
                </div>
              </motion.div>
              
              {/* Decorative badge */}
              <motion.div 
                className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 rounded-full shadow-lg py-2 px-4 flex items-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-xs font-semibold">Powered by OpenAI</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Trusted by logos section */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">TRUSTED BY LEADING COMPANIES</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
            <div className="grayscale hover:grayscale-0 transition-all">
              <i className="ri-microsoft-fill text-4xl"></i>
            </div>
            <div className="grayscale hover:grayscale-0 transition-all">
              <i className="ri-apple-fill text-4xl"></i>
            </div>
            <div className="grayscale hover:grayscale-0 transition-all">
              <i className="ri-netflix-fill text-4xl"></i>
            </div>
            <div className="grayscale hover:grayscale-0 transition-all">
              <i className="ri-amazon-fill text-4xl"></i>
            </div>
            <div className="grayscale hover:grayscale-0 transition-all">
              <i className="ri-spotify-fill text-4xl"></i>
            </div>
            <div className="grayscale hover:grayscale-0 transition-all">
              <i className="ri-google-fill text-4xl"></i>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
