import React from 'react';
import { motion } from 'framer-motion';
import type { NavigationProps } from '../types';
import styles from '../styles/modules/Navigation.module.css';

export const Navigation: React.FC<NavigationProps> = ({
  onNext,
  onPrev,
  onPlayPause,
  currentSlide,
  totalSlides,
  isPlaying,
  onSlideClick
}) => {
  const navBtnClasses = (disabled: boolean) => [
    styles.navBtn,
    disabled ? styles.disabled : ''
  ].filter(Boolean).join(' ');

  // Генерация индикаторов слайдов
  const slideIndicators = Array.from({ length: totalSlides }, (_, index) => (
    <motion.button
      key={index}
      className={`${styles.slideDot} ${index === currentSlide ? styles.active : ''}`}
      onClick={() => onSlideClick?.(index)}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      aria-label={`Перейти к слайду ${index + 1}`}
      title={`Слайд ${index + 1}`}
    >
      <span className={styles.dotInner} />
    </motion.button>
  ));

  return (
    <motion.div
      className={styles.navigation}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.button
        className={navBtnClasses(currentSlide === 0)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onPrev}
        disabled={currentSlide === 0}
        aria-label="Предыдущий слайд"
      >
        ←
      </motion.button>

      <motion.button
        className={styles.navBtn}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onPlayPause}
        aria-label={isPlaying ? "Пауза" : "Воспроизведение"}
      >
        {isPlaying ? '⏸️' : '▶️'}
      </motion.button>

      <motion.button
        className={navBtnClasses(currentSlide === totalSlides - 1)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onNext}
        disabled={currentSlide === totalSlides - 1}
        aria-label="Следующий слайд"
      >
        →
      </motion.button>

      <div className={styles.slideIndicator}>
        <span className={styles.currentSlide}>{currentSlide + 1}</span>
        <span className={styles.totalSlides}>/ {totalSlides}</span>
      </div>

      <div className={styles.slideDotsContainer}>
        {slideIndicators}
      </div>
    </motion.div>
  );
};