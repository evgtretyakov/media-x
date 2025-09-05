export interface Slide {
  id: string;
  title: string;
  content: React.ReactNode;
  background?: string;
  animation?: string;
}

export interface PresentationState {
  currentSlide: number;
  totalSlides: number;
  isPlaying: boolean;
  progress: number;
}

export interface NavigationProps {
  onNext: () => void;
  onPrev: () => void;
  onPlayPause: () => void;
  currentSlide: number;
  totalSlides: number;
  isPlaying: boolean;
}