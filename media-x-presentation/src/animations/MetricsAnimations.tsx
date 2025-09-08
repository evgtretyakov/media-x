// Компонент анимаций для слайда метрик AI-эры (адаптация metrics-animations.js)
import React, { useEffect, useRef, useCallback } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { usePresentationStore } from '../store/usePresentationStore';
import { useContinuousAnimations, usePulseAnimation } from '../hooks/useAnimations';

interface MetricsAnimationsProps {
  isActive: boolean;
  children: React.ReactNode;
}

export const MetricsAnimations: React.FC<MetricsAnimationsProps> = ({
  isActive,
  children
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const { currentSlide } = usePresentationStore();
  const { startContinuousAnimations, stopContinuousAnimations } = useContinuousAnimations();
  const { pulse } = usePulseAnimation();

  // Анимация прогресс-баров
  const animateProgressBars = useCallback(() => {
    const progressBars = containerRef.current?.querySelectorAll('.metric-progress-bar');
    progressBars?.forEach((bar, index) => {
      const htmlBar = bar as HTMLElement;
      const targetWidth = htmlBar.dataset.width || '100%';
      
      // Сброс ширины для анимации
      htmlBar.style.width = '0%';
      
      setTimeout(() => {
        htmlBar.style.transition = 'width 2s cubic-bezier(0.4, 0, 0.2, 1)';
        htmlBar.style.width = targetWidth;
        
        // Добавляем пульсацию после завершения
        setTimeout(() => {
          htmlBar.classList.add('animated');
        }, 2000);
      }, 800 + (index * 300));
    });
  }, []);

  // Анимация статистических значков
  const animateStatBadges = useCallback(() => {
    const badges = containerRef.current?.querySelectorAll('.metric-stat-badge');
    badges?.forEach((badge, index) => {
      const htmlBadge = badge as HTMLElement;
      
      setTimeout(() => {
        htmlBadge.style.opacity = '0';
        htmlBadge.style.transform = 'translateY(20px) scale(0.8)';
        
        setTimeout(() => {
          htmlBadge.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
          htmlBadge.style.opacity = '1';
          htmlBadge.style.transform = 'translateY(0) scale(1)';
        }, 50);
      }, 1200 + (index * 200));
    });
  }, []);

  // Анимация радара
  const animateRadar = useCallback(async () => {
    const radar = containerRef.current?.querySelector('.ai-radar') as HTMLElement;
    const radarValue = containerRef.current?.querySelector('.radar-value') as HTMLElement;
    
    if (radar) {
      radar.style.opacity = '0';
      radar.style.transform = 'scale(0.5) translateY(30px)';
      
      await new Promise(resolve => setTimeout(resolve, 1800));
      
      radar.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      radar.style.opacity = '1';
      radar.style.transform = 'scale(1) translateY(0)';
      
      if (radarValue) {
        animateRadarValue(radarValue);
      }
    }
  }, []);

  // Анимация значения радара
  const animateRadarValue = useCallback((radarValue: HTMLElement) => {
    const finalValue = radarValue.textContent || '0%';
    radarValue.textContent = '0%';
    
    let current = 0;
    const target = parseInt(finalValue);
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    const interval = duration / steps;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      radarValue.textContent = Math.round(current) + '%';
    }, interval);
  }, []);

  // Пульсация иконок
  const pulseIcons = useCallback(() => {
    const icons = containerRef.current?.querySelectorAll('.metric-icon');
    icons?.forEach((icon, index) => {
      setTimeout(() => {
        const htmlIcon = icon as HTMLElement;
        pulse(htmlIcon, 1000);
      }, index * 500);
    });
  }, [pulse]);

  // Анимация свечения
  const glowAnimation = useCallback(() => {
    const glows = containerRef.current?.querySelectorAll('.metric-glow');
    glows?.forEach((glow, index) => {
      setTimeout(() => {
        const htmlGlow = glow as HTMLElement;
        htmlGlow.style.transition = 'all 1s ease-in-out';
        htmlGlow.style.opacity = '0.9';
        htmlGlow.style.transform = 'scale(1.2)';
        
        setTimeout(() => {
          htmlGlow.style.transition = 'all 2s ease-in-out';
          htmlGlow.style.opacity = '0.6';
          htmlGlow.style.transform = 'scale(1)';
        }, 1000);
      }, index * 800);
    });
  }, []);

  // Настройка взаимодействий с карточками
  const setupCardInteractions = useCallback(() => {
    const cards = containerRef.current?.querySelectorAll('.metric-card-modern');
    cards?.forEach(card => {
      const htmlCard = card as HTMLElement;
      
      // Hover эффекты
      htmlCard.addEventListener('mouseenter', () => {
        htmlCard.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        htmlCard.style.transform = 'translateY(-20px) scale(1.03) rotateX(8deg)';
        htmlCard.style.boxShadow = '0 45px 80px rgba(102, 126, 234, 0.35)';
        
        const progressBar = htmlCard.querySelector('.metric-progress-bar') as HTMLElement;
        if (progressBar) {
          progressBar.style.transition = 'opacity 0.3s ease-in-out';
          progressBar.style.opacity = '0.9';
        }
      });
      
      htmlCard.addEventListener('mouseleave', () => {
        htmlCard.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        htmlCard.style.transform = 'translateY(0) scale(1) rotateX(0)';
        htmlCard.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.1)';
        
        const progressBar = htmlCard.querySelector('.metric-progress-bar') as HTMLElement;
        if (progressBar) {
          progressBar.style.transition = 'opacity 0.3s ease-in-out';
          progressBar.style.opacity = '1';
        }
      });
      
      // Клик по карточке для фокусировки
      htmlCard.addEventListener('click', () => {
        cards.forEach(c => c.classList.remove('focused'));
        htmlCard.classList.add('focused');
        
        htmlCard.style.transition = 'scale 0.3s ease-in-out';
        htmlCard.style.transform = 'scale(1.05)';
      });
    });
  }, []);

  // Запуск циклических анимаций
  const startCyclicAnimations = useCallback(() => {
    // Пульсация иконок каждые 4 секунды
    const pulseInterval = setInterval(() => {
      if (isActive) pulseIcons();
    }, 4000);
    
    // Свечение каждые 3 секунды
    const glowInterval = setInterval(() => {
      if (isActive) glowAnimation();
    }, 3000);
    
    return () => {
      clearInterval(pulseInterval);
      clearInterval(glowInterval);
    };
  }, [isActive, pulseIcons, glowAnimation]);

  // Основная анимация слайда метрик
  const animateMetricsSlide = useCallback(async () => {
    if (!isActive || !containerRef.current) return;
    
    console.log('📊 Запуск анимаций для слайда метрик');
    
    // Запускаем основные анимации
    animateProgressBars();
    animateStatBadges();
    await animateRadar();
    
    // Настраиваем интерактивность
    setupCardInteractions();
    
    // Запускаем циклические анимации
    const cleanupCyclic = startCyclicAnimations();
    
    return () => {
      cleanupCyclic?.();
    };
  }, [isActive, animateProgressBars, animateStatBadges, animateRadar, setupCardInteractions, startCyclicAnimations]);

  // Инициализация анимаций при активации слайда
  useEffect(() => {
    let cleanupFunction: (() => void) | undefined;
    
    if (isActive) {
      animateMetricsSlide().then(cleanup => {
        cleanupFunction = cleanup;
      });
    }
    
    return () => {
      cleanupFunction?.();
      stopContinuousAnimations();
    };
  }, [isActive, animateMetricsSlide, stopContinuousAnimations]);

  return (
    <motion.div
      ref={containerRef}
      className="metrics-animations"
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

// Компонент для анимированного прогресс-бара
interface AnimatedProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  color?: string;
}

