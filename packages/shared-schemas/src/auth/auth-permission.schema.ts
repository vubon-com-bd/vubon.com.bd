import { z } from 'zod';
import { PermissionSchema } from '../common/permission.schema';
import { AUTH_PERMISSIONS } from '@vubon/shared-constants/src/auth/auth-permission.constants';

const authPermissionValues = Object.values(AUTH_PERMISSIONS) as [string, ...string[]];

export const AuthPermissionSchema = PermissionSchema.extend({
  permission: z.enum(authPermissionValues),
  category: z.literal('auth'),
});

export const AuthPermissionEnumSchema = z.enum(authPermissionValues);
