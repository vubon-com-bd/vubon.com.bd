import { Auth2FA } from '../auth/auth-2fa.types';
import { Admin } from './admin.types';

/**
 * Admin 2FA interface
 */
export interface Admin2FA extends Auth2FA {
  twoFAId: string;
  adminId: string;
  admin: Admin;
  isRequired: boolean;
  isEnabled: boolean;
  metadata: Record<string, unknown>;
}
