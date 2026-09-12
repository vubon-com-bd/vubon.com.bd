import { useState, useCallback, useRef, useEffect } from 'react';

export interface UseHoverReturn<T extends HTMLElement = HTMLElement> {
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  ref: React.RefObject<T>;
}

export const useHover = <T extends HTMLElement = HTMLElement>(): UseHoverReturn<T> => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<T>(null);

  const onMouseEnter = useCallback(() => setIsHovered(true), []);
  const onMouseLeave = useCallback(() => setIsHovered(false), []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    node.addEventListener('mouseenter', onMouseEnter);
    node.addEventListener('mouseleave', onMouseLeave);
    return () => {
      node.removeEventListener('mouseenter', onMouseEnter);
      node.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [onMouseEnter, onMouseLeave]);

  return { isHovered, onMouseEnter, onMouseLeave, ref };
};
