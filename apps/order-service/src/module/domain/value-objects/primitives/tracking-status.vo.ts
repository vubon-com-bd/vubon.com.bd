/**
 * TrackingStatus Value Object
 * @module order-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export type TrackingStatusValue =
  | 'pending'
  | 'in_transit'
  | 'out_for_delivery'
  | 'delivered'
  | 'failed'
  | 'returned';

const VALID_STATUSES: readonly string[] = [
  'pending',
  'in_transit',
  'out_for_delivery',
  'delivered',
  'failed',
  'returned',
];

const VALID_TRANSITIONS: Readonly<Record<TrackingStatusValue, readonly TrackingStatusValue[]>> = {
  pending: ['in_transit', 'failed'],
  in_transit: ['out_for_delivery', 'failed'],
  out_for_delivery: ['delivered', 'failed'],
  delivered: ['returned'],
  failed: ['in_transit'],
  returned: [],
} as Readonly<Record<TrackingStatusValue, readonly TrackingStatusValue[]>>;

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

  isPending(): boolean { return this.value === 'pending'; }
  isInTransit(): boolean { return this.value === 'in_transit'; }
  isOutForDelivery(): boolean { return this.value === 'out_for_delivery'; }
  isDelivered(): boolean { return this.value === 'delivered'; }
  isFailed(): boolean { return this.value === 'failed'; }
  isReturned(): boolean { return this.value === 'returned'; }

  isTerminal(): boolean {
    return this.isDelivered() || this.isReturned();
  }

  canTransitionTo(target: string): boolean {
    const allowed = VALID_TRANSITIONS[this.value] ?? [];
    return allowed.includes(target as TrackingStatusValue);
  }
}
