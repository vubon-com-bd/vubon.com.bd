import type { SessionInfo, SessionValidity } from './session.types';

export function validateSession(
  session: SessionInfo | null | undefined,
  idleTimeoutMs = 30 * 60 * 1000
): SessionValidity {
  if (!session) return { valid: false, reason: 'missing' };

  const now = Date.now();
  if (new Date(session.expiresAt).getTime() <= now) {
    return { valid: false, reason: 'expired' };
  }
  if (new Date(session.lastActiveAt).getTime() + idleTimeoutMs <= now) {
    return { valid: false, reason: 'idle-timeout' };
  }
  return { valid: true };
}

export function isSessionActive(
  session: SessionInfo | null | undefined,
  idleTimeoutMs?: number
): boolean {
  return validateSession(session, idleTimeoutMs).valid;
}
