import React from 'react';
import { BaseModernSlide } from './BaseModernSlide';
import { VisionAnimations } from '../../animations';
import type { Slide as SlideType } from '../../types';
import styles from './VisionSlide.module.css';

const VisionSlide: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  const slide: SlideType = {
    id: '5',
    title: 'Видение и архитектура решения',
    content: (
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>Видение и архитектура решения</h1>
          <p className={styles.subtitle}>Инновационный подход к обработке медиаконтента с использованием AI</p>
        </div>

        <div className={styles.cards}>
          <div className={styles.card}>
            <div className={styles.visual}>
              <div className={styles.icon}>🧠</div>
              <div className={styles.glow}></div>
            </div>
            <div className={styles.cardContent}>
              <h3>AI-анализ контента</h3>
              <p>Глубокий анализ медиафайлов с использованием компьютерного зрения и NLP технологий</p>
              <div className={styles.stats}>
                <span className={styles.statBadge}>95% точность</span>
                <span className={styles.statBadge}>Real-time</span>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.visual}>
              <div className={styles.icon}>⚡</div>
              <div className={styles.glow}></div>
            </div>
            <div className={styles.cardContent}>
              <h3>Высокая производительность</h3>
              <p>Обработка тысяч запросов в секунду с минимальной задержкой</p>
              <div className={styles.stats}>
                <span className={styles.statBadge}>1000+ RPS</span>
                <span className={styles.statBadge}>99.9% uptime</span>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.visual}>
              <div className={styles.icon}>🔒</div>
              <div className={styles.glow}></div>
            </div>
            <div className={styles.cardContent}>
              <h3>Безопасность данных</h3>
              <p>Полное шифрование и соответствие международным стандартам безопасности</p>
              <div className={styles.stats}>
                <span className={styles.statBadge}>GDPR</span>
                <span className={styles.statBadge}>ISO 27001</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.connector}>
          <div className={styles.connectorLine}></div>
          <div className={styles.connectorDots}>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.aiPulse}>
            <div className={styles.pulseCircle}></div>
            <div className={styles.pulseRing}></div>
            <span className={styles.pulseText}>AI-Powered Solution</span>
          </div>
        </div>
      </div>
    ),
    background: 'linear-gradient(135deg, rgba(25, 25, 112, 0.95) 0%, rgba(75, 0, 130, 0.95) 50%, rgba(25, 25, 112, 0.95) 100%)'
  };

  return (
    <BaseModernSlide
      slide={slide}
      isActive={isActive}
      className={styles.visionSlide}
    />
  );
};

export default VisionSlide;