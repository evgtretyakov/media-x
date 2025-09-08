import React from 'react';
import { BaseModernSlide, ModernCard, ModernIcon, ModernTitle, ModernDescription } from './BaseModernSlide';
import { TechAnimations } from '../../animations';
import type { Slide as SlideType } from '../../types';
import styles from './TechModernSlide.module.css';

const TechModernSlide: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  const slide: SlideType = {
    id: '4',
    title: 'Современный технологический стек',
    content: (
      <div className={styles.content}>
        <div className={styles.categoryGrid}>
          <ModernCard delay={0.8}>
            <ModernIcon icon="⚛️" />
            <ModernTitle>Frontend</ModernTitle>
            <ModernDescription>
              React 18 + TypeScript, Framer Motion для анимаций, современный CSS с Grid и Flexbox
            </ModernDescription>
          </ModernCard>

          <ModernCard delay={1.0}>
            <ModernIcon icon="🚀" />
            <ModernTitle>Backend</ModernTitle>
            <ModernDescription>
              Node.js + Python, высокопроизводительные API, микросервисная архитектура
            </ModernDescription>
          </ModernCard>

          <ModernCard delay={1.2}>
            <ModernIcon icon="🧠" />
            <ModernTitle>AI/ML</ModernTitle>
            <ModernDescription>
              TensorFlow/PyTorch, компьютерное зрение, NLP, рекомендательные системы
            </ModernDescription>
          </ModernCard>

          <ModernCard delay={1.4}>
            <ModernIcon icon="☁️" />
            <ModernTitle>Cloud</ModernTitle>
            <ModernDescription>
              Масштабируемая облачная инфраструктура, автоматическое масштабирование, высокая доступность
            </ModernDescription>
          </ModernCard>

          <ModernCard delay={1.6}>
            <ModernIcon icon="🎥" />
            <ModernTitle>Media Processing</ModernTitle>
            <ModernDescription>
              WebRTC + WebGL, обработка в реальном времени, потоковая передача
            </ModernDescription>
          </ModernCard>
        </div>
      </div>
    ),
    background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(30, 30, 60, 0.95) 50%, rgba(0, 0, 0, 0.95) 100%)'
  };

  return (
    <BaseModernSlide
      slide={slide}
      isActive={isActive}
      className={styles.slide}
    >
      <TechAnimations isActive={isActive}>
        {/* Контент уже обернут в div с классом styles.content */}
        {slide.content}
      </TechAnimations>
    </BaseModernSlide>
  );
};

export default TechModernSlide;