import { BaseEntity } from '../common/base.types';
import { USER_ACTIVITY } from '@vubon/shared-constants/src/user/user-activity.constants';

/**
 * User activity interface
 */
export interface UserActivity extends BaseEntity {
  activityId: string;
  userId: string;
  type: keyof typeof USER_ACTIVITY;
  description: string;
  ipAddress: string;
  userAgent: string;
  metadata: Record<string, unknown>;
  occurredAt: Date;
}
