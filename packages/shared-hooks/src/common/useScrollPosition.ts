import { useState, useEffect } from 'react';

export interface ScrollPosition {
  x: number;
  y: number;
}

export const useScrollPosition = (): ScrollPosition => {
  const [position, setPosition] = useState<ScrollPosition>({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handle = () => setPosition({ x: window.scrollX, y: window.scrollY });
    window.addEventListener('scroll', handle, { passive: true });
    handle();
    return () => window.removeEventListener('scroll', handle);
  }, []);

  return position;
};
