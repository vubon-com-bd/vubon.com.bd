/**
 * User Role Schema
 * @module shared-schemas/user
 */

import { z } from 'zod';
import { USER_ROLE } from '@vubon/shared-constants/user';

export const UserRoleSchema = z.enum(Object.values(USER_ROLE) as [string, ...string[]]);

export const UserRoleListSchema = z
  .array(UserRoleSchema)
  .min(1, 'At least one role required')
  .max(20, 'Too many roles');

export type UserRoleSchemaType = z.infer<typeof UserRoleSchema>;
export type UserRoleListSchemaType = z.infer<typeof UserRoleListSchema>;
