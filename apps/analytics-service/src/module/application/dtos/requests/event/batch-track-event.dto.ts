import { z } from 'zod';
import { TrackEventSchema, validateTrackEventPayload } from './track-event.dto';

const MAX_BATCH_SIZE = 500;

export const BatchTrackEventSchema = z
  .object({
    events: z
      .array(TrackEventSchema)
      .min(1, 'Batch must have at least 1 event')
      .max(MAX_BATCH_SIZE, `Batch cannot exceed ${MAX_BATCH_SIZE} events`),
  })
  .strict();

export type BatchTrackEventDTO = z.infer<typeof BatchTrackEventSchema>;

/**
 * Business logic: deduplicates events within a batch by composite key.
 * Also validates each payload's size.
 */
export function dedupeBatchEvents(dto: BatchTrackEventDTO): BatchTrackEventDTO {
  const seen = new Set<string>();
  const deduped: typeof dto.events = [];

  for (const evt of dto.events) {
    validateTrackEventPayload(evt);
    const key = `${evt.name}:${evt.source}:${evt.userId ?? 'anon'}:${evt.occurredAt ?? 'now'}`;
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(evt);
  }

  return { events: deduped };
}
