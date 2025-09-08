import React from 'react';
import { BaseModernSlide } from './BaseModernSlide';
import type { Slide as SlideType } from '../../types';
import styles from './WhyNowSlide.module.css';

const WhyNowSlide: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  const slide: SlideType = {
    id: '9',
    title: 'Почему сейчас - идеальное время',
    content: (
      <div className={styles.whyNowContent}>
        {/* Заглушка для анимаций роста и временных линий */}
        <div className={styles.timeline}>
          <div className={styles.timelineItem}>
            <div className={styles.timelineDot}></div>
            <div className={styles.timelineContent}>
              <div className={styles.timelineYear}>2023</div>
              <div className={styles.timelineText}>Прорыв в AI технологиях</div>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <div className={styles.timelineDot}></div>
            <div className={styles.timelineContent}>
              <div className={styles.timelineYear}>2024</div>
              <div className={styles.timelineText}>Рост спроса на медиа-контент</div>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <div className={styles.timelineDot}></div>
            <div className={styles.timelineContent}>
              <div className={styles.timelineYear}>2025</div>
              <div className={styles.timelineText}>Идеальное время для запуска</div>
            </div>
          </div>
        </div>
        <div className={styles.growthChart}>
          <div className={styles.chartPlaceholder}>График роста рынка</div>
        </div>
      </div>
    ),
    background: 'linear-gradient(135deg, rgba(178, 34, 34, 0.95) 0%, rgba(220, 20, 60, 0.95) 50%, rgba(178, 34, 34, 0.95) 100%)'
  };

  return (
    <BaseModernSlide
      slide={slide}
      isActive={isActive}
      className={styles.whyNowSlide}
    />
  );
};

export default WhyNowSlide;