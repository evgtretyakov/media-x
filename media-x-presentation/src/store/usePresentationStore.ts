import { create } from 'zustand';
import type { PresentationState } from '../types';

interface PresentationStore {
  currentSlide: number;
  totalSlides: number;
  isPlaying: boolean;
  isAnimating: boolean;
  progress: number;
  setCurrentSlide: (slide: number) => void;
  nextSlide: () => void;
  prevSlide: () => void;
  togglePlayPause: () => void;
  setTotalSlides: (total: number) => void;
  updateProgress: (progress: number) => void;
  setAnimating: (animating: boolean) => void;
  goToFirstSlide: () => void;
  goToLastSlide: () => void;
  goToSlide: (slide: number) => void;
}

export const usePresentationStore = create<PresentationStore>((set, get) => ({
  currentSlide: 0,
  totalSlides: 0,
  isPlaying: false,
  isAnimating: false,
  progress: 0,

  setCurrentSlide: (slide: number) => {
    const { totalSlides } = get();
    const validSlide = Math.max(0, Math.min(slide, totalSlides - 1));
    set({ currentSlide: validSlide });
  },

  nextSlide: () => {
    const { currentSlide, totalSlides, isAnimating } = get();
    if (isAnimating || currentSlide >= totalSlides - 1) return;
    set({ currentSlide: currentSlide + 1 });
  },

  prevSlide: () => {
    const { currentSlide, isAnimating } = get();
    if (isAnimating || currentSlide <= 0) return;
    set({ currentSlide: currentSlide - 1 });
  },

  togglePlayPause: () => {
    set((state) => ({ isPlaying: !state.isPlaying }));
  },

  setTotalSlides: (total: number) => {
    set({ totalSlides: total });
  },

  updateProgress: (progress: number) => {
    set({ progress: Math.max(0, Math.min(progress, 100)) });
  },

  setAnimating: (animating: boolean) => {
    set({ isAnimating: animating });
  },

  goToFirstSlide: () => {
    const { isAnimating } = get();
    if (isAnimating) return;
    set({ currentSlide: 0 });
  },

  goToLastSlide: () => {
    const { totalSlides, isAnimating } = get();
    if (isAnimating || totalSlides === 0) return;
    set({ currentSlide: totalSlides - 1 });
  },

  goToSlide: (slide: number) => {
    const { totalSlides, isAnimating } = get();
    if (isAnimating || slide < 0 || slide >= totalSlides) return;
    set({ currentSlide: slide });
  }
}));