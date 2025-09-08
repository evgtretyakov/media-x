import React from 'react';
import { BaseModernSlide } from './BaseModernSlide';
import type { Slide as SlideType } from '../../types';
import styles from './UIDashboardSlide.module.css';

const UIDashboardSlide: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  const slide: SlideType = {
    id: '8',
    title: 'UI Dashboard мокап',
    content: (
      <div className={styles.dashboardContent}>
        {/* Заглушка для макета дашборда */}
        <div className={styles.dashboardLayout}>
          <div className={styles.dashboardHeader}>
            <div className={styles.headerPlaceholder}>Заголовок дашборда</div>
          </div>
          <div className={styles.dashboardBody}>
            <div className={styles.sidebar}>
              <div className={styles.sidebarItem}>Меню 1</div>
              <div className={styles.sidebarItem}>Меню 2</div>
              <div className={styles.sidebarItem}>Меню 3</div>
            </div>
            <div className={styles.mainContent}>
              <div className={styles.widgetRow}>
                <div className={styles.widget}>Виджет 1</div>
                <div className={styles.widget}>Виджет 2</div>
                <div className={styles.widget}>Виджет 3</div>
              </div>
              <div className={styles.chartArea}>
                <div className={styles.chartPlaceholder}>График аналитики</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    background: 'linear-gradient(135deg, rgba(47, 79, 79, 0.95) 0%, rgba(69, 139, 116, 0.95) 50%, rgba(47, 79, 79, 0.95) 100%)'
  };

  return (
    <BaseModernSlide
      slide={slide}
      isActive={isActive}
      className={styles.uiDashboardSlide}
    />
  );
};

export default UIDashboardSlide;