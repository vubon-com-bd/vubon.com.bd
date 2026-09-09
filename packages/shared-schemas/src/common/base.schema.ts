import { z } from 'zod';
import { STATUS } from '@vubon/shared-constants/src/common/status.constants';
import { ROLES } from '@vubon/shared-constants/src/common/roles.constants';
import { PERMISSIONS } from '@vubon/shared-constants/src/common/permissions.constants';

const statusKeys = Object.keys(STATUS) as [string, ...string[]];
const roleKeys = Object.keys(ROLES) as [string, ...string[]];
const permissionKeys = Object.keys(PERMISSIONS) as [string, ...string[]];

export const BaseSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  status: z.enum(statusKeys),
  role: z.enum(roleKeys).optional(),
  permissions: z.array(z.enum(permissionKeys)).optional(),
  isActive: z.boolean().default(true),
  isDeleted: z.boolean().default(false),
});

export const BaseCreateSchema = BaseSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const BaseUpdateSchema = BaseSchema.partial().omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
