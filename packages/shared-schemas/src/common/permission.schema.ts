import { z } from 'zod';
import { PERMISSIONS } from '@vubon/shared-constants';

export const PermissionSchema = z.object({
  permission: z.enum(Object.keys(PERMISSIONS) as [string, ...string[]]),
});

export const PermissionEnumSchema = z.enum(Object.keys(PERMISSIONS) as [string, ...string[]]);

export const PermissionListSchema = z.object({
  permissions: z.array(z.enum(Object.keys(PERMISSIONS) as [string, ...string[]])),
});
