import React from 'react';
import { BaseModernSlide } from './BaseModernSlide';
import type { Slide as SlideType } from '../../types';
import styles from './TeamSlide.module.css';

const TeamSlide: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  const slide: SlideType = {
    id: '11',
    title: 'Команда и коллаборация',
    content: (
      <div className={styles.teamContent}>
        {/* Заглушка для карточек команды */}
        <div className={styles.teamGrid}>
          <div className={styles.teamMember}>
            <div className={styles.memberAvatar}>👨‍💻</div>
            <div className={styles.memberName}>Иван Иванов</div>
            <div className={styles.memberRole}>Tech Lead</div>
          </div>
          <div className={styles.teamMember}>
            <div className={styles.memberAvatar}>👩‍🎨</div>
            <div className={styles.memberName}>Мария Петрова</div>
            <div className={styles.memberRole}>Design Lead</div>
          </div>
          <div className={styles.teamMember}>
            <div className={styles.memberAvatar}>👨‍🔬</div>
            <div className={styles.memberName}>Алексей Смирнов</div>
            <div className={styles.memberRole}>AI Specialist</div>
          </div>
          <div className={styles.teamMember}>
            <div className={styles.memberAvatar}>👩‍💼</div>
            <div className={styles.memberName}>Екатерина Козлова</div>
            <div className={styles.memberRole}>Product Manager</div>
          </div>
        </div>
        <div className={styles.collaboration}>
          <div className={styles.collaborationPlaceholder}>
            Анимации коллаборации и взаимодействия
          </div>
        </div>
      </div>
    ),
    background: 'linear-gradient(135deg, rgba(106, 90, 205, 0.95) 0%, rgba(123, 104, 238, 0.95) 50%, rgba(106, 90, 205, 0.95) 100%)'
  };

  return (
    <BaseModernSlide
      slide={slide}
      isActive={isActive}
      className={styles.teamSlide}
    />
  );
};

export default TeamSlide;