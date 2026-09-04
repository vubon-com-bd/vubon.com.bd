/**
 * Admin Type Schema
 * অ্যাডমিন টাইপ সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { ADMIN_TYPES } from '@vubon/shared-constants';

export const AdminTypeSchema = z.enum([
  ADMIN_TYPES.SYSTEM,
  ADMIN_TYPES.SUPER,
  ADMIN_TYPES.REGULAR,
  ADMIN_TYPES.SUPPORT,
  ADMIN_TYPES.MANAGER,
  ADMIN_TYPES.CONTENT,
  ADMIN_TYPES.FINANCE,
  ADMIN_TYPES.USER,
  ADMIN_TYPES.REPORT,
  ADMIN_TYPES.SETTINGS,
]);

export const AdminTypeConfigSchema = BaseSchema.extend({
  adminId: z.string().uuid(),
  type: AdminTypeSchema,
  level: z.number().int().min(1).max(5),
  permissions: z.array(z.string()).default([]),
  metadata: z.record(z.unknown()).optional(),
});

export const AdminTypeUpdateSchema = z.object({
  type: AdminTypeSchema.optional(),
  level: z.number().int().min(1).max(5).optional(),
  permissions: z.array(z.string()).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type AdminTypeSchemaType = z.infer<typeof AdminTypeSchema>;
export type AdminTypeConfigSchemaType = z.infer<typeof AdminTypeConfigSchema>;
export type AdminTypeUpdateSchemaType = z.infer<typeof AdminTypeUpdateSchema>;
