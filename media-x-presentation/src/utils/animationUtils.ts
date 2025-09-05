// Утилиты для анимаций с Framer Motion
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

// Базовые варианты анимаций
export const slideVariants: Variants = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 }
};

export const fadeVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

export const scaleVariants: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.2 }
};

// Анимация появления контента на слайде (аналог animateSlideContent из оригинальной презентации)
export const animateSlideContent = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  },
  item: {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 }
  }
};

// easing функции для плавных анимаций (аналог addEasingFunctions из оригинальной презентации)
export const easingFunctions = {
  easeInOutQuint: [0.83, 0, 0.17, 1], // cubic-bezier(0.83, 0, 0.17, 1)
  easeOutQuart: [0.25, 1, 0.5, 1],    // cubic-bezier(0.25, 1, 0.5, 1)
  easeOutBack: [0.34, 1.56, 0.64, 1], // cubic-bezier(0.34, 1.56, 0.64, 1)
  easeOutElastic: [0.68, -0.6, 0.32, 1.6] // cubic-bezier(0.68, -0.6, 0.32, 1.6)
};

// Хук для создания staggered анимации
export const useStaggerAnimation = (delay: number = 0.1) => {
  return {
    container: {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: delay
        }
      }
    },
    item: {
      hidden: { opacity: 0, y: 20 },
      show: { opacity: 1, y: 0 }
    }
  };
};

// Анимация для карточек при наведении
export const cardHoverAnimation = {
  whileHover: { 
    scale: 1.05,
    y: -5,
    transition: { duration: 0.2 }
  },
  whileTap: { scale: 0.95 }
};

// Анимация для кнопок
export const buttonAnimation = {
  whileHover: { scale: 1.1 },
  whileTap: { scale: 0.9 }
};

// Утилиты для управления анимациями
export const createAnimationSequence = (
  elements: HTMLElement[],
  animation: (el: HTMLElement, index: number) => void,
  delay: number = 200
) => {
  elements.forEach((element, index) => {
    setTimeout(() => animation(element, index), index * delay);
  });
};

// Преобразование jQuery easing в CSS transition timing function
export const jQueryEasingToCSS = (easingName: keyof typeof easingFunctions): string => {
  const [x1, y1, x2, y2] = easingFunctions[easingName];
  return `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`;
};

// Хелпер для создания motion компонентов с предустановленными анимациями
export const createAnimatedComponent = (
  component: React.ComponentType<any>,
  variants: Variants
) => {
  return motion(component);
};

// Утилита для проверки поддержки Web Animations API
export const supportsWebAnimations = (): boolean => {
  return typeof Element !== 'undefined' && 
         'animate' in Element.prototype;
};

// Функция для предзагрузки изображений (аналог preloadImages из оригинальной презентации)
export const preloadImages = (imageUrls: string[]): Promise<void[]> => {
  return Promise.all(
    imageUrls.map(url => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve();
        img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
      });
    })
  );
};

// Список изображений для предзагрузки (из оригинальной презентации)
export const presentationImages = [
  'images/title_slide_ai_media.png',
  'images/hook_llm_chat.jpg',
  'images/vision_knowledge_source.png',
  'images/solution_pipeline_diagram.png',
  'images/llm_structured_data.png',
  'images/ui_dashboard_mockup.png',
  'images/tech_stack_icons.png',
  'images/why_now_rocket.png',
  'images/roadmap_timeline.png',
  'images/team_collaboration.png',
  'images/request_growth_chart.png',
  'images/qna_contact.png'
];