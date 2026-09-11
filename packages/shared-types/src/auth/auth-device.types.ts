import { BaseEntity } from '../common/base.types';
import { AUTH_DEVICE } from '@vubon/shared-constants/src/auth/auth-device.constants';

/**
 * Device type value
 */
export type AuthDeviceType = (typeof AUTH_DEVICE)[keyof typeof AUTH_DEVICE];

/**
 * Auth device interface
 */
export interface AuthDevice extends BaseEntity {
  deviceId: string;
  userId: string;
  type: AuthDeviceType;
  name: string;
  model?: string;
  os: string;
  browser: string;
  isTrusted: boolean;
  lastUsed: Date;
  registeredAt: Date;
  metadata: Record<string, unknown>;
}
