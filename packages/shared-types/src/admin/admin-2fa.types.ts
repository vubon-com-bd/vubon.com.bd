import { Auth2FA } from '../auth/auth-2fa.types';
import { Admin } from './admin.types';

export interface Admin2FA extends Omit<Auth2FA, 'type'> {
  twoFAId: string;
  adminId: string;
  admin: Admin;
  type: 'totp' | 'sms' | 'email';
  isRequired: boolean;
  isEnabled: boolean;
  metadata: Record<string, unknown>;
}
