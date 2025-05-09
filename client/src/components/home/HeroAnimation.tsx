import React from 'react';
import LottieAnimation from '@/components/ui/lottie-animation';
import { heroAnimation } from '@/assets/animations/hero-animation';

const HeroAnimation: React.FC = () => {
  return (
    <LottieAnimation
      animationData={heroAnimation}
      className="w-full h-[400px] mx-auto"
      loop={true}
      autoplay={true}
    />
  );
};

export default HeroAnimation;