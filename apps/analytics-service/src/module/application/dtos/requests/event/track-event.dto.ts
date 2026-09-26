import { z } from 'zod';
import { ANALYTICS_SOURCE, ANALYTICS_TYPE } from '@vubon/shared-constants/platform/analytics';

const MAX_PAYLOAD_KEYS = 50;
const MAX_KEY_LENGTH = 100;
const MAX_VALUE_STRING_LENGTH = 1000;

export const TrackEventSchema = z
  .object({
    name: z
      .string()
      .min(3, 'Event name must be at least 3 characters')
      .max(100, 'Event name too long')
      .regex(/^[a-z][a-z0-9_.]*$/, 'Event name must be lowercase snake/dot notation'),
    source: z.enum(Object.values(ANALYTICS_SOURCE) as [string, ...string[]]),
    type: z.enum(Object.values(ANALYTICS_TYPE) as [string, ...string[]]).optional(),
    userId: z.string().min(1).max(128).optional(),
    sessionId: z.string().min(1).max(128).optional(),
    occurredAt: z
      .string()
      .datetime()
      .refine(
        (s) => new Date(s).getTime() <= Date.now() + 60_000,
        'Event timestamp cannot be in the future',
      )
      .optional(),
    payload: z
      .record(z.string(), z.unknown())
      .refine(
        (obj) => Object.keys(obj).length <= MAX_PAYLOAD_KEYS,
        `Payload cannot have more than ${MAX_PAYLOAD_KEYS} keys`,
      )
      .refine(
        (obj) =>
          Object.keys(obj).every((k) => k.length <= MAX_KEY_LENGTH),
        `Payload keys must be ≤ ${MAX_KEY_LENGTH} chars`,
      )
      .optional()
      .default({}),
  })
  .strict();

export type TrackEventDTO = z.infer<typeof TrackEventSchema>;

/**
 * Business helper: normalizes and validates payload size.
 */
export function validateTrackEventPayload(dto: TrackEventDTO): void {
  const serialized = JSON.stringify(dto.payload);
  if (serialized.length > 64 * 1024) {
    throw new Error('Event payload exceeds 64KB limit');
  }
  for (const v of Object.values(dto.payload)) {
    if (typeof v === 'string' && v.length > MAX_VALUE_STRING_LENGTH) {
      throw new Error(`Payload string value exceeds ${MAX_VALUE_STRING_LENGTH} chars`);
    }
  }
}
