import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { USER_LOG } from '@vubon/shared-constants/src/user/user-log.constants';

const userLogValues = Object.values(USER_LOG) as [string, ...string[]];

/**
 * User log entry.
 * Note: createdAt is inherited from BaseSchema. occurredAt records when
 * the actual event happened (may differ from the row write time).
 */
export const UserLogSchema = BaseSchema.extend({
  logId: z.string().uuid(),
  userId: z.string().uuid(),
  type: z.enum(userLogValues),
  message: z.string(),
  data: z.record(z.unknown()),
  /** @internal filled by server from request */
  ipAddress: z.string(),
  userAgent: z.string(),
  occurredAt: z.date(),
});
