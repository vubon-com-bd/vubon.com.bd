import { AuthDevice } from '../auth/auth-device.types';
import { AdminPublic } from './admin.types';

/**
 * Admin device interface
 */
export interface AdminDevice extends AuthDevice {
  adminId: string;
  admin: AdminPublic;
  isActive: boolean;
}
