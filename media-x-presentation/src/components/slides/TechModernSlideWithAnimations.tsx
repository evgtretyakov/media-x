// Демонстрационный компонент с интегрированными анимациями технологического стека
import React from 'react';
import { BaseModernSlide, ModernCard, ModernIcon, ModernTitle, ModernDescription } from './BaseModernSlide';
import { TechAnimations, TechCategoryCard, TechParticles } from '../../animations';
import type { Slide as SlideType } from '../../types';
import styles from './TechModernSlide.module.css';

const TechModernSlideWithAnimations: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  const slide: SlideType = {
    id: '4',
    title: 'Современный технологический стек',
    content: (
      <div className={styles.content}>
        <div className={styles.categoryGrid}>
          <TechCategoryCard
            icon="⚛️"
            title="Frontend"
            description="React 18 + TypeScript, Framer Motion для анимаций, современный CSS с Grid и Flexbox"
            technologies={['React', 'TypeScript', 'Framer Motion', 'CSS Grid']}
            color="#61DAFB"
            delay={0.8}
          />

          <TechCategoryCard
            icon="🚀"
            title="Backend"
            description="Node.js + Python, высокопроизводительные API, микросервисная архитектура"
            technologies={['Node.js', 'Python', 'FastAPI', 'Microservices']}
            color="#339933"
            delay={1.0}
          />

          <TechCategoryCard
            icon="🧠"
            title="AI/ML"
            description="TensorFlow/PyTorch, компьютерное зрение, NLP, рекомендательные системы"
            technologies={['TensorFlow', 'PyTorch', 'Computer Vision', 'NLP']}
            color="#FF6B6B"
            delay={1.2}
          />

          <TechCategoryCard
            icon="☁️"
            title="Cloud"
            description="Масштабируемая облачная инфраструктура, автоматическое масштабирование, высокая доступность"
            technologies={['AWS', 'Kubernetes', 'Docker', 'Auto-scaling']}
            color="#48DBFB"
            delay={1.4}
          />

          <TechCategoryCard
            icon="🎥"
            title="Media Processing"
            description="WebRTC + WebGL, обработка в реальном времени, потоковая передача"
            technologies={['WebRTC', 'WebGL', 'Real-time', 'Streaming']}
            color="#9B59B6"
            delay={1.6}
          />
        </div>
        
        <TechParticles count={30} />
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
        {slide.content}
      </TechAnimations>
    </BaseModernSlide>
  );
};

export default TechModernSlideWithAnimations;