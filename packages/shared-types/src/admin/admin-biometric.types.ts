import { AuthBiometric } from '../auth/auth-biometric.types';
import { Admin } from './admin.types';

/**
 * Admin biometric interface
 */
export interface AdminBiometric extends AuthBiometric {
  biometricId: string;
  adminId: string;
  admin: Admin;
  isRequired: boolean;
  isEnabled: boolean;
  metadata: Record<string, unknown>;
}
