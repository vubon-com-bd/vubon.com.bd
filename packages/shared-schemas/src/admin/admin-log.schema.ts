import { z } from 'zod';
import { UserLogSchema } from '../user/user-log.schema';
import { LOG_LEVEL } from '@vubon/shared-constants/src/common/log-level.constants';

const logLevelValues = Object.values(LOG_LEVEL) as [string, ...string[]];

export const AdminLogSchema = UserLogSchema.extend({
  adminId: z.string().uuid(),
  level: z.enum(logLevelValues),
});
