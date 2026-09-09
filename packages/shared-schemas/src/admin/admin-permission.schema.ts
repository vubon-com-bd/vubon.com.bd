import { z } from 'zod';
import { PermissionSchema } from '../common/permission.schema';
import { ADMIN_PERMISSIONS } from '@vubon/shared-constants/src/admin/admin-permission.constants';

const adminPermissionKeys = Object.keys(ADMIN_PERMISSIONS) as [string, ...string[]];

export const AdminPermissionSchema = PermissionSchema.extend({
  permission: z.enum(adminPermissionKeys),
  category: z.literal('admin'),
  extends: z.array(z.enum(adminPermissionKeys)).optional(),
});