export const AnimatedProgressBar: React.FC<AnimatedProgressBarProps> = ({
  value,
  max = 100,
  className = '',
  color = 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)'
}) => {
  const percentage = (value / max) * 100;
  
  return (
    <motion.div
      className={`metric-progress-bar ${className}`}
      data-width={`${percentage}%`}
      initial={{ width: '0%' }}
      animate={{ width: `${percentage}%` }}
      transition={{ duration: 2, ease: 'easeOut' }}
      style={{ background: color }}
    />
  );
};

// Компонент для статистического значка
interface StatBadgeProps {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
  delay?: number;
}

export const StatBadge: React.FC<StatBadgeProps> = ({
  value,
  label,
  icon,
  delay = 0
}) => {
  return (
    <motion.div
      className="metric-stat-badge"
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.6, ease: 'easeOut' }}
    >
      {icon && <div className="badge-icon">{icon}</div>}
      <div className="badge-value">{value}</div>
      <div className="badge-label">{label}</div>
    </motion.div>
  );
};

// Компонент для радара AI
interface AIRadarProps {
  value: number;
  size?: number;
}

export const AIRadar: React.FC<AIRadarProps> = ({ value, size = 200 }) => {
  return (
    <motion.div
      className="ai-radar"
      initial={{ opacity: 0, scale: 0.5, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.8, duration: 0.8, ease: 'easeOut' }}
      style={{ width: size, height: size }}
    >
      <div className="radar-circle">
        <div className="radar-value">{value}%</div>
      </div>
    </motion.div>
  );
};