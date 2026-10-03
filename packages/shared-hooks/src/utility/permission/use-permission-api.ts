import { useCallback, useEffect, useState } from 'react';

/**
 * App-level permission names we support.
 * Superset of DOM's built-in `PermissionName`.
 */
export type AppPermissionName =
  'geolocation' | 'notifications' | 'camera' | 'microphone' | 'clipboard-read' | 'clipboard-write';

export type PermissionState = 'granted' | 'denied' | 'prompt' | 'unsupported';

export interface PermissionApiResult {
  readonly state: PermissionState;
  readonly query: () => Promise<PermissionState>;
  readonly request: () => Promise<PermissionState>;
}

interface PermissionsQueryDescriptor {
  name: string;
}

interface PermissionsApi {
  query(descriptor: PermissionsQueryDescriptor): Promise<{ state: string }>;
}

function getPermissionsApi(): PermissionsApi | null {
  if (typeof navigator === 'undefined') return null;
  const nav = navigator as Navigator & { permissions?: PermissionsApi };
  return nav.permissions ?? null;
}

/** Generic Permissions API hook. */
export function usePermissionApi(name: AppPermissionName): PermissionApiResult {
  const [state, setState] = useState<PermissionState>('prompt');

  const query = useCallback(async (): Promise<PermissionState> => {
    const api = getPermissionsApi();
    if (!api) {
      setState('unsupported');
      return 'unsupported';
    }
    try {
      const status = await api.query({ name });
      const next = status.state as PermissionState;
      setState(next);
      return next;
    } catch {
      setState('unsupported');
      return 'unsupported';
    }
  }, [name]);

  useEffect(() => {
    void query();
  }, [query]);

  const request = useCallback(() => query(), [query]);

  return { state, query, request };
}
