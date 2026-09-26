import { TrackEventSchema, BatchTrackEventSchema } from '../dtos/requests/event';

export class EventValidator {
  static validateTrack(input: unknown) {
    return TrackEventSchema.parse(input);
  }

  static safeValidateTrack(input: unknown) {
    return TrackEventSchema.safeParse(input);
  }

  static validateBatch(input: unknown) {
    return BatchTrackEventSchema.parse(input);
  }

  static safeValidateBatch(input: unknown) {
    return BatchTrackEventSchema.safeParse(input);
  }
}
