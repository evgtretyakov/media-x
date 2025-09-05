// Утилиты для обработки событий (аналог events.js из оригинальной презентации)
import React from 'react';
import { usePresentationStore } from '../store/usePresentationStore';

// Переменные для управления жестами касания
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

// Обработка жестов касания для мобильных устройств
export const useTouchEvents = (containerRef: React.RefObject<HTMLElement | null>) => {
  const { nextSlide, prevSlide, currentSlide, totalSlides } = usePresentationStore();

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartX) return;

    const touch = e.touches[0];
    touchEndX = touch.clientX;
    touchEndY = touch.clientY;

    // Предотвращаем скролл страницы при горизонтальном свайпе
    const diffX = Math.abs(touchEndX - touchStartX);
    const diffY = Math.abs(touchEndY - touchStartY);

    if (diffX > diffY && diffX > 10) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;

    const diffX = touchStartX - touchEndX;
    const diffY = Math.abs(touchStartY - touchEndY);
    const swipeThreshold = 50;
    const verticalThreshold = 100;

    // Проверяем, что это горизонтальный свайп, а не вертикальный
    if (Math.abs(diffX) > swipeThreshold && diffY < verticalThreshold) {
      if (diffX > 0) {
        // Свайп влево - следующий слайд
        nextSlide();
      } else {
        // Свайп вправо - предыдущий слайд
        prevSlide();
      }
    }

    // Сбрасываем значения
    touchStartX = 0;
    touchEndX = 0;
  };

  return {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd
  };
};

// Обработка кликов мышью по контейнеру слайдов
export const useMouseNavigation = (containerRef: React.RefObject<HTMLElement | null>) => {
  const { nextSlide, prevSlide, currentSlide, totalSlides } = usePresentationStore();

  const handleContainerClick = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    const clickX = e.clientX - containerRef.current.getBoundingClientRect().left;

    // Клик в правой части - следующий слайд
    if (clickX > containerWidth * 0.7 && currentSlide < totalSlides - 1) {
      nextSlide();
    }
    // Клик в левой части - предыдущий слайд
    else if (clickX < containerWidth * 0.3 && currentSlide > 0) {
      prevSlide();
    }
  };

  return {
    onClick: handleContainerClick
  };
};

// Обработка колесика мыши
export const useWheelNavigation = () => {
  const { nextSlide, prevSlide } = usePresentationStore();

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY;

    if (delta > 0) {
      // Прокрутка вниз - следующий слайд
      nextSlide();
    } else if (delta < 0) {
      // Прокрутка вверх - предыдущий слайд
      prevSlide();
    }
  };

  return {
    onWheel: handleWheel
  };
};

// Обработка клавиатуры
export const useKeyboardNavigation = () => {
  const { nextSlide, prevSlide, setCurrentSlide, totalSlides } = usePresentationStore();

  const handleKeyDown = (e: KeyboardEvent) => {
    console.log('⌨️  Нажата клавиша:', e.key, 'Код:', e.code);

    switch(e.key) {
      case 'ArrowRight':
      case ' ':
      case 'PageDown':
        console.log('➡️  Переход вперед');
        nextSlide();
        e.preventDefault();
        break;

      case 'ArrowLeft':
      case 'PageUp':
        console.log('⬅️  Переход назад');
        prevSlide();
        e.preventDefault();
        break;

      case 'Home':
        console.log('🏠 Home - переход к первому слайду');
        setCurrentSlide(0);
        e.preventDefault();
        break;

      case 'End':
        console.log('🔚 End - переход к последнему слайду');
        setCurrentSlide(totalSlides - 1);
        e.preventDefault();
        break;

      case '1':
      case '2':
      case '3':
      case '4':
        const num = parseInt(e.key);
        console.log('🔢 Цифра', num, '- переход к слайду', num);
        if (num >= 1 && num <= totalSlides) {
          setCurrentSlide(num - 1);
          e.preventDefault();
        } else {
          console.log('❌ Неверный номер слайда:', num);
        }
        break;

      default:
        console.log('ℹ️  Клавиша не обрабатывается:', e.key);
    }
  };

  // Установка глобального обработчика клавиатуры
  const setupKeyboardHandler = () => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  };

  return {
    setupKeyboardHandler
  };
};

// Функция переключения расширения презентации
export const usePresentationExpand = () => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    console.log(isExpanded ? '📐 Презентация возвращена к обычному размеру' : '🖥️ Презентация расширена на весь экран');
  };

  return {
    isExpanded,
    toggleExpand,
    containerClass: isExpanded ? 'expanded' : '',
    buttonClass: isExpanded ? 'expanded' : ''
  };
};

// Композитный хук для всех обработчиков событий
export const useEventHandlers = (containerRef: React.RefObject<HTMLElement | null>) => {
  const touchEvents = useTouchEvents(containerRef);
  const mouseEvents = useMouseNavigation(containerRef);
  const wheelEvents = useWheelNavigation();
  const keyboardEvents = useKeyboardNavigation();
  const expandEvents = usePresentationExpand();

  // Установка всех обработчиков
  React.useEffect(() => {
    const cleanup = keyboardEvents.setupKeyboardHandler();
    return cleanup;
  }, []);

  return {
    // События для контейнера
    containerEvents: {
      onTouchStart: touchEvents.onTouchStart,
      onTouchMove: touchEvents.onTouchMove,
      onTouchEnd: touchEvents.onTouchEnd,
      onClick: mouseEvents.onClick,
      onWheel: wheelEvents.onWheel
    },
    // События для расширения
    expandEvents
  };
};