import { z } from 'zod';
import { PermissionSchema } from '../common/permission.schema';
import { USER_PERMISSIONS } from '@vubon/shared-constants/src/user/user-permission.constants';

const userPermissionValues = Object.values(USER_PERMISSIONS) as [string, ...string[]];

export const UserPermissionSchema = PermissionSchema.extend({
  permission: z.enum(userPermissionValues),
  category: z.literal('user'),
});
