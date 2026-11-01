/**
 * TrackingSource Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TRACKING_SOURCE } from '@vubon/shared-constants/logistics';

export type TrackingSourceValue =
  (typeof TRACKING_SOURCE)[keyof typeof TRACKING_SOURCE];

const VALID_SOURCES: readonly string[] = Object.values(TRACKING_SOURCE);

export class TrackingSourceVO extends BaseVO<TrackingSourceValue> {
  private constructor(value: TrackingSourceValue) {
    super(value);
  }

  static create(raw: string): TrackingSourceVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('TrackingSource must be a string', 'source');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_SOURCES.includes(normalized)) {
      throw new ValidationError(
        `Invalid TrackingSource: "${normalized}". Allowed: ${VALID_SOURCES.join(', ')}`,
        'source',
      );
    }
    return new TrackingSourceVO(normalized as TrackingSourceValue);
  }

  static reconstitute(raw: string): TrackingSourceVO {
    return new TrackingSourceVO(raw as TrackingSourceValue);
  }

  isCourierApi(): boolean { return this.value === TRACKING_SOURCE.COURIER_API; }
  isWebhook(): boolean { return this.value === TRACKING_SOURCE.WEBHOOK; }
  isManual(): boolean { return this.value === TRACKING_SOURCE.MANUAL; }
  isInternal(): boolean { return this.value === TRACKING_SOURCE.INTERNAL; }
  isThirdParty(): boolean { return this.value === TRACKING_SOURCE.THIRD_PARTY; }
}
