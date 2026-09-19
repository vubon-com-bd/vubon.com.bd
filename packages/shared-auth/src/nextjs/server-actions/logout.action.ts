'use server';

import { cookies } from 'next/headers';
import { AUTH_COOKIE_NAMES } from '../utils/cookie-names';

export interface LogoutActionDeps {
  readonly logout: (sessionId: string) => Promise<void>;
}

export function createLogoutAction(deps: LogoutActionDeps) {
  return async function logoutAction(): Promise<void> {
    const store = await cookies();
    const sessionId = store.get(AUTH_COOKIE_NAMES.sessionId)?.value;
    if (sessionId) {
      try {
        await deps.logout(sessionId);
      } catch {
        // best-effort
      }
    }
    store.delete(AUTH_COOKIE_NAMES.accessToken);
    store.delete(AUTH_COOKIE_NAMES.refreshToken);
    store.delete(AUTH_COOKIE_NAMES.sessionId);
  };
}
