// Хук для обработки событий (аналог events.js из оригинальной презентации)
import { useCallback, useRef, useEffect } from 'react';
import { usePresentationStore } from '../store/usePresentationStore';
import { useEventHandlers } from '../utils/eventUtils';

export const useEvents = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const eventHandlers = useEventHandlers(containerRef);

  return {
    containerRef,
    containerEvents: eventHandlers.containerEvents,
    expandEvents: eventHandlers.expandEvents
  };
};

// Хук для управления фокусом контейнера
export const useContainerFocus = (containerRef: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    if (containerRef.current) {
      // Устанавливаем фокус на контейнер для обработки клавиатуры
      containerRef.current.tabIndex = 0;
      containerRef.current.focus();
    }
  }, [containerRef]);
};

// Хук для обработки жестов касания
export const useTouchGesture = () => {
  const { nextSlide, prevSlide } = usePresentationStore();
  const touchStartRef = useRef({ x: 0, y: 0 });
  const touchEndRef = useRef({ x: 0, y: 0 });

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!touchStartRef.current.x) return;

    const touch = e.touches[0];
    touchEndRef.current = { x: touch.clientX, y: touch.clientY };

    // Предотвращаем скролл страницы при горизонтальном свайпе
    const diffX = Math.abs(touchEndRef.current.x - touchStartRef.current.x);
    const diffY = Math.abs(touchEndRef.current.y - touchStartRef.current.y);

    if (diffX > diffY && diffX > 10) {
      e.preventDefault();
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchStartRef.current.x || !touchEndRef.current.x) return;

    const diffX = touchStartRef.current.x - touchEndRef.current.x;
    const diffY = Math.abs(touchStartRef.current.y - touchEndRef.current.y);
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
    touchStartRef.current = { x: 0, y: 0 };
    touchEndRef.current = { x: 0, y: 0 };
  }, [nextSlide, prevSlide]);

  return {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd
  };
};

// Хук для обработки кликов по контейнеру
export const useContainerClick = (containerRef: React.RefObject<HTMLElement>) => {
  const { nextSlide, prevSlide, currentSlide, totalSlides } = usePresentationStore();

  const handleClick = useCallback((e: React.MouseEvent) => {
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
  }, [containerRef, currentSlide, totalSlides, nextSlide, prevSlide]);

  return {
    onClick: handleClick
  };
};

// Хук для обработки колесика мыши
export const useWheelNavigation = () => {
  const { nextSlide, prevSlide } = usePresentationStore();

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY;

    if (delta > 0) {
      // Прокрутка вниз - следующий слайд
      nextSlide();
    } else if (delta < 0) {
      // Прокрутка вверх - предыдущий слайд
      prevSlide();
    }
  }, [nextSlide, prevSlide]);

  return {
    onWheel: handleWheel
  };
};

// Композитный хук для всех событий контейнера
export const useContainerEvents = (containerRef: React.RefObject<HTMLElement>) => {
  const touchEvents = useTouchGesture();
  const clickEvents = useContainerClick(containerRef);
  const wheelEvents = useWheelNavigation();

  return {
    onTouchStart: touchEvents.onTouchStart,
    onTouchMove: touchEvents.onTouchMove,
    onTouchEnd: touchEvents.onTouchEnd,
    onClick: clickEvents.onClick,
    onWheel: wheelEvents.onWheel
  };
};