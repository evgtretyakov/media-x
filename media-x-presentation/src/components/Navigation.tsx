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
  isPlaying
}) => {
  const navBtnClasses = (disabled: boolean) => [
    styles.navBtn,
    disabled ? styles.disabled : ''
  ].filter(Boolean).join(' ');

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
      >
        ←
      </motion.button>

      <motion.button
        className={styles.navBtn}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onPlayPause}
      >
        {isPlaying ? '⏸️' : '▶️'}
      </motion.button>

      <motion.button
        className={navBtnClasses(currentSlide === totalSlides - 1)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onNext}
        disabled={currentSlide === totalSlides - 1}
      >
        →
      </motion.button>

      <div className={styles.slideIndicator}>
        <span className={styles.currentSlide}>{currentSlide + 1}</span>
        <span className={styles.totalSlides}>/ {totalSlides}</span>
      </div>
    </motion.div>
  );
};