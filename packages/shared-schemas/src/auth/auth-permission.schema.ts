import { z } from 'zod';
import { PermissionSchema } from '../common/permission.schema';
import { AUTH_PERMISSIONS } from '@vubon/shared-constants';

export const AuthPermissionSchema = PermissionSchema.extend({
  permission: z.enum(Object.keys(AUTH_PERMISSIONS) as [string, ...string[]]),
  category: z.literal('auth'),
});

export const AuthPermissionEnumSchema = z.enum(
  Object.keys(AUTH_PERMISSIONS) as [string, ...string[]]
);
