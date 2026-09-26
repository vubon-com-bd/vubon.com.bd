import { transitions } from '../tokens/transitions';

export const animationClasses = Object.freeze({
  spin: 'animate-spin',
  pulse: 'animate-pulse',
  fadeIn: 'animate-fade-in',
  fadeOut: 'animate-fade-out',
  slideInUp: 'animate-slide-in-up',
  slideInDown: 'animate-slide-in-down',
  slideInLeft: 'animate-slide-in-left',
  slideInRight: 'animate-slide-in-right',
  scaleIn: 'animate-scale-in',
  bounce: 'animate-bounce',
} as const);

export type AnimationClass = keyof typeof animationClasses;

/** Build a CSS transition string from tokens. */
export function buildTransition(
  properties: readonly string[],
  duration: keyof typeof transitions.duration = 'normal',
  easing: keyof typeof transitions.easing = 'easeInOut'
): string {
  const d = transitions.duration[duration];
  const e = transitions.easing[easing];
  return properties.map((p) => `${p} ${d} ${e}`).join(', ');
}

/** Check if user prefers reduced motion. */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
