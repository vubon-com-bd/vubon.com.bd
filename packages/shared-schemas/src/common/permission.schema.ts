import { z } from 'zod';
import { PERMISSIONS } from '@vubon/shared-constants/src/common/permissions.constants';

const permissionKeys = Object.keys(PERMISSIONS) as [string, ...string[]];

export const PermissionSchema = z.object({
  permission: z.enum(permissionKeys),
});

export const PermissionEnumSchema = z.enum(permissionKeys);

export const PermissionListSchema = z.object({
  permissions: z.array(z.enum(permissionKeys)),
});
