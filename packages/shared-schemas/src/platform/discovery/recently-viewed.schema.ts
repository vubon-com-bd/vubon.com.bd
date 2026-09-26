/**
 * Recently Viewed Schema
 * @module shared-schemas/platform/discovery
 *
 * Values আসে shared-constants/platform/recently-viewed.constants থেকে।
 */

import { z } from 'zod';
import { RECENTLY_VIEWED_TYPE } from '@vubon/shared-constants/platform';
import { UuidSchema } from '../../common/primitives/uuid.schema';

export const RecentlyViewedTypeSchema = z.enum(
  Object.values(RECENTLY_VIEWED_TYPE) as [string, ...string[]]
);

export const RecentlyViewedItemSchema = z.object({
  id: z.string().min(1),
  userId: UuidSchema.optional(),
  sessionId: z.string().max(128).optional(),
  type: RecentlyViewedTypeSchema,
  referenceId: z.string().min(1),
  viewedAt: z.string().datetime(),
  viewCount: z.number().int().positive(),
});

export const RecentlyViewedListSchema = z.object({
  type: RecentlyViewedTypeSchema,
  items: z.array(RecentlyViewedItemSchema).max(100),
  total: z.number().int().nonnegative(),
});

export type RecentlyViewedTypeSchemaType = z.infer<typeof RecentlyViewedTypeSchema>;
export type RecentlyViewedItemSchemaType = z.infer<typeof RecentlyViewedItemSchema>;
export type RecentlyViewedListSchemaType = z.infer<typeof RecentlyViewedListSchema>;
