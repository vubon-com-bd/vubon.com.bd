import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { USER_LOG } from '@vubon/shared-constants/src/user/user-log.constants';

const userLogKeys = Object.keys(USER_LOG) as [string, ...string[]];

export const UserLogSchema = BaseSchema.extend({
  logId: z.string().uuid(),
  userId: z.string().uuid(),
  type: z.enum(userLogKeys),
  message: z.string(),
  data: z.record(z.unknown()),
  ipAddress: z.string(),
  userAgent: z.string(),
  createdAt: z.date(),
});
