import { useEffect, useState } from 'react';

export interface Viewport {
  readonly width: number;
  readonly height: number;
  readonly dpr: number;
}

export function useViewport(): Viewport {
  const [vp, setVp] = useState<Viewport>(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
    dpr: typeof window !== 'undefined' ? window.devicePixelRatio : 1,
  }));

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onResize = (): void =>
      setVp({
        width: window.innerWidth,
        height: window.innerHeight,
        dpr: window.devicePixelRatio,
      });
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return vp;
}
