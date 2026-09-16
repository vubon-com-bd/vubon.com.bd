'use client';
import type { ReactNode } from 'react';
import { ThemeProvider } from './ThemeProvider';
import { ToastProvider } from './ToastProvider';
import { ModalProvider } from './ModalProvider';
import { DrawerProvider } from './DrawerProvider';
import { ConfirmProvider } from './ConfirmProvider';
import { PortalProvider } from './PortalProvider';

export interface RootProviderProps {
  readonly children: ReactNode;
  readonly toastPosition?:
    | 'top-right'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-left'
    | 'top-center'
    | 'bottom-center';
}

/**
 * Combines all UI providers.
 * Order (outer → inner):
 *   Theme → Toast → Modal → Drawer → Confirm → Portal
 */
export function RootProvider({
  children,
  toastPosition = 'top-right',
}: RootProviderProps): JSX.Element {
  return (
    <ThemeProvider>
      <ToastProvider {...(toastPosition !== undefined && { position: toastPosition })}>
        <ModalProvider>
          <DrawerProvider>
            <ConfirmProvider>
              <PortalProvider>{children}</PortalProvider>
            </ConfirmProvider>
          </DrawerProvider>
        </ModalProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
