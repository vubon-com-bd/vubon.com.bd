import { cookies } from 'next/headers';
import type { SessionInfo } from '../../common/session/session.types';
import { AUTH_COOKIE_NAMES } from './cookie-names';

/**
 * Read the current session from server-side cookies.
 * ⚠️ SERVER-ONLY. Returns null if no session cookie.
 *
 * NOTE: This only reads the session id from cookie. To fetch the
 * full SessionInfo you must call your backend / session service.
 */
export async function getServerSessionId(): Promise<string | null> {
  const store = await cookies();
  return store.get(AUTH_COOKIE_NAMES.sessionId)?.value ?? null;
}

export async function getServerSession(
  fetchSession: (sessionId: string) => Promise<SessionInfo | null>
): Promise<SessionInfo | null> {
  const sessionId = await getServerSessionId();
  if (!sessionId) return null;
  return fetchSession(sessionId);
}
