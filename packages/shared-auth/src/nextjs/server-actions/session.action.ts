'use server';

import { cookies } from 'next/headers';
import type { SessionInfo } from '../../common/session/session.types';
import { AUTH_COOKIE_NAMES } from '../utils/cookie-names';

export interface SessionActionDeps {
  readonly fetchSession: (sessionId: string) => Promise<SessionInfo | null>;
}

/**
 * Factory returning a server action that returns the current session.
 * Returns `null` if no session cookie exists.
 */
export function createSessionAction(deps: SessionActionDeps) {
  return async function sessionAction(): Promise<SessionInfo | null> {
    const store = await cookies();
    const sessionId = store.get(AUTH_COOKIE_NAMES.sessionId)?.value;
    if (!sessionId) return null;
    try {
      return await deps.fetchSession(sessionId);
    } catch {
      return null;
    }
  };
}
