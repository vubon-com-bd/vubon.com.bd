import { useCallback, useState } from 'react';
import type { SocketLike } from './socket.types';

export interface SocketReconnectResult {
  readonly attempt: number;
  readonly reconnect: () => void;
  readonly reset: () => void;
}

/** Manual reconnect helper with attempt counter. */
export function useSocketReconnect(socket: SocketLike | null): SocketReconnectResult {
  const [attempt, setAttempt] = useState(0);
  const reconnect = useCallback(() => {
    if (!socket) return;
    socket.disconnect();
    socket.connect();
    setAttempt((n) => n + 1);
  }, [socket]);
  const reset = useCallback(() => setAttempt(0), []);
  return { attempt, reconnect, reset };
}
