import { AuthBiometric } from '../auth/auth-biometric.types';
import { Admin } from './admin.types';

export interface AdminBiometric extends Omit<AuthBiometric, 'type'> {
  biometricId: string;
  adminId: string;
  admin: Admin;
  type: 'fingerprint' | 'face' | 'voice' | 'iris';
  isRequired: boolean;
  isEnabled: boolean;
  metadata: Record<string, unknown>;
}
