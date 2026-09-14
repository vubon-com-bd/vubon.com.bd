/**
 * Auth Permission Schema
 * @module shared-schemas/auth
 */

import { z } from 'zod';
import { AUTH_PERMISSION } from '@vubon/shared-constants/auth';

export const AuthPermissionSchema = z.enum(Object.values(AUTH_PERMISSION) as [string, ...string[]]);

export const AuthPermissionListSchema = z
  .array(AuthPermissionSchema)
  .max(500, 'Too many permissions');

export type AuthPermissionSchemaType = z.infer<typeof AuthPermissionSchema>;
export type AuthPermissionListSchemaType = z.infer<typeof AuthPermissionListSchema>;
