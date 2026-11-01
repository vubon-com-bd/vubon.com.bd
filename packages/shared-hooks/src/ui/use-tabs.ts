import { useCallback, useState } from 'react';

export function useTabs<T extends string | number>(
  tabs: readonly T[],
  initial?: T
): {
  readonly active: T | null;
  readonly setActive: (tab: T) => void;
  readonly isActive: (tab: T) => boolean;
  readonly next: () => void;
  readonly prev: () => void;
  readonly reset: () => void;
} {
  const [active, setActive] = useState<T | null>(initial ?? tabs[0] ?? null);

  const isActive = useCallback((tab: T) => active === tab, [active]);

  const next = useCallback(() => {
    const idx = tabs.findIndex((t) => t === active);
    if (idx === -1) return;
    setActive(tabs[(idx + 1) % tabs.length] ?? active);
  }, [tabs, active]);

  const prev = useCallback(() => {
    const idx = tabs.findIndex((t) => t === active);
    if (idx === -1) return;
    setActive(tabs[(idx - 1 + tabs.length) % tabs.length] ?? active);
  }, [tabs, active]);

  const reset = useCallback(() => setActive(initial ?? tabs[0] ?? null), [initial, tabs]);

  return { active, setActive, isActive, next, prev, reset };
}
