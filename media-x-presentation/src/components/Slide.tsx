import React from 'react';
import { motion } from 'framer-motion';
import type { Slide as SlideType } from '../types';
import styles from '../styles/modules/Slide.module.css';

interface SlideProps {
  slide: SlideType;
  isActive: boolean;
  className?: string;
}

export const Slide: React.FC<SlideProps> = ({ slide, isActive, className = '' }) => {
  const slideClasses = [
    styles.slide,
    isActive ? styles.active : '',
    className
  ].filter(Boolean).join(' ');

  const titleClasses = [
    styles.title,
    isActive ? styles.activeTitle : ''
  ].filter(Boolean).join(' ');

  const contentClasses = [
    styles.text,
    isActive ? styles.activeText : ''
  ].filter(Boolean).join(' ');

  return (
    <motion.div
      className={slideClasses}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: isActive ? 1 : 0.7,
        scale: isActive ? 1 : 0.95
      }}
      transition={{ duration: 0.5 }}
      style={{
        background: slide.background || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}
    >
      <motion.h1
        className={titleClasses}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {slide.title}
      </motion.h1>
      
      <motion.div
        className={contentClasses}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        {slide.content}
      </motion.div>
    </motion.div>
  );
};