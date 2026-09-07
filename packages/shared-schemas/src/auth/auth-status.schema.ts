import { z } from 'zod';
import { StatusSchema } from '../common/status.schema';
import { AUTH_STATUS } from '@vubon/shared-constants';

export const AuthStatusSchema = StatusSchema.extend({
  status: z.enum(Object.keys(AUTH_STATUS) as [string, ...string[]]),
  category: z.literal('auth'),
});

export const AuthStatusEnumSchema = z.enum(Object.keys(AUTH_STATUS) as [string, ...string[]]);
