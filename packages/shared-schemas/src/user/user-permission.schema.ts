import { z } from 'zod';
import { PermissionSchema } from '../common/permission.schema';
import { USER_PERMISSIONS } from '@vubon/shared-constants/src/user/user-permission.constants';

const userPermissionKeys = Object.keys(USER_PERMISSIONS) as [string, ...string[]];

export const UserPermissionSchema = PermissionSchema.extend({
  permission: z.enum(userPermissionKeys),
  category: z.literal('user'),
});
