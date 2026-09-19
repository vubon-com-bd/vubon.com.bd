/**
 * Auth Role Schema
 * @module shared-schemas/auth
 */

import { z } from 'zod';
import { AUTH_ROLE } from '@vubon/shared-constants/auth';

export const AuthRoleSchema = z.enum(Object.values(AUTH_ROLE) as [string, ...string[]]);

export const AuthRoleListSchema = z
  .array(AuthRoleSchema)
  .min(1, 'At least one role required')
  .max(20, 'Too many roles');

export type AuthRoleSchemaType = z.infer<typeof AuthRoleSchema>;
export type AuthRoleListSchemaType = z.infer<typeof AuthRoleListSchema>;
