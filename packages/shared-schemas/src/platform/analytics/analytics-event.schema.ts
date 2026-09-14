/**
 * Analytics Event Schema
 * @module shared-schemas/platform/analytics
 *
 * Values আসে shared-constants/platform/analytics-event.constants থেকে।
 */

import { z } from 'zod';
import { ANALYTICS_EVENT, ANALYTICS_EVENT_CATEGORY } from '@vubon/shared-constants/platform';
import { UuidSchema } from '../../common/primitives/uuid.schema';

export const AnalyticsEventNameSchema = z.enum(
  Object.values(ANALYTICS_EVENT) as [string, ...string[]]
);

export const AnalyticsEventCategorySchema = z.enum(
  Object.values(ANALYTICS_EVENT_CATEGORY) as [string, ...string[]]
);

export const EventContextSchema = z.object({
  page: z.string().max(500).optional(),
  referrer: z.string().url().optional(),
  device: z.string().max(50).optional(),
  os: z.string().max(50).optional(),
  browser: z.string().max(50).optional(),
  country: z.string().max(3).optional(),
  city: z.string().max(100).optional(),
  ip: z.string().ip().optional(),
});

export const AnalyticsEventSchema = z.object({
  id: z.string().min(1),
  name: AnalyticsEventNameSchema,
  category: AnalyticsEventCategorySchema,
  userId: UuidSchema.optional(),
  sessionId: z.string().max(128).optional(),
  properties: z.record(z.string(), z.unknown()).optional(),
  context: EventContextSchema.optional(),
  occurredAt: z.string().datetime(),
});

export type AnalyticsEventNameSchemaType = z.infer<typeof AnalyticsEventNameSchema>;
export type AnalyticsEventCategorySchemaType = z.infer<typeof AnalyticsEventCategorySchema>;
export type AnalyticsEventSchemaType = z.infer<typeof AnalyticsEventSchema>;
