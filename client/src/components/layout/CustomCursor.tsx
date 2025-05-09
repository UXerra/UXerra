import React, { useEffect, useState } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (!isMobile) {
      const updatePosition = (e: MouseEvent) => {
        setPosition({ x: e.clientX, y: e.clientY });
        if (!isVisible) setIsVisible(true);
      };

      const handleMouseDown = () => setIsClicking(true);
      const handleMouseUp = () => setIsClicking(false);

      const handleLinkHover = () => setIsHoveringLink(true);
      const handleLinkLeave = () => setIsHoveringLink(false);

      // Add event listeners for cursor movement
      document.addEventListener('mousemove', updatePosition);
      document.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mouseup', handleMouseUp);

      // Add event listeners for interactive elements
      const interactiveElements = document.querySelectorAll('a, button, input, select, textarea');
      interactiveElements.forEach(el => {
        el.addEventListener('mouseover', handleLinkHover);
        el.addEventListener('mouseout', handleLinkLeave);
      });

      // Hide cursor when leaving the window
      document.addEventListener('mouseleave', () => {
        setIsVisible(false);
      });

      document.addEventListener('mouseenter', () => {
        setIsVisible(true);
      });

      return () => {
        document.removeEventListener('mousemove', updatePosition);
        document.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('mouseleave', () => {
          setIsVisible(false);
        });
        document.removeEventListener('mouseenter', () => {
          setIsVisible(true);
        });

        interactiveElements.forEach(el => {
          el.removeEventListener('mouseover', handleLinkHover);
          el.removeEventListener('mouseout', handleLinkLeave);
        });

        window.removeEventListener('resize', checkMobile);
      };
    }
  }, [isMobile, isVisible, isHoveringLink]);

  if (isMobile) return null;

  return (
    <>
      <div 
        className="cursor-dot" 
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
          opacity: isVisible ? 0.7 : 0, 
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.7 : 1})`,
        }}
      />
      <div 
        className="cursor-outline" 
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
          opacity: isVisible ? 1 : 0,
          transform: `translate(-50%, -50%) scale(${isHoveringLink ? 1.5 : isClicking ? 0.7 : 1})`,
          borderColor: isHoveringLink ? 'rgba(28, 104, 243, 0.7)' : 'rgba(28, 104, 243, 0.5)',
        }}
      />
    </>
  );
};

export default CustomCursor;
