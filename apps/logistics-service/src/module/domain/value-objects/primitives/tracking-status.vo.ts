/**
 * TrackingStatus Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { TRACKING_STATUS } from '@vubon/shared-constants/logistics';
import { InvalidTrackingStatusError } from '../../errors/tracking.errors.js';

const ALLOWED = Object.values(TRACKING_STATUS) as readonly string[];

export class TrackingStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): TrackingStatusVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new InvalidTrackingStatusError(String(raw));
    }
    return new TrackingStatusVO(raw);
  }

  static reconstitute(raw: string): TrackingStatusVO { return new TrackingStatusVO(raw); }

  static pending(): TrackingStatusVO { return new TrackingStatusVO(TRACKING_STATUS.PENDING); }
  static active(): TrackingStatusVO { return new TrackingStatusVO(TRACKING_STATUS.ACTIVE); }
  static completed(): TrackingStatusVO { return new TrackingStatusVO(TRACKING_STATUS.COMPLETED); }
  static failed(): TrackingStatusVO { return new TrackingStatusVO(TRACKING_STATUS.FAILED); }
  static expired(): TrackingStatusVO { return new TrackingStatusVO(TRACKING_STATUS.EXPIRED); }
  static unknown(): TrackingStatusVO { return new TrackingStatusVO(TRACKING_STATUS.UNKNOWN); }

  isPending(): boolean { return this.value === TRACKING_STATUS.PENDING; }
  isActive(): boolean { return this.value === TRACKING_STATUS.ACTIVE; }
  isCompleted(): boolean { return this.value === TRACKING_STATUS.COMPLETED; }
  isFailed(): boolean { return this.value === TRACKING_STATUS.FAILED; }
  isExpired(): boolean { return this.value === TRACKING_STATUS.EXPIRED; }
  isUnknown(): boolean { return this.value === TRACKING_STATUS.UNKNOWN; }

  isFinal(): boolean {
    return [TRACKING_STATUS.COMPLETED, TRACKING_STATUS.EXPIRED].includes(this.value as never);
  }

  /** Tracking can still receive events. */
  acceptsEvents(): boolean {
    return this.isPending() || this.isActive();
  }

  canTransitionTo(target: string): boolean {
    const transitions: Record<string, readonly string[]> = {
      [TRACKING_STATUS.PENDING]: [
        TRACKING_STATUS.ACTIVE,
        TRACKING_STATUS.FAILED,
        TRACKING_STATUS.EXPIRED,
      ],
      [TRACKING_STATUS.ACTIVE]: [
        TRACKING_STATUS.COMPLETED,
        TRACKING_STATUS.FAILED,
        TRACKING_STATUS.EXPIRED,
      ],
      [TRACKING_STATUS.COMPLETED]: [],
      [TRACKING_STATUS.FAILED]: [],
      [TRACKING_STATUS.EXPIRED]: [],
      [TRACKING_STATUS.UNKNOWN]: [
        TRACKING_STATUS.PENDING,
        TRACKING_STATUS.ACTIVE,
      ],
    };
    return (transitions[this.value] ?? []).includes(target);
  }
}
