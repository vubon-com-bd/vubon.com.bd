/**
 * Admin Level Schema
 * অ্যাডমিন লেভেল সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { ADMIN_LEVEL } from '@vubon/shared-constants';

export const AdminLevelSchema = z.enum([
  ADMIN_LEVEL.LEVELS.LEVEL_1,
  ADMIN_LEVEL.LEVELS.LEVEL_2,
  ADMIN_LEVEL.LEVELS.LEVEL_3,
  ADMIN_LEVEL.LEVELS.LEVEL_4,
  ADMIN_LEVEL.LEVELS.LEVEL_5,
]);

export const AdminLevelConfigSchema = BaseSchema.extend({
  adminId: z.string().uuid(),
  level: AdminLevelSchema,
  hierarchy: z.number().int().min(1).max(5),
  permissions: z.array(z.string()).default([]),
  metadata: z.record(z.unknown()).optional(),
});

export const AdminLevelUpdateSchema = z.object({
  level: AdminLevelSchema.optional(),
  permissions: z.array(z.string()).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type AdminLevelSchemaType = z.infer<typeof AdminLevelSchema>;
export type AdminLevelConfigSchemaType = z.infer<typeof AdminLevelConfigSchema>;
export type AdminLevelUpdateSchemaType = z.infer<typeof AdminLevelUpdateSchema>;
