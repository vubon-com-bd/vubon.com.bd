'use client';
import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { Drawer, type DrawerSide } from '../components/overlays/Drawer';

export interface DrawerStackItem {
  readonly id: string;
  readonly content: ReactNode;
  readonly side?: DrawerSide;
  readonly title?: ReactNode;
}

export interface DrawerContextValue {
  readonly openDrawers: readonly DrawerStackItem[];
  readonly openDrawer: (item: DrawerStackItem) => void;
  readonly closeDrawer: (id: string) => void;
  readonly closeAll: () => void;
}

const DrawerContext = createContext<DrawerContextValue | null>(null);

export interface DrawerProviderProps {
  readonly children: ReactNode;
}

export function DrawerProvider({ children }: DrawerProviderProps): JSX.Element {
  const [openDrawers, setOpenDrawers] = useState<readonly DrawerStackItem[]>([]);

  const openDrawer = useCallback((item: DrawerStackItem) => {
    setOpenDrawers((prev) => (prev.some((d) => d.id === item.id) ? prev : [...prev, item]));
  }, []);

  const closeDrawer = useCallback((id: string) => {
    setOpenDrawers((prev) => prev.filter((d) => d.id !== id));
  }, []);

  const closeAll = useCallback(() => setOpenDrawers([]), []);

  const value: DrawerContextValue = { openDrawers, openDrawer, closeDrawer, closeAll };

  return (
    <DrawerContext.Provider value={value}>
      {children}
      {openDrawers.map((d) => (
        <Drawer
          key={d.id}
          open
          onClose={() => closeDrawer(d.id)}
          {...(d.side !== undefined && { side: d.side })}
          {...(d.title !== undefined && { title: d.title })}
        >
          {d.content}
        </Drawer>
      ))}
    </DrawerContext.Provider>
  );
}

export function useDrawerContext(): DrawerContextValue {
  const ctx = useContext(DrawerContext);
  if (!ctx) throw new Error('useDrawerContext must be used within <DrawerProvider>');
  return ctx;
}
