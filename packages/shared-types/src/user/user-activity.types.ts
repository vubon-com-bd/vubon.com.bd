import { BaseEntity } from '../common/base.types';
import { USER_ACTIVITY } from '@vubon/shared-constants/src/user/user-activity.constants';

/**
 * User activity type value
 */
export type UserActivityType = (typeof USER_ACTIVITY)[keyof typeof USER_ACTIVITY];

/**
 * User activity interface
 */
export interface UserActivity extends BaseEntity {
  activityId: string;
  userId: string;
  type: UserActivityType;
  description: string;
  ipAddress: string;
  userAgent: string;
  metadata: Record<string, unknown>;
  occurredAt: Date;
}
