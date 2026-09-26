import type { SessionId, UserId } from '@vubon/shared-types/common/primitives';

export interface SessionInfo {
  readonly sessionId: SessionId;
  readonly userId: UserId;
  readonly createdAt: string;
  readonly lastActiveAt: string;
  readonly expiresAt: string;
  readonly ipAddress?: string;
  readonly userAgent?: string;
  readonly deviceId?: string;
}

export interface SessionValidity {
  readonly valid: boolean;
  readonly reason?: 'missing' | 'expired' | 'revoked' | 'idle-timeout';
}
