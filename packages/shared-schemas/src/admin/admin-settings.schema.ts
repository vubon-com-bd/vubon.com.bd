/**
 * Admin Settings Schema
 * অ্যাডমিন সেটিংস সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { ADMIN_SETTINGS } from '@vubon/shared-constants';

export const AdminSettingsSchema = BaseSchema.extend({
  adminId: z.string().uuid(),
  category: z.enum([
    ADMIN_SETTINGS.CATEGORIES.GENERAL,
    ADMIN_SETTINGS.CATEGORIES.SECURITY,
    ADMIN_SETTINGS.CATEGORIES.NOTIFICATION,
    ADMIN_SETTINGS.CATEGORIES.PREFERENCE,
    ADMIN_SETTINGS.CATEGORIES.SYSTEM,
    ADMIN_SETTINGS.CATEGORIES.INTEGRATION,
    ADMIN_SETTINGS.CATEGORIES.FEATURE,
  ]),
  key: z.string().min(1, 'Setting key is required'),
  value: z.unknown(),
  type: z
    .enum([
      ADMIN_SETTINGS.TYPES.STRING,
      ADMIN_SETTINGS.TYPES.NUMBER,
      ADMIN_SETTINGS.TYPES.BOOLEAN,
      ADMIN_SETTINGS.TYPES.ARRAY,
      ADMIN_SETTINGS.TYPES.OBJECT,
      ADMIN_SETTINGS.TYPES.JSON,
    ])
    .default(ADMIN_SETTINGS.TYPES.STRING),
  isPublic: z.boolean().default(false),
  isEncrypted: z.boolean().default(false),
  description: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const AdminSettingsCreateSchema = AdminSettingsSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const AdminSettingsUpdateSchema = AdminSettingsSchema.partial();

export type AdminSettingsSchemaType = z.infer<typeof AdminSettingsSchema>;
export type AdminSettingsCreateSchemaType = z.infer<typeof AdminSettingsCreateSchema>;
export type AdminSettingsUpdateSchemaType = z.infer<typeof AdminSettingsUpdateSchema>;
