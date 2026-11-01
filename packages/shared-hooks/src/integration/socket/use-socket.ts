import { useEffect, useRef, useState } from 'react';
import type { SocketFactory, SocketLike } from './socket.types';

export interface UseSocketResult {
  readonly socket: SocketLike | null;
  readonly connected: boolean;
}

/**
 * Creates a socket once and disconnects on unmount.
 * `factory` MUST be stable (useCallback / module-level).
 */
export function useSocket(
  factory: SocketFactory,
  options: { enabled?: boolean } = {}
): UseSocketResult {
  const [connected, setConnected] = useState(false);
  const ref = useRef<SocketLike | null>(null);

  useEffect(() => {
    if (options.enabled === false) return;
    const socket = factory();
    ref.current = socket;
    socket.connect();

    const onConnect = (): void => setConnected(true);
    const onDisconnect = (): void => setConnected(false);
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.disconnect();
      ref.current = null;
    };
  }, [factory, options.enabled]);

  return { socket: ref.current, connected };
}
