import { USER_ACTIVITY } from '@vubon/shared-constants';

export interface UserActivity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  isDeleted: boolean;
  activityId: string;
  userId: string;
  type: keyof typeof USER_ACTIVITY;
  description: string;
  ipAddress: string;
  userAgent: string;
  metadata: Record<string, unknown>;
  occurredAt: Date;
}
