import { UserLog } from '../user/user-log.types';
import { Admin } from './admin.types';

/**
 * Admin log interface
 */
export interface AdminLog extends UserLog {
  logId: string;
  adminId: string;
  admin: Admin;
  level: 'info' | 'warning' | 'error' | 'critical';
  metadata: Record<string, unknown>;
}
