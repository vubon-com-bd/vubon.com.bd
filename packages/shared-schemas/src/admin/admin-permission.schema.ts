import { z } from 'zod';
import { PermissionSchema } from '../common/permission.schema';
import { ADMIN_PERMISSIONS } from '@vubon/shared-constants/src/admin/admin-permission.constants';

const adminPermissionValues = Object.values(ADMIN_PERMISSIONS) as [string, ...string[]];

export const AdminPermissionSchema = PermissionSchema.extend({
  permission: z.enum(adminPermissionValues),
  category: z.literal('admin'),
  inheritsFrom: z.array(z.enum(adminPermissionValues)).optional(),
});
