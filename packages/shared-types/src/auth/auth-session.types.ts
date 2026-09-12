import { BaseEntity } from '../common/base.types';
import { SESSION } from '@vubon/shared-constants/src/common/session.constants';
import { DeviceInfo } from './auth-request.types';

/**
 * Session status from SESSION.STATE (active/expired/revoked/invalid/suspended)
 */
export type AuthSessionStatus = (typeof SESSION.STATE)[keyof typeof SESSION.STATE];

/**
 * Session type from SESSION.TYPE (web/mobile/api/admin/bot)
 */
export type AuthSessionType = (typeof SESSION.TYPE)[keyof typeof SESSION.TYPE];

/**
 * Auth session interface
 */
export interface AuthSession extends Omit<BaseEntity, 'status'> {
  sessionId: string;
  userId: string;
  /** @internal */
  token: string;
  status: AuthSessionStatus;
  type: AuthSessionType;
  expiresAt: Date;
  lastActivity: Date;
  deviceInfo: DeviceInfo;
  ipAddress: string;
  userAgent: string;
  metadata: Record<string, unknown>;
}

/**
 * Public-safe session DTO
 */
export type AuthSessionPublic = Omit<AuthSession, 'token'> & {
  tokenPreview: string;
};
