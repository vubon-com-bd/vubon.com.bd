import type { SessionServiceContract } from './session.service.interface';

/**
 * Session invalidation hooks.
 * Call these when security-sensitive events happen.
 *
 * Rule: password change / role change MUST invalidate ALL sessions.
 */
export interface SessionInvalidationHooks {
  onPasswordChange(userId: string): Promise<void>;
  onRoleChange(userId: string): Promise<void>;
  onEmailChange(userId: string): Promise<void>;
  onPhoneChange(userId: string): Promise<void>;
  onMfaChange(userId: string): Promise<void>;
  onAccountLock(userId: string): Promise<void>;
}

export function createSessionInvalidationHooks(
  sessions: SessionServiceContract
): SessionInvalidationHooks {
  return {
    onPasswordChange: (userId) => sessions.revokeAllForUser(userId),
    onRoleChange: (userId) => sessions.revokeAllForUser(userId),
    onEmailChange: (userId) => sessions.revokeAllForUser(userId),
    onPhoneChange: (userId) => sessions.revokeAllForUser(userId),
    onMfaChange: (userId) => sessions.revokeAllForUser(userId),
    onAccountLock: (userId) => sessions.revokeAllForUser(userId),
  };
}
