import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { USER_LOG } from '@vubon/shared-constants';

export const UserLogSchema = BaseSchema.extend({
  logId: z.string().uuid(),
  userId: z.string().uuid(),
  type: z.enum(Object.keys(USER_LOG) as [string, ...string[]]),
  message: z.string(),
  data: z.record(z.unknown()),
  ipAddress: z.string(),
  userAgent: z.string(),
  createdAt: z.date(),
});
