import { z } from 'zod';
import { PermissionSchema } from '../common/permission.schema';
import { USER_PERMISSIONS } from '@vubon/shared-constants';
import { AUTH_PERMISSIONS } from '@vubon/shared-constants';

export const UserPermissionSchema = PermissionSchema.extend({
  permission: z.enum(Object.keys(USER_PERMISSIONS) as [string, ...string[]]),
  category: z.literal('user'),
  extends: z.enum(Object.keys(AUTH_PERMISSIONS) as [string, ...string[]]).optional(),
});

export const UserPermissionEnumSchema = z.enum(
  Object.keys(USER_PERMISSIONS) as [string, ...string[]]
);
