/**
 * TrackingStatus Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TRACKING_STATUS } from '@vubon/shared-constants/logistics';

export type TrackingStatusValue =
  (typeof TRACKING_STATUS)[keyof typeof TRACKING_STATUS];

const VALID_STATUSES: readonly string[] = Object.values(TRACKING_STATUS);

export class TrackingStatusVO extends BaseStatusVO<TrackingStatusValue> {
  private constructor(value: TrackingStatusValue) {
    super(value);
  }

  static create(raw: string): TrackingStatusVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('TrackingStatus must be a string', 'status');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_STATUSES.includes(normalized)) {
      throw new ValidationError(
        `Invalid TrackingStatus: "${normalized}". Allowed: ${VALID_STATUSES.join(', ')}`,
        'status',
      );
    }
    return new TrackingStatusVO(normalized as TrackingStatusValue);
  }

  static reconstitute(raw: string): TrackingStatusVO {
    return new TrackingStatusVO(raw as TrackingStatusValue);
  }

  static active(): TrackingStatusVO {
    return new TrackingStatusVO(TRACKING_STATUS.ACTIVE);
  }

  isPending(): boolean { return this.value === TRACKING_STATUS.PENDING; }
  isActive(): boolean { return this.value === TRACKING_STATUS.ACTIVE; }
  isCompleted(): boolean { return this.value === TRACKING_STATUS.COMPLETED; }
  isFailed(): boolean { return this.value === TRACKING_STATUS.FAILED; }
  isExpired(): boolean { return this.value === TRACKING_STATUS.EXPIRED; }
  isUnknown(): boolean { return this.value === TRACKING_STATUS.UNKNOWN; }

  isFinal(): boolean {
    return this.isCompleted() || this.isFailed() || this.isExpired();
  }

  isTrackable(): boolean {
    return this.isActive() || this.isPending();
  }
}
