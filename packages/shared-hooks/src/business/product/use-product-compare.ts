import { useCallback, useState } from 'react';

export function useProductCompare(maxItems = 4): {
  readonly ids: readonly string[];
  readonly isComparing: (id: string) => boolean;
  readonly toggle: (id: string) => void;
  readonly clear: () => void;
  readonly canAdd: boolean;
} {
  const [ids, setIds] = useState<readonly string[]>([]);

  const toggle = useCallback(
    (id: string) => {
      setIds((prev) => {
        if (prev.includes(id)) return prev.filter((x) => x !== id);
        if (prev.length >= maxItems) return prev;
        return [...prev, id];
      });
    },
    [maxItems]
  );

  const isComparing = useCallback((id: string) => ids.includes(id), [ids]);
  const clear = useCallback(() => setIds([]), []);

  return {
    ids,
    isComparing,
    toggle,
    clear,
    canAdd: ids.length < maxItems,
  };
}
