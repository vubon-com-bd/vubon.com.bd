/**
 * Auth Session Types
 * @module shared-types/auth
 *
 * Values আসে shared-constants/auth/auth-session.constants থেকে।
 */

import type { AUTH_SESSION } from '@vubon/shared-constants/auth';
import type { SESSION_STATUS } from '@vubon/shared-constants/infrastructure';
import type { UserId, SessionId, IpAddress } from '../common/primitives';

export type AuthSessionMaxAge = typeof AUTH_SESSION.EXPIRY_SECONDS;
export type SessionStatusValue = (typeof SESSION_STATUS)[keyof typeof SESSION_STATUS];

export interface AuthSessionData {
  readonly id: SessionId;
  readonly userId: UserId;
  readonly status: SessionStatusValue;
  readonly ipAddress?: IpAddress;
  readonly userAgent?: string;
  readonly deviceId?: string;
  readonly createdAt: string;
  readonly expiresAt: string;
  readonly lastAccessedAt: string;
  readonly refreshedAt?: string;
}

export interface AuthSessionPublic {
  readonly id: SessionId;
  readonly deviceId?: string;
  readonly ipAddress?: string;
  readonly userAgent?: string;
  readonly createdAt: string;
  readonly expiresAt: string;
  readonly lastAccessedAt: string;
  readonly isCurrent: boolean;
}

export interface AuthSessionCreateInput {
  readonly userId: UserId;
  readonly ipAddress?: string;
  readonly userAgent?: string;
  readonly deviceId?: string;
  readonly rememberMe?: boolean;
}

export interface AuthSessionRefreshResult {
  readonly sessionId: SessionId;
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly expiresAt: number;
  readonly refreshedAt: string;
}

export interface AuthSessionEvent {
  readonly sessionId: SessionId;
  readonly userId: UserId;
  readonly type: 'created' | 'refreshed' | 'expired' | 'revoked' | 'logout';
  readonly occurredAt: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}
