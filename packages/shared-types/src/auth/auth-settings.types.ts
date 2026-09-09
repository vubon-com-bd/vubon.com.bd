import { BaseEntity } from '../common/base.types';

/**
 * Auth settings interface
 */
export interface AuthSettings extends BaseEntity {
  userId: string;
  sessionTimeout: number;
  maxLoginAttempts: number;
  passwordExpiryDays: number;
  mfaEnabled: boolean;
  mfaType?: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  metadata: Record<string, unknown>;
}
