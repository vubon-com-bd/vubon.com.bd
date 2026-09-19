/**
 * User Activity Types
 * @module shared-types/user
 *
 * Values আসে shared-constants/user/user-activity.constants থেকে।
 */

import type { USER_ACTIVITY, USER_ACTIVITY_CATEGORY } from '@vubon/shared-constants/user';
import type { UserId, IpAddress } from '../common/primitives';

export type ActivityTypeValue = (typeof USER_ACTIVITY)[keyof typeof USER_ACTIVITY];

export type ActivityCategoryValue =
  (typeof USER_ACTIVITY_CATEGORY)[keyof typeof USER_ACTIVITY_CATEGORY];

export interface UserActivity {
  readonly id: string;
  readonly userId: UserId;
  readonly type: ActivityTypeValue;
  readonly category: ActivityCategoryValue;
  readonly description?: string;
  readonly ipAddress?: IpAddress;
  readonly userAgent?: string;
  readonly deviceId?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
  readonly occurredAt: string;
}

export interface UserActivitySummary {
  readonly userId: UserId;
  readonly totalActivities: number;
  readonly lastActivityAt: string;
  readonly lastLoginAt?: string;
  readonly activityByCategory: Readonly<Record<ActivityCategoryValue, number>>;
}

export interface UserActivityFilter {
  readonly userId?: UserId;
  readonly type?: ActivityTypeValue;
  readonly category?: ActivityCategoryValue;
  readonly fromDate?: string;
  readonly toDate?: string;
}
