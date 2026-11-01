/**
 * User Permission Schema
 * @module shared-schemas/user
 */

import { z } from 'zod';
import { USER_PERMISSION } from '@vubon/shared-constants/user';

export const UserPermissionSchema = z.enum(Object.values(USER_PERMISSION) as [string, ...string[]]);

export const UserPermissionListSchema = z
  .array(UserPermissionSchema)
  .max(500, 'Too many permissions');

export type UserPermissionSchemaType = z.infer<typeof UserPermissionSchema>;
export type UserPermissionListSchemaType = z.infer<typeof UserPermissionListSchema>;
