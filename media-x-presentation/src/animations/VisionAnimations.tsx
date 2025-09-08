// Компонент анимаций для слайда "Вижн" (адаптация vision-animations.js)
import React, { useEffect, useRef, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePresentationStore } from '../store/usePresentationStore';

interface VisionAnimationsProps {
  isActive: boolean;
  children: React.ReactNode;
}

export const VisionAnimations: React.FC<VisionAnimationsProps> = ({
  isActive,
  children
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [notifications, setNotifications] = useState<{ id: string; message: string }[]>([]);
  const { currentSlide } = usePresentationStore();

  // Настройка взаимодействий с карточками
  const setupCardInteractions = useCallback(() => {
    const visionCards = containerRef.current?.querySelectorAll('.vision-card');
    if (!visionCards) return;

    visionCards.forEach((card, index) => {
      const htmlCard = card as HTMLElement;

      // Анимация при наведении
      htmlCard.addEventListener('mouseenter', () => {
        animateCardHover(htmlCard, index);
      });

      htmlCard.addEventListener('mouseleave', () => {
        animateCardLeave(htmlCard);
      });

      // Анимация при клике
      htmlCard.addEventListener('click', () => {
        animateCardClick(htmlCard, index);
      });
    });
  }, []);

  // Анимация карточки при наведении
  const animateCardHover = useCallback((card: HTMLElement, index: number) => {
    // Увеличиваем карточку и добавляем свечение
    card.style.transform = 'translateY(-15px) scale(1.05)';
    card.style.boxShadow = '0 35px 70px rgba(102, 126, 234, 0.3)';
    
    // Анимация иконки
    const icon = card.querySelector('.card-icon') as HTMLElement;
    if (icon) {
      icon.style.animation = 'float-icon-hover 0.5s ease-out forwards';
    }

    // Анимация свечения
    const glow = card.querySelector('.card-glow') as HTMLElement;
    if (glow) {
      glow.style.animation = 'pulse-glow-hover 1s ease-in-out infinite';
    }
  }, []);

  // Анимация карточки при уходе курсора
  const animateCardLeave = useCallback((card: HTMLElement) => {
    // Возвращаем карточку в исходное состояние
    card.style.transform = 'translateY(0) scale(1)';
    card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
    
    const icon = card.querySelector('.card-icon') as HTMLElement;
    if (icon) {
      icon.style.animation = 'float-icon 3s ease-in-out infinite';
    }

    const glow = card.querySelector('.card-glow') as HTMLElement;
    if (glow) {
      glow.style.animation = 'pulse-glow 2s ease-in-out infinite';
    }
  }, []);

  // Анимация карточки при клике
  const animateCardClick = useCallback((card: HTMLElement, index: number) => {
    // Анимация клика - пульсация
    card.style.animation = 'card-pulse 0.6s ease-out';
    
    setTimeout(() => {
      card.style.animation = '';
    }, 600);

    // Показать дополнительную информацию
    showCardDetails(index);
  }, []);

  // Показать детали карточки
  const showCardDetails = useCallback((index: number) => {
    const details = [
      "Доверенный источник данных для обучения LLM с структурированным контентом",
      "Мгновенное создание контента в пиковые моменты трендов",
      "Автоматическая адаптация под различные аудитории и регионы"
    ];

    // Добавляем временное уведомление
    const newNotification = {
      id: Date.now().toString(),
      message: details[index]
    };

    setNotifications(prev => [...prev, newNotification]);

    // Автоматическое удаление через 3 секунды
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 3000);
  }, []);

  // Настройка анимаций при скролле
  const setupScrollAnimations = useCallback(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;

      const visionCards = containerRef.current?.querySelectorAll('.vision-card');
      visionCards?.forEach((card, index) => {
        const htmlCard = card as HTMLElement;
        const speed = 0.1 + (index * 0.05);
        const translateY = scrollDelta * speed * -1;
        
        if (Math.abs(scrollDelta) > 1) {
          htmlCard.style.transform = `translateY(${translateY}px)`;
        }
      });

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Инициализация анимаций при активации слайда
  useEffect(() => {
    if (isActive && containerRef.current) {
      console.log('👁️ Запуск анимаций для слайда Вижн');

      setupCardInteractions();
      const cleanupScroll = setupScrollAnimations();

      return () => {
        cleanupScroll?.();
        setNotifications([]);
      };
    }
  }, [isActive, setupCardInteractions, setupScrollAnimations]);

  return (
    <>
      <motion.div
        ref={containerRef}
        className="vision-animations"
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>

      {/* Уведомления */}
      <AnimatePresence>
        {notifications.map(notification => (
          <motion.div
            key={notification.id}
            className="vision-notification"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            <div className="notification-content">
              <span className="notification-icon">💡</span>
              <span className="notification-text">{notification.message}</span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
};

// Компонент для анимированной карточки видения
interface VisionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  color?: string;
}

export const VisionCard: React.FC<VisionCardProps> = ({
  icon,
  title,
  description,
  index,
  color = '#667eea'
}) => {
  return (
    <motion.div
      className="vision-card"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      whileHover={{ 
        y: -15,
        scale: 1.05,
        boxShadow: '0 35px 70px rgba(102, 126, 234, 0.3)'
      }}
      style={{ '--card-color': color } as React.CSSProperties}
    >
      <div className="card-glow" style={{ background: color }} />
      
      <div className="card-icon" style={{ color }}>
        {icon}
      </div>
      
      <h3 className="card-title">{title}</h3>
      
      <p className="card-description">{description}</p>
      
      <div className="card-hint">Нажмите для подробностей</div>
    </motion.div>
  );
};

// Компонент для уведомления
interface VisionNotificationProps {
  message: string;
  type?: 'info' | 'success' | 'warning';
  duration?: number;
  onClose?: () => void;
}

export const VisionNotification: React.FC<VisionNotificationProps> = ({
  message,
  type = 'info',
  duration = 3000,
  onClose
}) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const typeStyles = {
    info: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9))',
    success: 'linear-gradient(135deg, rgba(76, 175, 80, 0.95), rgba(76, 175, 80, 0.9))',
    warning: 'linear-gradient(135deg, rgba(255, 193, 7, 0.95), rgba(255, 193, 7, 0.9))'
  };

  return (
    <motion.div
      className="vision-notification"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.4 }}
      style={{ background: typeStyles[type] }}
    >
      <div className="notification-content">
        <span className="notification-icon">
          {type === 'info' ? '💡' : type === 'success' ? '✅' : '⚠️'}
        </span>
        <span className="notification-text">{message}</span>
      </div>
    </motion.div>
  );
};

// Хук для управления уведомлениями
export const useVisionNotifications = () => {
  const [notifications, setNotifications] = useState<{ id: string; message: string; type?: string }[]>([]);

  const addNotification = useCallback((message: string, type: string = 'info', duration: number = 3000) => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id));
      }, duration);
    }

    return id;
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  return {
    notifications,
    addNotification,
    removeNotification,
    clearNotifications
  };
};