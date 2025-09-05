// Утилиты для управления презентацией
import { usePresentationStore } from '../store/usePresentationStore';

// Функции для глобального доступа к состоянию презентации
export const usePresentation = () => {
  const store = usePresentationStore();
  
  return {
    // Получение текущего слайда
    getCurrentSlide: () => store.currentSlide,
    
    // Получение общего количества слайдов
    getTotalSlides: () => store.totalSlides,
    
    // Проверка, идет ли анимация
    isAnimating: () => store.isAnimating,
    
    // Переход к следующему слайду
    nextSlide: store.nextSlide,
    
    // Переход к предыдущему слайду
    prevSlide: store.prevSlide,
    
    // Переход к конкретному слайду
    goToSlide: store.setCurrentSlide,
    
    // Переход к первому слайду
    goToFirstSlide: () => store.setCurrentSlide(0),
    
    // Переход к последнему слайду
    goToLastSlide: () => {
      const totalSlides = store.totalSlides;
      if (totalSlides > 0) {
        store.setCurrentSlide(totalSlides - 1);
      }
    },
    
    // Воспроизведение/пауза автопрокрутки
    togglePlayPause: store.togglePlayPause,
    
    // Установка общего количества слайдов
    setTotalSlides: store.setTotalSlides
  };
};

// Утилиты для валидации слайдов
export const validateSlideIndex = (index: number, totalSlides: number): number => {
  return Math.max(0, Math.min(index, totalSlides - 1));
};

// Утилиты для прогресса
export const calculateProgress = (currentSlide: number, totalSlides: number): number => {
  if (totalSlides === 0) return 0;
  return ((currentSlide + 1) / totalSlides) * 100;
};

// Утилиты для навигации
export const canGoNext = (currentSlide: number, totalSlides: number): boolean => {
  return currentSlide < totalSlides - 1;
};

export const canGoPrev = (currentSlide: number): boolean => {
  return currentSlide > 0;
};

// Экспорт глобального API для совместимости с оригинальной презентацией
export const setupGlobalPresentationAPI = () => {
  if (typeof window !== 'undefined') {
    // Создаем обертку для доступа к store через функцию
    // Это позволяет избежать проблем с контекстом React
    const getStore = () => {
      try {
        return usePresentationStore.getState();
      } catch (error) {
        console.warn('⚠️ Не удалось получить состояние store:', error);
        // Возвращаем fallback объект с базовыми значениями
        return {
          nextSlide: () => console.warn('Store недоступен'),
          prevSlide: () => console.warn('Store недоступен'),
          setCurrentSlide: () => console.warn('Store недоступен'),
          currentSlide: 0,
          totalSlides: 3,
          isAnimating: false
        };
      }
    };
    
    window.presentation = {
      next: () => getStore().nextSlide(),
      prev: () => getStore().prevSlide(),
      goTo: (slide: number) => getStore().setCurrentSlide(slide),
      first: () => getStore().setCurrentSlide(0),
      last: () => {
        const store = getStore();
        const totalSlides = store.totalSlides;
        if (totalSlides > 0) {
          store.setCurrentSlide(totalSlides - 1);
        }
      },
      getCurrent: () => getStore().currentSlide,
      getTotal: () => getStore().totalSlides,
      isAnimating: () => getStore().isAnimating
    };
    
    console.log('✅ Глобальное API presentation настроено');
  }
};

// Типы для глобального API
declare global {
  interface Window {
    presentation: {
      next: () => void;
      prev: () => void;
      goTo: (slide: number) => void;
      first: () => void;
      last: () => void;
      getCurrent: () => number;
      getTotal: () => number;
      isAnimating: () => boolean;
    };
  }
}