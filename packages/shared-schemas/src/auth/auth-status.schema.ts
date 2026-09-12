import { z } from 'zod';
import { AUTH_STATUS } from '@vubon/shared-constants/src/auth/auth-status.constants';

/**
 * Auth status VALUES only.
 * AUTH_STATUS is a flat object — Object.values gives 'active', 'locked', etc.
 */
const authStatusValues = Object.values(AUTH_STATUS) as [string, ...string[]];

export const AuthStatusSchema = z.object({
  status: z.enum(authStatusValues),
  category: z.literal('auth'),
});

export const AuthStatusEnumSchema = z.enum(authStatusValues);
