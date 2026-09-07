import { USER_LOG } from '@vubon/shared-constants';

export interface UserLog {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  isDeleted: boolean;
  logId: string;
  userId: string;
  type: keyof typeof USER_LOG;
  message: string;
  data: Record<string, unknown>;
  ipAddress: string;
  userAgent: string;
}
