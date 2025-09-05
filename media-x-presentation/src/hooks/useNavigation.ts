// Хук для навигации по слайдам (аналог navigation.js из оригинальной презентации)
import React, { useCallback } from 'react';
import { usePresentationStore } from '../store/usePresentationStore';
import { validateSlideIndex } from '../utils/presentationUtils';

export const useNavigation = () => {
  const {
    currentSlide,
    totalSlides,
    setCurrentSlide,
    nextSlide: storeNextSlide,
    prevSlide: storePrevSlide
  } = usePresentationStore();

  // Переход к конкретному слайду с валидацией
  const goToSlide = useCallback((slideIndex: number) => {
    const validIndex = validateSlideIndex(slideIndex, totalSlides);
    if (validIndex !== currentSlide) {
      setCurrentSlide(validIndex);
    }
  }, [currentSlide, totalSlides, setCurrentSlide]);

  // Переход к следующему слайду
  const nextSlide = useCallback(() => {
    if (currentSlide < totalSlides - 1) {
      storeNextSlide();
    }
  }, [currentSlide, totalSlides, storeNextSlide]);

  // Переход к предыдущему слайду
  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      storePrevSlide();
    }
  }, [currentSlide, storePrevSlide]);

  // Переход к первому слайду
  const goToFirstSlide = useCallback(() => {
    goToSlide(0);
  }, [goToSlide]);

  // Переход к последнему слайду
  const goToLastSlide = useCallback(() => {
    goToSlide(totalSlides - 1);
  }, [goToSlide, totalSlides]);

  // Проверка возможности навигации
  const canGoNext = currentSlide < totalSlides - 1;
  const canGoPrev = currentSlide > 0;

  // Обновление состояния кнопок навигации
  const getNavigationState = useCallback(() => ({
    canGoNext,
    canGoPrev,
    currentSlide,
    totalSlides
  }), [canGoNext, canGoPrev, currentSlide, totalSlides]);

  return {
    // Основные методы навигации
    nextSlide,
    prevSlide,
    goToSlide,
    goToFirstSlide,
    goToLastSlide,
    
    // Состояние навигации
    canGoNext,
    canGoPrev,
    currentSlide,
    totalSlides,
    getNavigationState,
    
    // Валидация
    validateSlideIndex: (index: number) => validateSlideIndex(index, totalSlides)
  };
};

// Хук для управления автоматической прокруткой
export const useAutoPlay = (interval: number = 5000) => {
  const { isPlaying, togglePlayPause, nextSlide, currentSlide, totalSlides } = usePresentationStore();

  const startAutoPlay = useCallback(() => {
    if (!isPlaying) {
      togglePlayPause();
    }
  }, [isPlaying, togglePlayPause]);

  const stopAutoPlay = useCallback(() => {
    if (isPlaying) {
      togglePlayPause();
    }
  }, [isPlaying, togglePlayPause]);

  // Эффект для автоматической прокрутки
  React.useEffect(() => {
    let timer: number;

    if (isPlaying) {
      timer = window.setInterval(() => {
        if (currentSlide < totalSlides - 1) {
          nextSlide();
        } else {
          stopAutoPlay(); // Останавливаем на последнем слайде
        }
      }, interval);
    }

    return () => {
      if (timer) {
        window.clearInterval(timer);
      }
    };
  }, [isPlaying, currentSlide, totalSlides, nextSlide, interval, stopAutoPlay]);

  return {
    isPlaying,
    startAutoPlay,
    stopAutoPlay,
    toggleAutoPlay: togglePlayPause
  };
};