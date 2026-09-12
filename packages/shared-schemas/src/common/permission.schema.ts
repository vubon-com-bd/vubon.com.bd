import { z } from 'zod';
import { PERMISSIONS } from '@vubon/shared-constants/src/common/permissions.constants';

/**
 * Permission VALUES (e.g. 'user:view', 'product:create') — not KEYS.
 */
const permissionValues = Object.values(PERMISSIONS) as [string, ...string[]];

export const PermissionSchema = z.object({
  permission: z.enum(permissionValues),
});

export const PermissionEnumSchema = z.enum(permissionValues);

export const PermissionListSchema = z.object({
  permissions: z.array(z.enum(permissionValues)),
});
