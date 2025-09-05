// Хук для управления анимациями (аналог animations.js из оригинальной презентации)
import { useCallback, useEffect, useRef } from 'react';
import { usePresentationStore } from '../store/usePresentationStore';
import { animateSlideContent, useStaggerAnimation } from '../utils/animationUtils';

export const useSlideAnimations = () => {
  const { currentSlide } = usePresentationStore();
  const animationRef = useRef<number | undefined>(undefined);

  // Анимация появления контента на слайде
  const animateContent = useCallback((slideElement: HTMLElement | null) => {
    if (!slideElement) return;

    const contentElements = slideElement.querySelectorAll('h1, h2, p, li, .content-wrapper');
    
    contentElements.forEach((element, index) => {
      const el = element as HTMLElement;
      const delay = index * 200;

      // Сбрасываем стили для анимации
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';

      // Используем CSS transition
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        el.style.transition = 'all 0.6s ease-out';
      }, delay);
    });
  }, []);

  // Очистка анимаций
  const cleanupAnimations = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, []);

  return {
    animateContent,
    cleanupAnimations,
    staggerAnimation: useStaggerAnimation()
  };
};

// Хук для анимаций конкретных слайдов
export const useSpecificSlideAnimations = () => {
  const { currentSlide } = usePresentationStore();

  // Анимации для слайда с вызовами
  const useChallengeAnimations = useCallback(() => {
    const isActive = currentSlide === 1; // Второй слайд (0-based)

    useEffect(() => {
      if (isActive) {
        console.log('🚀 Запуск анимаций для слайда вызовов');
        // TODO: Реализовать специфичные анимации для слайда вызовов
      }
    }, [isActive]);

    return { isActive };
  }, [currentSlide]);

  // Анимации для слайда с метриками
  const useMetricsAnimations = useCallback(() => {
    const isActive = currentSlide === 2; // Третий слайд (0-based)

    useEffect(() => {
      if (isActive) {
        console.log('📊 Запуск анимаций для слайда метрик');
        // TODO: Реализовать специфичные анимации для слайда метрик
      }
    }, [isActive]);

    return { isActive };
  }, [currentSlide]);

  return {
    useChallengeAnimations,
    useMetricsAnimations
  };
};

// Хук для управления непрерывными анимациями
export const useContinuousAnimations = () => {
  const intervalRef = useRef<number | undefined>(undefined);
  const { currentSlide } = usePresentationStore();

  // Запуск непрерывных анимаций
  const startContinuousAnimations = useCallback((callback: () => void, interval: number = 3000) => {
    stopContinuousAnimations();
    
    intervalRef.current = window.setInterval(() => {
      callback();
    }, interval);
  }, []);

  // Остановка непрерывных анимаций
  const stopContinuousAnimations = useCallback(() => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  }, []);

  // Автоматическая остановка при смене слайда
  useEffect(() => {
    return () => {
      stopContinuousAnimations();
    };
  }, [currentSlide, stopContinuousAnimations]);

  return {
    startContinuousAnimations,
    stopContinuousAnimations
  };
};

// Хук для glitch эффекта (аналог initGlitchEffect из оригинальной презентации)
export const useGlitchEffect = () => {
  const intervalRef = useRef<number | undefined>(undefined);

  const initGlitchEffect = useCallback((elements: HTMLElement[]) => {
    stopGlitchEffect();

    elements.forEach(element => {
      intervalRef.current = window.setInterval(() => {
        if (element.offsetParent !== null) { // Проверяем видимость элемента
          element.classList.toggle('glitch-active');
        }
      }, 2000);
    });
  }, []);

  const stopGlitchEffect = useCallback(() => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  }, []);

  useEffect(() => {
    return () => {
      stopGlitchEffect();
    };
  }, [stopGlitchEffect]);

  return {
    initGlitchEffect,
    stopGlitchEffect
  };
};

// Хук для пульсирующих анимаций
export const usePulseAnimation = () => {
  const pulse = useCallback((element: HTMLElement, duration: number = 1000) => {
    element.classList.add('pulse');
    setTimeout(() => {
      element.classList.remove('pulse');
    }, duration);
  }, []);

  return { pulse };
};

// Композитный хук для всех анимаций
export const useAnimations = () => {
  const slideAnimations = useSlideAnimations();
  const specificAnimations = useSpecificSlideAnimations();
  const continuousAnimations = useContinuousAnimations();
  const glitchEffect = useGlitchEffect();
  const pulseAnimation = usePulseAnimation();

  return {
    ...slideAnimations,
    ...specificAnimations,
    ...continuousAnimations,
    ...glitchEffect,
    ...pulseAnimation
  };
};