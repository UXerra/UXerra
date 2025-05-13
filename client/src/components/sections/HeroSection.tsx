import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Sparkles } from 'lucide-react';

function UXCube() {
  const { scene } = useGLTF('/models/ux-cube.glb');
  return <primitive object={scene} scale={2} />;
}

export function HeroSection() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (clientX - left) / width;
      const y = (clientY - top) / height;
      
      containerRef.current.style.setProperty('--mouse-x', `${x * 100}%`);
      containerRef.current.style.setProperty('--mouse-y', `${y * 100}%`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background/95 to-background/90"
      style={{
        '--mouse-x': '50%',
        '--mouse-y': '50%',
      } as React.CSSProperties}
    >
      {/* Animated background gradient */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background: 'radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(var(--primary-rgb), 0.15) 0%, transparent 50%)',
        }}
      />

      {/* Floating elements */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t('The Future of')}{' '}
              <span className="text-primary relative">
                {t('Design')}
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-1 bg-primary"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
              </span>{' '}
              {t('is Here')}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {t('Create stunning designs with AI-powered tools. The most advanced platform for UX/UI, branding, and digital creation.')}
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.a
                href="/create/branding"
                className="inline-flex items-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('Start Free Trial')}
                <ArrowRight className="ml-2 w-4 h-4" />
              </motion.a>
              <motion.a
                href="/demo"
                className="inline-flex items-center px-6 py-3 rounded-full bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('Watch Demo')}
                <Sparkles className="ml-2 w-4 h-4" />
              </motion.a>
            </div>
          </motion.div>

          {/* 3D Model */}
          <motion.div
            className="h-[500px] relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <pointLight position={[-10, -10, -10]} />
              <UXCube />
              <OrbitControls enableZoom={false} autoRotate />
            </Canvas>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 