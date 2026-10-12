/**
 * Event Validator
 * @module analytics-service/application/validators
 */
import { TrackEventSchema } from '../dtos/requests/event/track-event.dto.js';
import { BatchTrackEventSchema } from '../dtos/requests/event/batch-track-event.dto.js';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors';

export class EventValidator {
  static validateTrack(input: unknown): void {
    const result = TrackEventSchema.safeParse(input);
    if (!result.success) {
      const first = result.error.errors[0];
      throw new ApplicationValidationError(first?.message ?? 'Invalid track event', first?.path.join('.'));
    }
  }

  static validateBatch(input: unknown): void {
    const result = BatchTrackEventSchema.safeParse(input);
    if (!result.success) {
      const first = result.error.errors[0];
      throw new ApplicationValidationError(first?.message ?? 'Invalid batch', first?.path.join('.'));
    }
  }
}
