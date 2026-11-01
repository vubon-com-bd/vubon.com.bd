import { useCallback, useState } from 'react';

export interface TouchPoint {
  readonly x: number;
  readonly y: number;
}

export function useTouch(): {
  readonly touching: boolean;
  readonly position: TouchPoint;
  readonly handlers: {
    readonly onTouchStart: (e: React.TouchEvent) => void;
    readonly onTouchMove: (e: React.TouchEvent) => void;
    readonly onTouchEnd: () => void;
  };
} {
  const [touching, setTouching] = useState(false);
  const [position, setPosition] = useState<TouchPoint>({ x: 0, y: 0 });

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    setTouching(true);
    const t = e.touches[0];
    if (t) setPosition({ x: t.clientX, y: t.clientY });
  }, []);
  const onTouchMove = useCallback((e: React.TouchEvent) => {
    const t = e.touches[0];
    if (t) setPosition({ x: t.clientX, y: t.clientY });
  }, []);
  const onTouchEnd = useCallback(() => setTouching(false), []);

  return { touching, position, handlers: { onTouchStart, onTouchMove, onTouchEnd } };
}
