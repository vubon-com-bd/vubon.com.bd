import { AuthSession } from '../auth/auth-session.types';
import { Admin } from './admin.types';

/**
 * Admin session interface
 */
export interface AdminSession extends AuthSession {
  sessionId: string;
  adminId: string;
  admin: Admin;
  isActive: boolean;
  expiresAt: Date;
  metadata: Record<string, unknown>;
}
