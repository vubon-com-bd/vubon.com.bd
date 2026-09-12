import { USER_ACTIVITY } from '@vubon/shared-constants/src/user/user-activity.constants';

export interface UserActivity {
  activityId: string;
  userId: string;
  type: string;
  description: string;
  ipAddress: string;
  userAgent: string;
  metadata: Record<string, unknown>;
  occurredAt: Date;
}

export const trackActivity = (
  userId: string,
  type: string,
  description: string,
  ip: string
): UserActivity => {
  return {
    activityId: crypto.randomUUID(),
    userId,
    type,
    description,
    ipAddress: ip,
    userAgent: '',
    metadata: {},
    occurredAt: new Date(),
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

export const validateActivityType = (type: string): boolean => {
  return Object.keys(USER_ACTIVITY).includes(type);
};
