import React, { useEffect, useRef } from 'react';
import { AnimatedSlide } from './animations/AnimatedSlide';
import { Navigation } from './components/Navigation';
import { usePresentationStore } from './store/usePresentationStore';
import { useEvents } from './hooks/useEvents';
import { setupGlobalPresentationAPI } from './utils/presentationUtils';
import { preloadImages, presentationImages } from './utils/animationUtils';
import type { Slide as SlideType } from './types';
import './styles/global/index.css';

const slides: SlideType[] = [
  {
    id: '1',
    title: 'Media X: AI-Powered Media Platform',
    content: (
      <div className="content-wrapper">
        <div className="text-content">
          <h2 className="subtitle">Интеллектуальная платформа для работы с медиа-контентом</h2>
          <p>Современное решение для анализа, обработки и генерации медиа-материалов с использованием искусственного интеллекта</p>
        </div>
        <div className="image-content">
          <div className="placeholder-image">AI Media</div>
        </div>
      </div>
    ),
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  {
    id: '2',
    title: 'Вызовы современного медиа-ландшафта',
    content: (
      <div className="challenge-content">
        <div className="ai-chat-visual">
          <div className="chat-interface">
            <div className="chat-header">
              <div className="chat-avatar">AI</div>
              <div className="chat-title">Media Assistant</div>
            </div>
            <div className="chat-messages">
              <div className="message user-message">
                <div className="message-content">Нужно обработать 1000+ видео</div>
              </div>
              <div className="message ai-message">
                <div className="message-content">Это займет 48+ часов...</div>
              </div>
            </div>
          </div>
        </div>
        <div className="challenge-cards">
          <div className="challenge-card">
            <div className="card-icon">📊</div>
            <h3>Объем данных</h3>
            <p>Экспоненциальный рост медиа-контента</p>
            <div className="card-stats">
              <span className="stat-value">+300%</span>
              <span className="stat-label">в год</span>
            </div>
          </div>
          <div className="challenge-card">
            <div className="card-icon">⏱️</div>
            <h3>Скорость обработки</h3>
            <p>Традиционные методы слишком медленные</p>
            <div className="card-stats">
              <span className="stat-value">5-7x</span>
              <span className="stat-label">медленнее</span>
            </div>
          </div>
          <div className="challenge-card">
            <div className="card-icon">💸</div>
            <h3>Стоимость</h3>
            <p>Высокие операционные расходы</p>
            <div className="card-stats">
              <span className="stat-value">40%</span>
              <span className="stat-label">бюджета</span>
            </div>
          </div>
        </div>
      </div>
    ),
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  },
  {
    id: '3',
    title: 'Технологический стек решения',
    content: (
      <div>
        <ul className="list">
          <li className="list-item">React 18 + TypeScript - современный фронтенд</li>
          <li className="list-item">Node.js + Python - высокопроизводительный бэкенд</li>
          <li className="list-item">TensorFlow/PyTorch - ML и deep learning</li>
          <li className="list-item">Cloud Infrastructure - масштабируемость</li>
          <li className="list-item">WebRTC + WebGL - обработка в реальном времени</li>
        </ul>
      </div>
    ),
    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
  }
];

function App() {
  const {
    currentSlide,
    totalSlides,
    isPlaying,
    nextSlide,
    prevSlide,
    togglePlayPause,
    setTotalSlides,
    setAnimating
  } = usePresentationStore();

  const [isExpanded, setIsExpanded] = React.useState(false);
  const { containerRef, containerEvents, expandEvents } = useEvents();

  // Инициализация презентации
  useEffect(() => {
    // Устанавливаем общее количество слайдов
    setTotalSlides(slides.length);
    
    // Настраиваем глобальное API
    setupGlobalPresentationAPI();
    
    // Предзагрузка изображений
    preloadImages(presentationImages)
      .then(() => console.log('✅ Все изображения предзагружены'))
      .catch(err => console.warn('⚠️ Ошибка предзагрузки изображений:', err));
  }, [setTotalSlides]);

  // Автоматическая прокрутка
  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = window.setInterval(() => {
        if (currentSlide < slides.length - 1) {
          nextSlide();
        } else {
          togglePlayPause();
        }
      }, 5000);
    }
    return () => {
      if (interval) {
        window.clearInterval(interval);
      }
    };
  }, [isPlaying, currentSlide, nextSlide, togglePlayPause]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const containerClasses = [
    'presentation-container',
    isExpanded ? 'expanded' : ''
  ].filter(Boolean).join(' ');

  const expandBtnClasses = [
    'expand-btn',
    isExpanded ? 'expanded' : ''
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      <div
        ref={containerRef}
        className="slides-container"
        {...containerEvents}
        style={{ outline: 'none' }} // Убираем outline для фокуса
      >
        {slides.map((slide, index) => (
          <AnimatedSlide
            key={slide.id}
            slide={slide}
            isActive={index === currentSlide}
            animationType={index === 0 ? 'fade' : 'slide'}
          />
        ))}
      </div>
      
      <Navigation
        onNext={nextSlide}
        onPrev={prevSlide}
        onPlayPause={togglePlayPause}
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        isPlaying={isPlaying}
      />

      <button
        className={expandBtnClasses}
        title={isExpanded ? "Collapse presentation" : "Expand presentation"}
        onClick={toggleExpand}
      >
        {isExpanded ? '⛶' : '⛶'}
      </button>
    </div>
  );
}

export default App;
