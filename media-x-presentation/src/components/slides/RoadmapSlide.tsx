import React from 'react';
import { BaseModernSlide } from './BaseModernSlide';
import type { Slide as SlideType } from '../../types';
import styles from './RoadmapSlide.module.css';

const RoadmapSlide: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  const slide: SlideType = {
    id: '10',
    title: 'Дорожная карта развития',
    content: (
      <div className={styles.roadmapContent}>
        {/* Заглушка для временной шкалы с фазами */}
        <div className={styles.roadmapTimeline}>
          <div className={styles.phase}>
            <div className={styles.phaseHeader}>
              <div className={styles.phaseNumber}>Q1 2024</div>
              <div className={styles.phaseTitle}>Фаза 1: Запуск</div>
            </div>
            <div className={styles.phaseItems}>
              <div className={styles.phaseItem}>MVP разработка</div>
              <div className={styles.phaseItem}>Тестирование</div>
              <div className={styles.phaseItem}>Первые клиенты</div>
            </div>
          </div>
          <div className={styles.phase}>
            <div className={styles.phaseHeader}>
              <div className={styles.phaseNumber}>Q2-Q3 2024</div>
              <div className={styles.phaseTitle}>Фаза 2: Рост</div>
            </div>
            <div className={styles.phaseItems}>
              <div className={styles.phaseItem}>Масштабирование</div>
              <div className={styles.phaseItem}>Новые функции</div>
              <div className={styles.phaseItem}>Партнерства</div>
            </div>
          </div>
          <div className={styles.phase}>
            <div className={styles.phaseHeader}>
              <div className={styles.phaseNumber}>Q4 2024+</div>
              <div className={styles.phaseTitle}>Фаза 3: Экспансия</div>
            </div>
            <div className={styles.phaseItems}>
              <div className={styles.phaseItem}>Международный рынок</div>
              <div className={styles.phaseItem}>AI улучшения</div>
              <div className={styles.phaseItem}>Экосистема</div>
            </div>
          </div>
        </div>
        <div className={styles.progressIndicator}>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: '33%' }}></div>
          </div>
          <div className={styles.progressLabel}>33% завершено</div>
        </div>
      </div>
    ),
    background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.95) 0%, rgba(160, 82, 45, 0.95) 50%, rgba(139, 69, 19, 0.95) 100%)'
  };

  return (
    <BaseModernSlide
      slide={slide}
      isActive={isActive}
      className={styles.roadmapSlide}
    />
  );
};

export default RoadmapSlide;