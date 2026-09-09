import { z } from 'zod';
import { StatusSchema } from '../common/status.schema';
import { AUTH_STATUS } from '@vubon/shared-constants/src/auth/auth-status.constants';

const authStatusKeys = Object.keys(AUTH_STATUS) as [string, ...string[]];

export const AuthStatusSchema = StatusSchema.extend({
  status: z.enum(authStatusKeys),
  category: z.literal('auth'),
});

export const AuthStatusEnumSchema = z.enum(authStatusKeys);
