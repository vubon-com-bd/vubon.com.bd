import { BaseEntity } from '../common/base.types';
import { AUTH_DEVICE } from '@vubon/shared-constants/src/auth/auth-device.constants';

/**
 * Auth device interface
 */
export interface AuthDevice extends BaseEntity {
  deviceId: string;
  userId: string;
  type: keyof typeof AUTH_DEVICE | string;
  name: string;
  model?: string;
  os: string;
  browser: string;
  isTrusted: boolean;
  lastUsed: Date;
  registeredAt: Date;
  metadata: Record<string, unknown>;
}
