import { BaseEntity } from '../common/base.types';
import { AUTH_SESSION } from '@vubon/shared-constants/src/auth/auth-session.constants';
import { DeviceInfo } from './auth-request.types';

/**
 * Auth session interface
 */
export interface AuthSession extends BaseEntity {
  sessionId: string;
  userId: string;
  token: string;
  status: keyof typeof AUTH_SESSION | string;
  type: string;
  expiresAt: Date;
  lastActivity: Date;
  deviceInfo: DeviceInfo;
  ipAddress: string;
  userAgent: string;
  metadata: Record<string, unknown>;
}
