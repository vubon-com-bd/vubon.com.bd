import { AuthDevice } from '../auth/auth-device.types';
import { Admin } from './admin.types';

/**
 * Admin device interface
 */
export interface AdminDevice extends AuthDevice {
  deviceId: string;
  adminId: string;
  admin: Admin;
  isTrusted: boolean;
  isActive: boolean;
  metadata: Record<string, unknown>;
}
