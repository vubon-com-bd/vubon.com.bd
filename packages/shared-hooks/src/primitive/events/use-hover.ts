import { useCallback, useState } from 'react';

export interface HoverHandlers {
  readonly onMouseEnter: () => void;
  readonly onMouseLeave: () => void;
}

export function useHover(): readonly [boolean, HoverHandlers] {
  const [hovered, setHovered] = useState(false);
  const onMouseEnter = useCallback(() => setHovered(true), []);
  const onMouseLeave = useCallback(() => setHovered(false), []);
  return [hovered, { onMouseEnter, onMouseLeave }] as const;
}
