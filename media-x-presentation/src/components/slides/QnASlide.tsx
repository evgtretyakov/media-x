import React from 'react';
import { BaseModernSlide } from './BaseModernSlide';
import type { Slide as SlideType } from '../../types';
import styles from './QnASlide.module.css';

const QnASlide: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  const slide: SlideType = {
    id: '12',
    title: 'Вопросы и ответы / Контакты',
    content: (
      <div className={styles.qnaContent}>
        {/* Заглушка для контактной информации и Q&A */}
        <div className={styles.contactInfo}>
          <div className={styles.contactItem}>
            <div className={styles.contactIcon}>📧</div>
            <div className={styles.contactText}>info@media-x.com</div>
          </div>
          <div className={styles.contactItem}>
            <div className={styles.contactIcon}>🌐</div>
            <div className={styles.contactText}>www.media-x.com</div>
          </div>
          <div className={styles.contactItem}>
            <div className={styles.contactIcon}>📱</div>
            <div className={styles.contactText}>+7 (999) 123-45-67</div>
          </div>
        </div>
        <div className={styles.qnaSection}>
          <div className={styles.qnaPlaceholder}>
            Интерактивные элементы вопросов и ответов
          </div>
        </div>
        <div className={styles.socialLinks}>
          <div className={styles.socialLink}>LinkedIn</div>
          <div className={styles.socialLink}>Twitter</div>
          <div className={styles.socialLink}>GitHub</div>
        </div>
      </div>
    ),
    background: 'linear-gradient(135deg, rgba(128, 0, 128, 0.95) 0%, rgba(75, 0, 130, 0.95) 50%, rgba(128, 0, 128, 0.95) 100%)'
  };

  return (
    <BaseModernSlide
      slide={slide}
      isActive={isActive}
      className={styles.qnaSlide}
    />
  );
};

export default QnASlide;