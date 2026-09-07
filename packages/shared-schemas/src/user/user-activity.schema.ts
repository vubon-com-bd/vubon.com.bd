import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { USER_ACTIVITY } from '@vubon/shared-constants';

export const UserActivitySchema = BaseSchema.extend({
  activityId: z.string().uuid(),
  userId: z.string().uuid(),
  type: z.enum(Object.keys(USER_ACTIVITY) as [string, ...string[]]),
  description: z.string(),
  ipAddress: z.string(),
  userAgent: z.string(),
  metadata: z.record(z.unknown()).optional(),
  occurredAt: z.date(),
});
