import { useEffect, useState } from 'react';

export interface ScrollPosition {
  readonly x: number;
  readonly y: number;
}

export function useScrollPosition(): ScrollPosition {
  const [pos, setPos] = useState<ScrollPosition>(() => ({
    x: typeof window !== 'undefined' ? window.scrollX : 0,
    y: typeof window !== 'undefined' ? window.scrollY : 0,
  }));

  useEffect(() => {
    if (typeof window === 'undefined') return;
    let raf = 0;
    const onScroll = (): void => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setPos({ x: window.scrollX, y: window.scrollY });
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return pos;
}
