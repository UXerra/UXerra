import React from 'react';
import Lottie from 'lottie-react';
import { cn } from '@/lib/utils';

interface LottieAnimationProps {
  animationData: any;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  style?: React.CSSProperties;
  onComplete?: () => void;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({
  animationData,
  className,
  loop = true,
  autoplay = true,
  style,
  onComplete,
}) => {
  return (
    <div className={cn('lottie-container', className)} style={style}>
      <Lottie
        animationData={animationData}
        loop={loop}
        autoplay={autoplay}
        onComplete={onComplete}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default LottieAnimation;