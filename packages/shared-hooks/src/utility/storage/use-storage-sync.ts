import { useEffect, useState } from 'react';

/**
 * BroadcastChannel-based cross-tab sync.
 * Use when you want real-time sync without localStorage events.
 */
export function useStorageSync<T>(
  channelName: string,
  initial: T
): readonly [T, (value: T) => void] {
  const [value, setValue] = useState<T>(initial);

  useEffect(() => {
    if (typeof BroadcastChannel === 'undefined') return;
    const channel = new BroadcastChannel(channelName);
    const handler = (ev: MessageEvent): void => {
      setValue(ev.data as T);
    };
    channel.addEventListener('message', handler);
    return () => {
      channel.removeEventListener('message', handler);
      channel.close();
    };
  }, [channelName]);

  const broadcast = (next: T): void => {
    setValue(next);
    if (typeof BroadcastChannel !== 'undefined') {
      const channel = new BroadcastChannel(channelName);
      channel.postMessage(next);
      channel.close();
    }
  };

  return [value, broadcast] as const;
}
