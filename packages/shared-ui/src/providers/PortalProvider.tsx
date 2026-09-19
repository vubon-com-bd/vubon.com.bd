'use client';
import { createContext, useContext, useRef, type ReactNode } from 'react';

export interface PortalContextValue {
  readonly container: HTMLElement | null;
}

const PortalContext = createContext<PortalContextValue>({ container: null });

export interface PortalProviderProps {
  readonly children: ReactNode;
  readonly container?: HTMLElement | null;
}

/**
 * Provides a portal container for overlays.
 * ⚠️ Portal target is resolved via ref on mount.
 */
export function PortalProvider({ children, container }: PortalProviderProps): JSX.Element {
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <PortalContext.Provider value={{ container: container ?? ref.current }}>
      {children}
      {container === undefined && <div ref={ref} data-portal-root aria-hidden="true" />}
    </PortalContext.Provider>
  );
}

export function usePortalContext(): PortalContextValue {
  return useContext(PortalContext);
}
