import { useEffect, useState } from 'react';
import type { SocketLike } from './socket.types';

export type SocketStatus = 'connected' | 'disconnected' | 'connecting' | 'error';

export function useSocketStatus(socket: SocketLike | null): SocketStatus {
  const [status, setStatus] = useState<SocketStatus>(
    socket?.connected ? 'connected' : 'disconnected'
  );

  useEffect(() => {
    if (!socket) return;
    const onConnect = (): void => setStatus('connected');
    const onDisconnect = (): void => setStatus('disconnected');
    const onError = (): void => setStatus('error');
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('error', onError);
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('error', onError);
    };
  }, [socket]);

  return status;
}
