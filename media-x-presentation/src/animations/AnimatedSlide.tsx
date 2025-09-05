// Компонент анимированного слайда с Framer Motion
import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { TargetAndTransition } from 'framer-motion';
import { useSlideAnimations } from '../hooks/useAnimations';
import type { Slide as SlideType } from '../types';

interface AnimatedSlideProps {
  slide: SlideType;
  isActive: boolean;
  className?: string;
  animationType?: 'fade' | 'slide' | 'scale';
}

export const AnimatedSlide: React.FC<AnimatedSlideProps> = ({
  slide,
  isActive,
  className = '',
  animationType = 'fade'
}) => {
  const slideRef = useRef<HTMLDivElement>(null);
  const { animateContent } = useSlideAnimations();

  // Варианты анимаций
  const animationVariants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 }
    },
    slide: {
      initial: { opacity: 0, x: 100 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -100 }
    },
    scale: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 1.2 }
    }
  };

  // Анимация контента при активации слайда
  useEffect(() => {
    if (isActive && slideRef.current) {
      animateContent(slideRef.current);
    }
  }, [isActive, animateContent]);

  const slideClasses = [
    'slide',
    isActive ? 'active' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          ref={slideRef}
          className={slideClasses}
          variants={animationVariants[animationType]}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.5 }}
          style={{
            background: slide.background || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          }}
        >
          <motion.h1
            className="title"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {slide.title}
          </motion.h1>
          
          <motion.div
            className="content"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {slide.content}
          </motion.div>

          {slide.animation && (
            <div className="slide-animation">
              {/* Специфичные анимации для слайда будут здесь */}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Компонент для staggered анимации контента
interface StaggeredContentProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}

export const StaggeredContent: React.FC<StaggeredContentProps> = ({
  children,
  staggerDelay = 0.1,
  className = ''
}) => {
  const { staggerAnimation } = useSlideAnimations();

  return (
    <motion.div
      className={className}
      variants={staggerAnimation.container}
      initial="hidden"
      animate="show"
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          variants={staggerAnimation.item}
          custom={index}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

// Компонент для анимированных карточек
interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  whileHover?: TargetAndTransition | string;
  whileTap?: TargetAndTransition | string;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  className = '',
  whileHover = { scale: 1.05, y: -5 },
  whileTap = { scale: 0.95 }
}) => {
  return (
    <motion.div
      className={`animated-card ${className}`}
      whileHover={whileHover}
      whileTap={whileTap}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

// Компонент для пульсирующей анимации
interface PulseAnimationProps {
  children: React.ReactNode;
  isPulsing?: boolean;
  className?: string;
}

export const PulseAnimation: React.FC<PulseAnimationProps> = ({
  children,
  isPulsing = false,
  className = ''
}) => {
  return (
    <motion.div
      className={`pulse-animation ${className}`}
      animate={isPulsing ? { scale: [1, 1.05, 1] } : {}}
      transition={{ duration: 1, repeat: isPulsing ? Infinity : 0 }}
    >
      {children}
    </motion.div>
  );
};