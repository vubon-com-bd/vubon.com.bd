'use client';
import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react';
import { ConfirmDialog } from '../components/feedback/ConfirmDialog';

export interface ConfirmOptions {
  readonly title: ReactNode;
  readonly message?: ReactNode;
  readonly confirmLabel?: string;
  readonly cancelLabel?: string;
  readonly variant?: 'primary' | 'danger';
}

export interface ConfirmContextValue {
  readonly confirm: (options: ConfirmOptions) => Promise<boolean>;
}

const ConfirmContext = createContext<ConfirmContextValue | null>(null);

export interface ConfirmProviderProps {
  readonly children: ReactNode;
}

export function ConfirmProvider({ children }: ConfirmProviderProps): JSX.Element {
  const [options, setOptions] = useState<ConfirmOptions | null>(null);
  const resolverRef = useRef<((v: boolean) => void) | null>(null);

  const confirm = useCallback((opts: ConfirmOptions): Promise<boolean> => {
    return new Promise<boolean>((resolve) => {
      setOptions(opts);
      resolverRef.current = resolve;
    });
  }, []);

  const accept = useCallback(() => {
    resolverRef.current?.(true);
    resolverRef.current = null;
    setOptions(null);
  }, []);

  const reject = useCallback(() => {
    resolverRef.current?.(false);
    resolverRef.current = null;
    setOptions(null);
  }, []);

  const value: ConfirmContextValue = { confirm };

  return (
    <ConfirmContext.Provider value={value}>
      {children}
      {options && (
        <ConfirmDialog
          open
          title={options.title}
          {...(options.message !== undefined && { message: options.message })}
          {...(options.confirmLabel !== undefined && { confirmLabel: options.confirmLabel })}
          {...(options.cancelLabel !== undefined && { cancelLabel: options.cancelLabel })}
          {...(options.variant !== undefined && { variant: options.variant })}
          onConfirm={accept}
          onCancel={reject}
        />
      )}
    </ConfirmContext.Provider>
  );
}

export function useConfirmContext(): ConfirmContextValue {
  const ctx = useContext(ConfirmContext);
  if (!ctx) throw new Error('useConfirmContext must be used within <ConfirmProvider>');
  return ctx;
}
