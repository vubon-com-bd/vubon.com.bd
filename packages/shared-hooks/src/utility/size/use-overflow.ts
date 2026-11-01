import { useEffect, useState, type RefObject } from 'react';

export interface Overflow {
  readonly horizontal: boolean;
  readonly vertical: boolean;
}

export function useOverflow<T extends HTMLElement>(ref: RefObject<T>): Overflow {
  const [overflow, setOverflow] = useState<Overflow>({
    horizontal: false,
    vertical: false,
  });

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const check = (): void => {
      setOverflow({
        horizontal: el.scrollWidth > el.clientWidth,
        vertical: el.scrollHeight > el.clientHeight,
      });
    };
    const ro = new ResizeObserver(check);
    ro.observe(el);
    check();
    return () => ro.disconnect();
  }, [ref]);

  return overflow;
}
