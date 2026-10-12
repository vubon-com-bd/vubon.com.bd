/**
 * TrackingSource Value Object — where the event came from
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { TRACKING_SOURCE } from '@vubon/shared-constants/logistics';
import { InvalidTrackingSourceError } from '../../errors/tracking.errors.js';

const ALLOWED = Object.values(TRACKING_SOURCE) as readonly string[];

export class TrackingSourceVO extends BaseVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): TrackingSourceVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new InvalidTrackingSourceError(String(raw));
    }
    return new TrackingSourceVO(raw);
  }

  static reconstitute(raw: string): TrackingSourceVO { return new TrackingSourceVO(raw); }

  static courierApi(): TrackingSourceVO { return new TrackingSourceVO(TRACKING_SOURCE.COURIER_API); }
  static webhook(): TrackingSourceVO { return new TrackingSourceVO(TRACKING_SOURCE.WEBHOOK); }
  static manual(): TrackingSourceVO { return new TrackingSourceVO(TRACKING_SOURCE.MANUAL); }
  static internal(): TrackingSourceVO { return new TrackingSourceVO(TRACKING_SOURCE.INTERNAL); }
  static thirdParty(): TrackingSourceVO { return new TrackingSourceVO(TRACKING_SOURCE.THIRD_PARTY); }

  isCourierApi(): boolean { return this.value === TRACKING_SOURCE.COURIER_API; }
  isWebhook(): boolean { return this.value === TRACKING_SOURCE.WEBHOOK; }
  isManual(): boolean { return this.value === TRACKING_SOURCE.MANUAL; }
  isInternal(): boolean { return this.value === TRACKING_SOURCE.INTERNAL; }
  isThirdParty(): boolean { return this.value === TRACKING_SOURCE.THIRD_PARTY; }

  /** External sources need auth/verification. */
  isExternal(): boolean { return !this.isInternal() && !this.isManual(); }

  /** Sources that can be trusted without extra verification. */
  isTrusted(): boolean { return this.isInternal() || this.isWebhook(); }
}
