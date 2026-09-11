import { Auth2FA } from '../auth/auth-2fa.types';
import { AdminPublic } from './admin.types';

/**
 * Admin 2FA interface
 */
export interface Admin2FA extends Auth2FA {
  adminId: string;
  admin: AdminPublic;
  isRequired: boolean;
}
