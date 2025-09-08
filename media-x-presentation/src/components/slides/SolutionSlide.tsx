import React from 'react';
import { BaseModernSlide } from './BaseModernSlide';
import type { Slide as SlideType } from '../../types';
import styles from './SolutionSlide.module.css';

const SolutionSlide: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  const slide: SlideType = {
    id: '6',
    title: 'Пайплайн решения',
    content: (
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>Пайплайн решения</h1>
          <p className={styles.subtitle}>Инновационный подход к обработке медиаконтента</p>
        </div>

        <div className={styles.fullCards}>
          <div className={styles.featureCard}>
            <div className={styles.cardIcon}>📥</div>
            <h3 className={styles.cardTitle}>Прием данных</h3>
            <p className={styles.cardDescription}>
              Автоматический сбор и валидация медиафайлов из различных источников
            </p>
            <div className={styles.cardStats}>
              <span className={styles.statValue}>1000+</span>
              <span className={styles.statLabel}>файлов/час</span>
            </div>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.cardIcon}>⚙️</div>
            <h3 className={styles.cardTitle}>Обработка</h3>
            <p className={styles.cardDescription}>
              Параллельная обработка с использованием AI алгоритмов и компьютерного зрения
            </p>
            <div className={styles.cardStats}>
              <span className={styles.statValue}>99.9%</span>
              <span className={styles.statLabel}>uptime</span>
            </div>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.cardIcon}>🧠</div>
            <h3 className={styles.cardTitle}>Анализ</h3>
            <p className={styles.cardDescription}>
              Глубокий анализ контента с извлечением метаданных и семантических связей
            </p>
            <div className={styles.cardStats}>
              <span className={styles.statValue}>95%</span>
              <span className={styles.statLabel}>точность</span>
            </div>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.cardIcon}>🚀</div>
            <h3 className={styles.cardTitle}>Доставка</h3>
            <p className={styles.cardDescription}>
              Мгновенная доставка результатов через API и веб-интерфейсы
            </p>
            <div className={styles.cardStats}>
              <span className={styles.statValue}>50ms</span>
              <span className={styles.statLabel}>задержка</span>
            </div>
          </div>
        </div>
      </div>
    ),
    background: 'linear-gradient(135deg, rgba(0, 100, 0, 0.95) 0%, rgba(34, 139, 34, 0.95) 50%, rgba(0, 100, 0, 0.95) 100%)'
  };

  return (
    <BaseModernSlide
      slide={slide}
      isActive={isActive}
      className={styles.solutionSlide}
    />
  );
};

export default SolutionSlide;