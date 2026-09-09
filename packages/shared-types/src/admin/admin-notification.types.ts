import { BaseEntity } from '../common/base.types';
import { Admin } from './admin.types';

/**
 * Admin notification interface
 */
export interface AdminNotification extends BaseEntity {
  notificationId: string;
  adminId: string;
  admin: Admin;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  readAt?: Date;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  metadata: Record<string, unknown>;
}
