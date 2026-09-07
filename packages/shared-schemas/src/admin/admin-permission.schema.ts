import { z } from 'zod';
import { PermissionSchema } from '../common/permission.schema';
import { ADMIN_PERMISSIONS } from '@vubon/shared-constants';
import { USER_PERMISSIONS } from '@vubon/shared-constants';

export const AdminPermissionSchema = PermissionSchema.extend({
  permission: z.enum(Object.keys(ADMIN_PERMISSIONS) as [string, ...string[]]),
  category: z.literal('admin'),
  extends: z.array(z.enum(Object.keys(ADMIN_PERMISSIONS) as [string, ...string[]])).optional(),
  userPermissions: z
    .array(z.enum(Object.keys(USER_PERMISSIONS) as [string, ...string[]]))
    .optional(),
});

export const AdminPermissionEnumSchema = z.enum(
  Object.keys(ADMIN_PERMISSIONS) as [string, ...string[]]
);
