import { USER_ACTIVITY } from '@vubon/shared-constants';
import { UserActivity } from '@vubon/shared-types';

export const trackActivity = (
  userId: string,
  type: keyof typeof USER_ACTIVITY,
  description: string,
  ip: string
): UserActivity => {
  const now = new Date();
  return {
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
    isActive: true,
    isDeleted: false,
    activityId: crypto.randomUUID(),
    userId,
    type,
    description,
    ipAddress: ip,
    userAgent: '',
    metadata: {},
    occurredAt: now,
  };
};

export const getActivitySummary = (activities: UserActivity[]): Record<string, number> => {
  return activities.reduce(
    (acc, activity) => {
      acc[activity.type] = (acc[activity.type] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );
};
