/**
 * Track Event Request DTO
 * @module analytics-service/application/dtos/requests/event
 *
 * Single event tracking request।
 * Imports from shared-schemas/platform/analytics।
 */
import { z } from 'zod';
import {
  AnalyticsEventNameSchema,
  AnalyticsEventCategorySchema,
  EventContextSchema,
} from '@vubon/shared-schemas/platform/analytics';

export const TrackEventSchema = z.object({
  name: AnalyticsEventNameSchema,
  category: AnalyticsEventCategorySchema,
  userId: z.string().min(1).max(128).optional(),
  sessionId: z.string().min(1).max(128).optional(),
  properties: z.record(z.string(), z.unknown()).optional(),
  context: EventContextSchema.optional(),
  occurredAt: z.string().datetime().optional(),
  source: z.string().min(1).max(50).optional(),
});

export type TrackEventDto = z.input<typeof TrackEventSchema>;
