import { useState, useEffect } from 'react';

export interface WindowSize {
  width: number;
  height: number;
}

export function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  }));

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Debounced resize for performance
    let timeoutId: NodeJS.Timeout | null = null;
    const debouncedResize = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(handleResize, 100);
    };

    window.addEventListener('resize', debouncedResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', debouncedResize);
      window.removeEventListener('orientationchange', handleResize);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return windowSize;
}

export function useWindowWidth(): number {
  return useWindowSize().width;
}

export function useWindowHeight(): number {
  return useWindowSize().height;
}

export function useIsWindowSmall(): boolean {
  const { width } = useWindowSize();
  return width < 768;
}

export function useIsWindowMedium(): boolean {
  const { width } = useWindowSize();
  return width >= 768 && width < 1024;
}

export function useIsWindowLarge(): boolean {
  const { width } = useWindowSize();
  return width >= 1024;
}
