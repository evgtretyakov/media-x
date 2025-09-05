// Компонент анимаций для слайда вызовов (аналог challenge-animations.js)
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useContinuousAnimations, useGlitchEffect, usePulseAnimation } from '../hooks/useAnimations';

interface ChallengeAnimationsProps {
  isActive: boolean;
  children: React.ReactNode;
}

export const ChallengeAnimations: React.FC<ChallengeAnimationsProps> = ({
  isActive,
  children
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { startContinuousAnimations, stopContinuousAnimations } = useContinuousAnimations();
  const { initGlitchEffect, stopGlitchEffect } = useGlitchEffect();
  const { pulse } = usePulseAnimation();

  // Анимация сообщений чата
  const animateChatMessages = useRef(() => {
    const messages = containerRef.current?.querySelectorAll('.message');
    messages?.forEach((message, index) => {
      setTimeout(() => {
        message.classList.add('animated');
      }, index * 500);
    });
  });

  // Анимация карточек
  const animateCards = useRef(() => {
    const cards = containerRef.current?.querySelectorAll('.challenge-card');
    cards?.forEach((card, index) => {
      setTimeout(() => {
        const htmlCard = card as HTMLElement;
        pulse(htmlCard, 1000);
      }, index * 300);
    });
  });

  // Анимация графика трендов
  const animateTrendGraph = useRef(() => {
    const bars = containerRef.current?.querySelectorAll('.graph-bar');
    bars?.forEach((bar, index) => {
      setTimeout(() => {
        bar.classList.add('active');
      }, index * 200);
    });
  });

  // Непрерывные анимации
  const startContinuous = useRef(() => {
    const cards = containerRef.current?.querySelectorAll('.challenge-card');
    if (cards && cards.length > 0) {
      const randomIndex = Math.floor(Math.random() * cards.length);
      const randomCard = cards[randomIndex] as HTMLElement;
      
      randomCard.classList.add('highlight');
      setTimeout(() => {
        randomCard.classList.remove('highlight');
      }, 1000);
    }
  });

  // Инициализация анимаций при активации слайда
  useEffect(() => {
    if (isActive && containerRef.current) {
      console.log('🚀 Запуск анимаций для слайда вызовов');

      // Запускаем анимации с задержками
      setTimeout(() => animateChatMessages.current(), 1000);
      setTimeout(() => animateCards.current(), 2000);
      setTimeout(() => animateTrendGraph.current(), 3000);

      // Запускаем непрерывные анимации
      startContinuousAnimations(startContinuous.current, 3000);

      // Инициализируем glitch эффект для заголовков
      const glitchElements = containerRef.current.querySelectorAll('.glitch-text');
      if (glitchElements.length > 0) {
        initGlitchEffect(Array.from(glitchElements) as HTMLElement[]);
      }

      // Добавляем обработчики для интерактивности
      const cards = containerRef.current.querySelectorAll('.challenge-card');
      cards.forEach(card => {
        card.addEventListener('click', () => {
          card.classList.toggle('expanded');
        });
      });

      const chatInterface = containerRef.current.querySelector('.chat-interface');
      if (chatInterface) {
        const htmlChat = chatInterface as HTMLElement;
        htmlChat.addEventListener('mouseenter', () => {
          htmlChat.style.transform = 'translateY(-5px)';
        });
        htmlChat.addEventListener('mouseleave', () => {
          htmlChat.style.transform = 'translateY(0)';
        });
      }
    }

    return () => {
      if (isActive) {
        stopContinuousAnimations();
        stopGlitchEffect();
        console.log('🛑 Остановка анимаций для слайда вызовов');
      }
    };
  }, [isActive, startContinuousAnimations, stopContinuousAnimations, initGlitchEffect, stopGlitchEffect]);

  return (
    <motion.div
      ref={containerRef}
      className="challenge-animations"
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

// Компонент для анимированного сообщения чата
interface AnimatedMessageProps {
  children: React.ReactNode;
  type?: 'user' | 'ai';
  delay?: number;
}

export const AnimatedMessage: React.FC<AnimatedMessageProps> = ({
  children,
  type = 'user',
  delay = 0
}) => {
  return (
    <motion.div
      className={`message ${type}-message`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -2 }}
    >
      <div className="message-content">
        {children}
      </div>
    </motion.div>
  );
};

// Компонент для анимированной карточки вызова
interface AnimatedChallengeCardProps {
  children: React.ReactNode;
  icon: string;
  title: string;
  value: string;
  label: string;
}

export const AnimatedChallengeCard: React.FC<AnimatedChallengeCardProps> = ({
  children,
  icon,
  title,
  value,
  label
}) => {
  return (
    <motion.div
      className="challenge-card"
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <div className="card-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{children}</p>
      <div className="card-stats">
        <span className="stat-value">{value}</span>
        <span className="stat-label">{label}</span>
      </div>
    </motion.div>
  );
};

// Компонент для графика трендов
interface TrendGraphProps {
  data: number[];
  labels: string[];
}

export const TrendGraph: React.FC<TrendGraphProps> = ({ data, labels }) => {
  const maxValue = Math.max(...data);

  return (
    <div className="trend-graph">
      {data.map((value, index) => (
        <motion.div
          key={index}
          className="graph-bar"
          initial={{ height: 0 }}
          animate={{ height: `${(value / maxValue) * 100}%` }}
          transition={{ delay: index * 0.2, duration: 1 }}
          whileHover={{ opacity: 1 }}
        >
          <span className="bar-label">{labels[index]}</span>
          <span className="bar-value">{value}</span>
        </motion.div>
      ))}
    </div>
  );
};