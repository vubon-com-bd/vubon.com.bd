/**
 * Batch Track Event Request DTO
 * @module analytics-service/application/dtos/requests/event
 */
import { z } from 'zod';
import { TrackEventSchema } from './track-event.dto.js';

export const BatchTrackEventSchema = z.object({
  events: z
    .array(TrackEventSchema)
    .min(1, 'At least one event required')
    .max(1000, 'Max 1000 events per batch'),
});

export type BatchTrackEventDto = z.input<typeof BatchTrackEventSchema>;
