'use server';

import { cookies } from 'next/headers';
import { AUTH_COOKIE_NAMES } from '../utils/cookie-names';
import { ACCESS_COOKIE_OPTIONS } from '../utils/cookie-options';

export interface RefreshActionDeps {
  readonly refresh: (refreshToken: string) => Promise<{
    readonly accessToken: string;
    readonly expiresIn: number;
  }>;
}

export function createRefreshAction(deps: RefreshActionDeps) {
  return async function refreshAction(): Promise<{
    readonly ok: boolean;
    readonly error?: string;
  }> {
    const store = await cookies();
    const refreshToken = store.get(AUTH_COOKIE_NAMES.refreshToken)?.value;
    if (!refreshToken) return { ok: false, error: 'No refresh token' };

    try {
      const { accessToken } = await deps.refresh(refreshToken);
      store.set(AUTH_COOKIE_NAMES.accessToken, accessToken, ACCESS_COOKIE_OPTIONS);
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : 'Refresh failed' };
    }
  };
}
