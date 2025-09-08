// Компонент анимаций для современного слайда технологического стека (адаптация tech-animations.js)
import React, { useEffect, useRef, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { usePresentationStore } from '../store/usePresentationStore';

interface TechAnimationsProps {
  isActive: boolean;
  children: React.ReactNode;
}

export const TechAnimations: React.FC<TechAnimationsProps> = ({
  isActive,
  children
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const { currentSlide } = usePresentationStore();

  // Анимация появления элементов с задержкой
  const animateTechSlide = useCallback(() => {
    if (isAnimating || !containerRef.current) return;
    
    setIsAnimating(true);
    
    const techCards = containerRef.current.querySelectorAll('.tech-category-modern');
    
    techCards.forEach((card, index) => {
      const htmlCard = card as HTMLElement;
      
      // Сбрасываем стили перед анимацией
      htmlCard.style.opacity = '0';
      htmlCard.style.transform = 'translateY(60px) rotateX(-20deg) scale(0.8)';
      
      // Анимация появления с задержкой
      setTimeout(() => {
        htmlCard.style.opacity = '1';
        htmlCard.style.transform = 'translateY(0) rotateX(0deg) scale(1)';
        htmlCard.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      }, 400 + index * 200);
    });
    
    // Анимация завершена
    setTimeout(() => {
      setIsAnimating(false);
    }, 400 + techCards.length * 200);
  }, [isAnimating]);

  // Добавление эффектов при наведении
  const addHoverEffects = useCallback(() => {
    const techCards = containerRef.current?.querySelectorAll('.tech-category-modern');
    if (!techCards) return;
    
    techCards.forEach(card => {
      const htmlCard = card as HTMLElement;
      
      // Mouse enter
      htmlCard.addEventListener('mouseenter', () => {
        if (htmlCard.classList.contains('animating')) return;
        
        htmlCard.classList.add('animating');
        
        // Анимация иконки
        const icon = htmlCard.querySelector('.tech-category-icon') as HTMLElement;
        if (icon) {
          icon.style.transform = 'scale(1.2) rotate(10deg)';
          icon.style.transition = 'all 0.3s ease-out';
        }
        
        // Эффект свечения
        htmlCard.style.boxShadow = '0 30px 60px rgba(72, 219, 251, 0.5), 0 0 0 4px rgba(72, 219, 251, 0.4), 0 0 60px rgba(72, 219, 251, 0.4)';
        
        setTimeout(() => {
          htmlCard.classList.remove('animating');
        }, 300);
      });
      
      // Mouse leave
      htmlCard.addEventListener('mouseleave', () => {
        const icon = htmlCard.querySelector('.tech-category-icon') as HTMLElement;
        if (icon) {
          icon.style.transform = 'scale(1) rotate(0deg)';
          icon.style.transition = 'all 0.3s ease-in';
        }
        
        htmlCard.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.5), 0 0 0 3px rgba(72, 219, 251, 0.4), 0 0 45px rgba(72, 219, 251, 0.4)';
      });
    });
  }, []);

  // Добавление анимаций при клике
  const addClickAnimations = useCallback(() => {
    const techCards = containerRef.current?.querySelectorAll('.tech-category-modern');
    if (!techCards) return;
    
    techCards.forEach(card => {
      const htmlCard = card as HTMLElement;
      
      htmlCard.addEventListener('click', () => {
        if (htmlCard.classList.contains('clicked')) return;
        
        htmlCard.classList.add('clicked');
        
        // Анимация клика
        htmlCard.style.transform = 'translateY(-15px) scale(1.06) rotateX(8deg)';
        htmlCard.style.transition = 'all 0.2s ease-out';
        
        // Эффект импульса
        const icon = htmlCard.querySelector('.tech-category-icon') as HTMLElement;
        if (icon) {
          icon.style.transform = 'scale(1.3) rotate(20deg)';
          icon.style.filter = 'drop-shadow(0 0 30px currentColor)';
        }
        
        // Возврат к исходному состоянию
        setTimeout(() => {
          htmlCard.style.transform = 'translateY(-12px) scale(1.04) rotateX(5deg)';
          htmlCard.style.transition = 'all 0.3s ease-in';
          
          if (icon) {
            icon.style.transform = 'scale(1.2) rotate(10deg)';
            icon.style.filter = 'drop-shadow(0 0 20px currentColor)';
          }
          
          setTimeout(() => {
            htmlCard.classList.remove('clicked');
          }, 300);
        }, 200);
      });
    });
  }, []);

  // Добавление параллакс эффекта
  const addParallaxEffect = useCallback(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isActive || !containerRef.current) return;
      
      const techCards = containerRef.current.querySelectorAll('.tech-category-modern');
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      techCards.forEach((card, index) => {
        const htmlCard = card as HTMLElement;
        const depth = (index % 3) * 0.1 + 0.1;
        
        const moveX = (mouseX - 0.5) * 20 * depth;
        const moveY = (mouseY - 0.5) * 20 * depth;
        
        htmlCard.style.transform = `translateY(-12px) scale(1.04) rotateX(5deg) translateX(${moveX}px) translateY(${moveY}px)`;
      });
    };
    
    const handleMouseLeave = () => {
      if (!containerRef.current) return;
      
      const techCards = containerRef.current.querySelectorAll('.tech-category-modern');
      techCards.forEach(card => {
        const htmlCard = card as HTMLElement;
        htmlCard.style.transform = 'translateY(-12px) scale(1.04) rotateX(5deg)';
      });
    };
    
    if (containerRef.current) {
      containerRef.current.addEventListener('mousemove', handleMouseMove);
      containerRef.current.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        containerRef.current?.removeEventListener('mousemove', handleMouseMove);
        containerRef.current?.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [isActive]);

  // Инициализация анимаций при активации слайда
  useEffect(() => {
    if (isActive && containerRef.current) {
      console.log('⚡ Запуск анимаций для слайда технологического стека');
      
      animateTechSlide();
      addHoverEffects();
      addClickAnimations();
      const cleanupParallax = addParallaxEffect();
      
      return () => {
        cleanupParallax?.();
        setIsAnimating(false);
      };
    }
  }, [isActive, animateTechSlide, addHoverEffects, addClickAnimations, addParallaxEffect]);

  return (
    <motion.div
      ref={containerRef}
      className="tech-animations"
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

// Компонент для анимированной технологической карточки
interface TechCategoryCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  technologies: string[];
  color?: string;
  delay?: number;
}

export const TechCategoryCard: React.FC<TechCategoryCardProps> = ({
  icon,
  title,
  description,
  technologies,
  color = '#48dbfb',
  delay = 0
}) => {
  return (
    <motion.div
      className="tech-category-modern"
      initial={{ opacity: 0, y: 60, rotateX: -20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      transition={{ delay, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ 
        scale: 1.05,
        y: -12,
        rotateX: 5,
        boxShadow: '0 30px 60px rgba(72, 219, 251, 0.5), 0 0 0 4px rgba(72, 219, 251, 0.4), 0 0 60px rgba(72, 219, 251, 0.4)'
      }}
      style={{ '--tech-color': color } as React.CSSProperties}
    >
      <div className="tech-category-icon" style={{ color }}>
        {icon}
      </div>
      
      <h3 className="tech-category-title">{title}</h3>
      
      <p className="tech-category-description">{description}</p>
      
      <div className="tech-category-technologies">
        {technologies.map((tech, index) => (
          <span key={index} className="tech-tag">
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

// Компонент для частиц технологий
interface TechParticlesProps {
  count?: number;
  size?: number;
  colors?: string[];
}

export const TechParticles: React.FC<TechParticlesProps> = ({
  count = 20,
  size = 4,
  colors = ['#48dbfb', '#667eea', '#764ba2', '#f093fb', '#f5576c']
}) => {
  return (
    <div className="tech-particles">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          className="tech-particle"
          style={{
            width: size,
            height: size,
            background: colors[index % colors.length],
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}
    </div>
  );
};

// API для ручного запуска анимаций
export const useTechAnimationsAPI = () => {
  const triggerAnimations = useCallback(() => {
    const event = new CustomEvent('techAnimationsTrigger');
    window.dispatchEvent(event);
  }, []);

  const stopAnimations = useCallback(() => {
    const event = new CustomEvent('techAnimationsStop');
    window.dispatchEvent(event);
  }, []);

  return { triggerAnimations, stopAnimations };
};