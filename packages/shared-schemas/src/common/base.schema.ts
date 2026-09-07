import { z } from 'zod';
import { STATUS } from '@vubon/shared-constants';
import { ROLES } from '@vubon/shared-constants';
import { PERMISSIONS } from '@vubon/shared-constants';

export const BaseSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  status: z.enum(Object.keys(STATUS) as [string, ...string[]]),
  role: z.enum(Object.keys(ROLES) as [string, ...string[]]).optional(),
  permissions: z.array(z.enum(Object.keys(PERMISSIONS) as [string, ...string[]])).optional(),
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
