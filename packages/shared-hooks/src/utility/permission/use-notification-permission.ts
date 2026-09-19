import { useCallback, useEffect, useState } from 'react';

export type NotificationPermissionState = 'default' | 'granted' | 'denied' | 'unsupported';

export function useNotificationPermission(): {
  readonly state: NotificationPermissionState;
  readonly request: () => Promise<NotificationPermissionState>;
} {
  const [state, setState] = useState<NotificationPermissionState>(() => {
    if (typeof Notification === 'undefined') return 'unsupported';
    return Notification.permission as NotificationPermissionState;
  });

  useEffect(() => {
    if (typeof Notification === 'undefined') return;
    setState(Notification.permission as NotificationPermissionState);
  }, []);

  const request = useCallback(async (): Promise<NotificationPermissionState> => {
    if (typeof Notification === 'undefined') return 'unsupported';
    const result = (await Notification.requestPermission()) as NotificationPermissionState;
    setState(result);
    return result;
  }, []);

  return { state, request };
}
