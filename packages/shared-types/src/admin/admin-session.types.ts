import { AuthSession } from '../auth/auth-session.types';
import { AdminPublic } from './admin.types';

/**
 * Admin session interface
 */
export interface AdminSession extends AuthSession {
  adminId: string;
  admin: AdminPublic;
  isActive: boolean;
}
