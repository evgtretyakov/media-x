import React from 'react';
import { motion } from 'framer-motion';
import type { Slide as SlideType } from '../../types';

interface BaseModernSlideProps {
  slide: SlideType;
  isActive: boolean;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Базовый компонент для современных слайдов с расширенными анимациями
 * Наследует базовый функционал Slide и добавляет поддержку сложных анимаций
 */
export const BaseModernSlide: React.FC<BaseModernSlideProps> = ({
  slide,
  isActive,
  className = '',
  children
}) => {
  const slideClasses = [
    'slide-base',
    isActive ? 'active' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <motion.div
      className={slideClasses}
      initial={{ opacity: 0, x: 100 }}
      animate={{
        opacity: isActive ? 1 : 0.7,
        x: isActive ? 0 : 100,
        scale: isActive ? 1 : 0.95
      }}
      transition={{ 
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1]
      }}
      style={{
        background: slide.background || 'var(--gradient-tech)',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 'var(--spacing-lg)',
        overflow: 'hidden'
      }}
    >
      {/* Modern background effects */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 10% 20%, rgba(72, 219, 251, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 90% 80%, rgba(255, 107, 107, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 60% 30%, rgba(118, 75, 162, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 30% 70%, rgba(254, 202, 87, 0.1) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
          zIndex: 'var(--z-background)'
        }}
      />
      
      {/* Animated grid overlay */}
      <div
        style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: 'linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.02), transparent)',
          transform: 'rotate(45deg)',
          animation: 'tech-grid-move 20s linear infinite',
          pointerEvents: 'none',
          zIndex: 'var(--z-background)'
        }}
      />

      {/* Content container */}
      <div 
        className="content-wrapper"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%',
          position: 'relative',
          zIndex: 'var(--z-content)'
        }}
      >
        {/* Title with modern gradient */}
        {slide.title && (
          <motion.h1
            initial={{ y: -70, opacity: 0, scale: 0.7, rotateX: -40 }}
            animate={{ 
              y: isActive ? 0 : -70, 
              opacity: isActive ? 1 : 0,
              scale: isActive ? 1 : 0.7,
              rotateX: isActive ? 0 : -40
            }}
            transition={{ 
              delay: isActive ? 0.4 : 0,
              duration: 0.8,
              ease: [0.4, 0, 0.2, 1]
            }}
            style={{
              fontSize: '3.2rem',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #48dbfb, #ff9ff3, #ff6b6b, #feca57, #1dd1a1)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '20px',
              letterSpacing: '-1px',
              textTransform: 'uppercase',
              textShadow: `
                0 0 40px rgba(72, 219, 251, 0.5),
                0 0 70px rgba(255, 159, 243, 0.4),
                0 0 100px rgba(255, 107, 107, 0.3)
              `,
              animation: isActive ? 'tech-title-glow-pulse 4s ease-in-out infinite alternate' : 'none'
            }}
          >
            {slide.title}
          </motion.h1>
        )}

        {/* Custom content */}
        {children || slide.content}
      </div>

      {/* Floating particles */}
      {isActive && (
        <>
          <div
            style={{
              position: 'absolute',
              top: '20%',
              right: '10%',
              width: '60px',
              height: '60px',
              background: 'radial-gradient(circle, rgba(72, 219, 251, 0.3) 0%, transparent 70%)',
              borderRadius: '50%',
              animation: 'tech-particle-float 12s ease-in-out infinite',
              zIndex: 'var(--z-background)'
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '70%',
              left: '15%',
              width: '40px',
              height: '40px',
              background: 'radial-gradient(circle, rgba(255, 107, 107, 0.3) 0%, transparent 70%)',
              borderRadius: '50%',
              animation: 'tech-particle-float 8s ease-in-out infinite 2s',
              zIndex: 'var(--z-background)'
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '40%',
              right: '20%',
              width: '50px',
              height: '50px',
              background: 'radial-gradient(circle, rgba(254, 202, 87, 0.3) 0%, transparent 70%)',
              borderRadius: '50%',
              animation: 'tech-particle-float 10s ease-in-out infinite 4s',
              zIndex: 'var(--z-background)'
            }}
          />
        </>
      )}
    </motion.div>
  );
};

// Вспомогательные компоненты для построения сложных слайдов

export const ModernCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
}> = ({ children, className = '', delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: -20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      transition={{ 
        delay,
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1]
      }}
      className={className}
      style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.08))',
        padding: '30px 25px',
        borderRadius: '25px',
        border: '1px solid rgba(255, 255, 255, 0.25)',
        backdropFilter: 'blur(30px)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'var(--transition-tech)',
        minHeight: '180px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      {children}
    </motion.div>
  );
};

export const ModernIcon: React.FC<{
  icon: string;
  size?: number;
}> = ({ icon, size = 2.8 }) => {
  return (
    <div
      style={{
        fontSize: `${size}rem`,
        marginBottom: '-10px',
        textAlign: 'center',
        animation: 'tech-icon-float 6s ease-in-out infinite',
        textShadow: '0 0 25px currentColor',
        filter: 'drop-shadow(0 0 15px currentColor)'
      }}
    >
      {icon}
    </div>
  );
};

export const ModernTitle: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <h3
      style={{
        fontSize: '1.3rem',
        fontWeight: 800,
        color: '#ffffff',
        marginBottom: '15px',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #48dbfb, #ff9ff3)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        letterSpacing: '-0.2px'
      }}
    >
      {children}
    </h3>
  );
};

export const ModernDescription: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <p
      style={{
        fontSize: '1.05rem',
        lineHeight: '1.6',
        color: 'rgba(255, 255, 255, 0.9)',
        marginBottom: 0,
        textAlign: 'center',
        fontWeight: 400
      }}
    >
      {children}
    </p>
  );
};