import { useEffect, useRef } from 'react';
import type { SocketLike } from './socket.types';

/** Subscribe to a socket event. Cleanup on unmount. */
export function useSocketEvent<T = unknown>(
  socket: SocketLike | null,
  event: string,
  handler: (data: T) => void
): void {
  const ref = useRef(handler);
  ref.current = handler;

  useEffect(() => {
    if (!socket) return;
    const listener = (...args: unknown[]): void => {
      ref.current(args[0] as T);
    };
    socket.on(event, listener);
    return () => socket.off(event, listener);
  }, [socket, event]);
}
