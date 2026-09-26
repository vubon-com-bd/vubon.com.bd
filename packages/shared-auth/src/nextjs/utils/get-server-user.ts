import { cookies } from 'next/headers';
import type { AuthUser } from '../../react/contexts/auth.context.types';
import { AUTH_COOKIE_NAMES } from './cookie-names';

/**
 * Read the authenticated user from server-side cookies.
 * ⚠️ SERVER-ONLY.
 *
 * NOTE: The access token is opaque to this helper — you should
 * call your backend to resolve the user. This is a thin wrapper.
 */
export async function getServerAccessToken(): Promise<string | null> {
  const store = await cookies();
  return store.get(AUTH_COOKIE_NAMES.accessToken)?.value ?? null;
}

export async function getServerUser(
  resolveUser: (accessToken: string) => Promise<AuthUser | null>
): Promise<AuthUser | null> {
  const token = await getServerAccessToken();
  if (!token) return null;
  return resolveUser(token);
}
