// Компоненты анимаций для презентации
export * from './AnimatedSlide';
export * from './ChallengeAnimations';
export * from './MetricsAnimations';
export * from './TechAnimations';
export * from './VisionAnimations';

// Экспорт конкретных компонентов для удобства использования
export {
  AnimatedProgressBar,
  StatBadge,
  AIRadar,
  type AnimatedProgressBarProps,
  type StatBadgeProps,
  type AIRadarProps
} from './MetricsAnimations';

export {
  TechCategoryCard,
  TechParticles,
  useTechAnimationsAPI,
  type TechCategoryCardProps,
  type TechParticlesProps
} from './TechAnimations';

export {
  VisionCard,
  VisionNotification,
  useVisionNotifications,
  type VisionCardProps,
  type VisionNotificationProps
} from './VisionAnimations';