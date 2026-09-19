/**
 * User Activity Schema
 * @module shared-schemas/user
 *
 * Values আসে shared-constants/user/user-activity.constants থেকে।
 */

import { z } from 'zod';
import { USER_ACTIVITY, USER_ACTIVITY_CATEGORY } from '@vubon/shared-constants/user';
import { UuidSchema } from '../common/primitives/uuid.schema';

export const ActivityTypeSchema = z.enum(Object.values(USER_ACTIVITY) as [string, ...string[]]);

export const ActivityCategorySchema = z.enum(
  Object.values(USER_ACTIVITY_CATEGORY) as [string, ...string[]]
);

export const UserActivitySchema = z.object({
  id: UuidSchema,
  userId: UuidSchema,
  type: ActivityTypeSchema,
  category: ActivityCategorySchema,
  description: z.string().max(500).optional(),
  ipAddress: z.string().ip().optional(),
  userAgent: z.string().max(500).optional(),
  deviceId: z.string().max(128).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  occurredAt: z.string().datetime(),
});

export const UserActivityFilterSchema = z.object({
  userId: UuidSchema.optional(),
  type: ActivityTypeSchema.optional(),
  category: ActivityCategorySchema.optional(),
  fromDate: z.string().datetime().optional(),
  toDate: z.string().datetime().optional(),
});

export type ActivityTypeSchemaType = z.infer<typeof ActivityTypeSchema>;
export type ActivityCategorySchemaType = z.infer<typeof ActivityCategorySchema>;
export type UserActivitySchemaType = z.infer<typeof UserActivitySchema>;
export type UserActivityFilterSchemaType = z.infer<typeof UserActivityFilterSchema>;
