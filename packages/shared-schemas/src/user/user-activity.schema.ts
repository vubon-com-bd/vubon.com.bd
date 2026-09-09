import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { USER_ACTIVITY } from '@vubon/shared-constants/src/user/user-activity.constants';

const userActivityKeys = Object.keys(USER_ACTIVITY) as [string, ...string[]];

export const UserActivitySchema = BaseSchema.extend({
  activityId: z.string().uuid(),
  userId: z.string().uuid(),
  type: z.enum(userActivityKeys),
  description: z.string(),
  ipAddress: z.string(),
  userAgent: z.string(),
  metadata: z.record(z.unknown()).optional(),
  occurredAt: z.date(),
});
