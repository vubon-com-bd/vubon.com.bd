import { useEffect, useState, type RefObject } from 'react';

export interface BoundingRect {
  readonly top: number;
  readonly left: number;
  readonly right: number;
  readonly bottom: number;
  readonly width: number;
  readonly height: number;
}

export function useBoundingClientRect<T extends HTMLElement>(
  ref: RefObject<T>
): BoundingRect | null {
  const [rect, setRect] = useState<BoundingRect | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = (): void => {
      const r = el.getBoundingClientRect();
      setRect({
        top: r.top,
        left: r.left,
        right: r.right,
        bottom: r.bottom,
        width: r.width,
        height: r.height,
      });
    };
    update();
    window.addEventListener('resize', update, { passive: true });
    window.addEventListener('scroll', update, { passive: true });
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update);
    };
  }, [ref]);

  return rect;
}
