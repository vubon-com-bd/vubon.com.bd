/**
 * Event Validator (interface layer)
 * @module analytics-service/interfaces/validators
 *
 * Zod-based request validation for event endpoints।
 * Throws 422 if validation fails.
 */
import { BadRequestException, Injectable } from '@nestjs/common';
import { z } from 'zod';
import { ERROR_CODE, HTTP_STATUS } from '@vubon/shared-constants/common';

const EventContextSchema = z
  .object({
    page: z.string().max(500).optional(),
    referrer: z.string().url().optional(),
    device: z.string().max(50).optional(),
    os: z.string().max(50).optional(),
    browser: z.string().max(50).optional(),
    country: z.string().max(3).optional(),
    city: z.string().max(100).optional(),
    ip: z.string().optional(),
  })
  .optional();

export const TrackEventSchema = z.object({
  name: z.string().min(3).max(100),
  category: z.string().min(2).max(50),
  userId: z.string().min(1).max(128).optional(),
  sessionId: z.string().min(1).max(128).optional(),
  properties: z.record(z.string(), z.unknown()).optional(),
  context: EventContextSchema,
  occurredAt: z.string().datetime().optional(),
  source: z.string().min(1).max(50).optional(),
});

export const BatchTrackEventSchema = z.object({
  events: z.array(TrackEventSchema).min(1).max(1000),
});

@Injectable()
export class EventValidator {
  validateTrack(input: unknown): z.infer<typeof TrackEventSchema> {
    const result = TrackEventSchema.safeParse(input);
    if (!result.success) {
      const first = result.error.errors[0];
      throw new BadRequestException({
        statusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
        code: ERROR_CODE.VAL_REQUIRED,
        message: first?.message ?? 'Invalid event payload',
        field: first?.path.join('.'),
      });
    }
    return result.data;
  }

  validateBatch(input: unknown): z.infer<typeof BatchTrackEventSchema> {
    const result = BatchTrackEventSchema.safeParse(input);
    if (!result.success) {
      const first = result.error.errors[0];
      throw new BadRequestException({
        statusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
        code: ERROR_CODE.VAL_REQUIRED,
        message: first?.message ?? 'Invalid batch payload',
        field: first?.path.join('.'),
      });
    }
    return result.data;
  }
}
