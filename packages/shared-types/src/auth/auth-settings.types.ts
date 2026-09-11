import { BaseEntity } from '../common/base.types';
import { MfaTypeValue } from './auth-mfa.types';

/**
 * Auth settings interface
 */
export interface AuthSettings extends BaseEntity {
  userId: string;
  /** Session timeout in seconds */
  sessionTimeout: number;
  maxLoginAttempts: number;
  passwordExpiryDays: number;
  mfaEnabled: boolean;
  mfaType?: MfaTypeValue;
  emailVerified: boolean;
  phoneVerified: boolean;
  metadata: Record<string, unknown>;
}
