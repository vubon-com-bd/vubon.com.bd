import { z } from 'zod';
import type { EventEntity } from '../../../domain/entities/event.entity';

export const EventResponseSchema = z.object({
  eventId: z.string(),
  name: z.string(),
  source: z.string(),
  timestamp: z.string().datetime(),
  payloadKeys: z.array(z.string()),
  payloadSize: z.number().int().nonnegative(),
  processed: z.boolean(),
  createdAt: z.string().datetime(),
});

export type EventResponseDTO = z.infer<typeof EventResponseSchema>;

/**
 * Business logic: maps domain entity → response DTO.
 * NOTE: full payload NOT exposed — only metadata (privacy).
 */
export function toEventResponse(entity: EventEntity): EventResponseDTO {
  const payload = entity.payload.toObject();
  return {
    eventId: entity.id.value,
    name: entity.name.value,
    source: entity.source.value,
    timestamp: new Date(entity.timestamp.epochMs).toISOString(),
    payloadKeys: Object.keys(payload),
    payloadSize: entity.payload.sizeBytes,
    processed: entity.processed,
    createdAt: entity.createdAt,
  };
}
