import { useCallback, useState } from 'react';

export interface AlertState {
  readonly message: string | null;
  readonly visible: boolean;
  readonly show: (message: string) => void;
  readonly dismiss: () => void;
}

export function useAlert(): AlertState {
  const [message, setMessage] = useState<string | null>(null);

  const show = useCallback((msg: string) => setMessage(msg), []);
  const dismiss = useCallback(() => setMessage(null), []);

  return { message, visible: message !== null, show, dismiss };
}
