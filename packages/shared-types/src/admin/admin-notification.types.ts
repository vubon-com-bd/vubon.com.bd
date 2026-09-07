import { Admin } from './admin.types';

export interface AdminNotification {
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
