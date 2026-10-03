'use client';
import { useEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
  readonly children: ReactNode;
  readonly container?: HTMLElement | null;
}

export function Portal({ children, container }: PortalProps): ReactNode {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || typeof document === 'undefined') return null;
  const target = container ?? document.body;
  return createPortal(children, target);
}
