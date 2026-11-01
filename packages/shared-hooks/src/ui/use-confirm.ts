import { useCallback, useState } from 'react';

export interface ConfirmOptions {
  readonly title: string;
  readonly message: string;
  readonly confirmLabel?: string;
  readonly cancelLabel?: string;
}

export interface ConfirmState {
  readonly options: ConfirmOptions | null;
  readonly visible: boolean;
  readonly confirm: (options: ConfirmOptions) => Promise<boolean>;
  readonly accept: () => void;
  readonly reject: () => void;
}

/** Promise-based confirm dialog state. */
export function useConfirm(): ConfirmState {
  const [options, setOptions] = useState<ConfirmOptions | null>(null);
  const [resolver, setResolver] = useState<((v: boolean) => void) | null>(null);

  const confirm = useCallback((opts: ConfirmOptions): Promise<boolean> => {
    return new Promise<boolean>((resolve) => {
      setOptions(opts);
      setResolver(() => resolve);
    });
  }, []);

  const accept = useCallback(() => {
    resolver?.(true);
    setOptions(null);
    setResolver(null);
  }, [resolver]);

  const reject = useCallback(() => {
    resolver?.(false);
    setOptions(null);
    setResolver(null);
  }, [resolver]);

  return {
    options,
    visible: options !== null,
    confirm,
    accept,
    reject,
  };
}
