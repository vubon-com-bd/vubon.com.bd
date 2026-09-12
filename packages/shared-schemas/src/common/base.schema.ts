import { z } from 'zod';
import { STATUS } from '@vubon/shared-constants/src/common/status.constants';
import { ROLES } from '@vubon/shared-constants/src/common/roles.constants';
import { PERMISSIONS } from '@vubon/shared-constants/src/common/permissions.constants';

/**
 * Top-level status values.
 * Note: STATUS has nested objects (ORDER, PAYMENT, ...) — Object.keys would
 * leak those nested object keys, so we enumerate the flat values explicitly.
 */
const statusValues = [
  STATUS.ACTIVE,
  STATUS.INACTIVE,
  STATUS.PENDING,
  STATUS.DRAFT,
  STATUS.ARCHIVED,
  STATUS.DELETED,
  STATUS.BLOCKED,
  STATUS.SUSPENDED,
] as [string, ...string[]];

/**
 * Role and permission values — use Object.values (not keys).
 */
const roleValues = Object.values(ROLES) as [string, ...string[]];
const permissionValues = Object.values(PERMISSIONS) as [string, ...string[]];

export const BaseSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  status: z.enum(statusValues),
  role: z.enum(roleValues).optional(),
  permissions: z.array(z.enum(permissionValues)).optional(),
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
