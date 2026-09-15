import type { AuthUser } from '../contexts/auth.context.types';

/** Safe display name for a user. */
export function displayName(user: AuthUser | null): string {
  if (!user) return 'Guest';
  return user.name?.trim() || user.email?.split('@')[0] || 'User';
}

/** First letter avatar fallback. */
export function avatarFallback(user: AuthUser | null): string {
  const name = displayName(user);
  return name.charAt(0).toUpperCase();
}

/** True if user has an avatar image. */
export function hasAvatar(user: AuthUser | null): boolean {
  return Boolean(user?.avatarUrl);
}
