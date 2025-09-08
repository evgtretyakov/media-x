import React from 'react';
import { BaseModernSlide } from './BaseModernSlide';
import type { Slide as SlideType } from '../../types';
import styles from './LLMDataSlide.module.css';

const LLMDataSlide: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  const slide: SlideType = {
    id: '7',
    title: 'Структурированные данные и LLM',
    content: (
      <div className={styles.llmDataContent}>
        {/* Заглушка для карточек метрик и визуализаций */}
        <div className={styles.metricsGrid}>
          <div className={styles.metricCard}>
            <div className={styles.metricValue}>98%</div>
            <div className={styles.metricLabel}>Точность</div>
          </div>
          <div className={styles.metricCard}>
            <div className={styles.metricValue}>2.3s</div>
            <div className={styles.metricLabel}>Время ответа</div>
          </div>
          <div className={styles.metricCard}>
            <div className={styles.metricValue}>1.2M</div>
            <div className={styles.metricLabel}>Запросов/день</div>
          </div>
          <div className={styles.metricCard}>
            <div className={styles.metricValue}>99.9%</div>
            <div className={styles.metricLabel}>Доступность</div>
          </div>
        </div>
        <div className={styles.visualization}>
          <div className={styles.visualizationPlaceholder}>
            Визуализация данных LLM
          </div>
        </div>
      </div>
    ),
    background: 'linear-gradient(135deg, rgba(70, 130, 180, 0.95) 0%, rgba(100, 149, 237, 0.95) 50%, rgba(70, 130, 180, 0.95) 100%)'
  };

  return (
    <BaseModernSlide
      slide={slide}
      isActive={isActive}
      className={styles.llmDataSlide}
    />
  );
};

export default LLMDataSlide;