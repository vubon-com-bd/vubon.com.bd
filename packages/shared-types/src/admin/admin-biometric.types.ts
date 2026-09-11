import { AuthBiometric } from '../auth/auth-biometric.types';
import { AdminPublic } from './admin.types';

/**
 * Admin biometric interface
 */
export interface AdminBiometric extends AuthBiometric {
  adminId: string;
  admin: AdminPublic;
  isRequired: boolean;
}
