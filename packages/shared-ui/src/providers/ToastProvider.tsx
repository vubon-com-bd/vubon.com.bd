'use client';
import { createContext, useContext, type ReactNode } from 'react';
import { Toast, ToastViewport } from '../components/feedback/Toast';
import { useToast, type UseToastResult, type ShowToastInput, type UiToastVariant } from '../hooks/use-toast';

const ToastContext = createContext<UseToastResult | null>(null);

export interface ToastProviderProps {
  readonly children: ReactNode;
  readonly position?:
    | 'top-right'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-left'
    | 'top-center'
    | 'bottom-center';
}

export function ToastProvider({
  children,
  position = 'top-right',
}: ToastProviderProps): JSX.Element {
  const value = useToast();
  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport position={position}>
        {value.toasts.map((t) => (
          <Toast
            key={t.id}
            variant={t.variant}
            title={t.title}
            {...(t.description !== undefined && { description: t.description })}
            onClose={() => value.dismiss(t.id)}
          />
        ))}
      </ToastViewport>
    </ToastContext.Provider>
  );
}

export function useToastContext(): UseToastResult {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToastContext must be used within <ToastProvider>');
  return ctx;
}

export type { ShowToastInput, UiToastVariant };
