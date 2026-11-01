import { useCallback } from 'react';
import type { SocketLike } from './socket.types';

/** Returns a stable emit callback. */
export function useSocketEmit(
  socket: SocketLike | null
): (event: string, ...args: unknown[]) => void {
  return useCallback(
    (event: string, ...args: unknown[]) => {
      socket?.emit(event, ...args);
    },
    [socket]
  );
}
