/**
 * DeliveryStatus Value Object
 * @module order-service/domain/value-objects/primitives
 *
 * State machine:
 *   pending → scheduled → picked_up → in_transit → out_for_delivery → delivered
 *   Any pre-delivered → failed | cancelled
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export type DeliveryStatusValue =
  | 'pending'
  | 'scheduled'
  | 'picked_up'
  | 'in_transit'
  | 'out_for_delivery'
  | 'delivered'
  | 'failed'
  | 'cancelled';

const VALID_STATUSES: readonly string[] = [
  'pending',
  'scheduled',
  'picked_up',
  'in_transit',
  'out_for_delivery',
  'delivered',
  'failed',
  'cancelled',
];

const VALID_TRANSITIONS: Readonly<Record<DeliveryStatusValue, readonly DeliveryStatusValue[]>> = {
  pending: ['scheduled', 'cancelled', 'failed'],
  scheduled: ['picked_up', 'cancelled', 'failed'],
  picked_up: ['in_transit', 'failed'],
  in_transit: ['out_for_delivery', 'failed'],
  out_for_delivery: ['delivered', 'failed'],
  delivered: [],
  failed: ['scheduled'],
  cancelled: [],
} as Readonly<Record<DeliveryStatusValue, readonly DeliveryStatusValue[]>>;

export class DeliveryStatusVO extends BaseStatusVO<DeliveryStatusValue> {
  private constructor(value: DeliveryStatusValue) {
    super(value);
  }

  static create(raw: string): DeliveryStatusVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('DeliveryStatus must be a string', 'status');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_STATUSES.includes(normalized)) {
      throw new ValidationError(
        `Invalid DeliveryStatus: "${normalized}". Allowed: ${VALID_STATUSES.join(', ')}`,
        'status',
      );
    }
    return new DeliveryStatusVO(normalized as DeliveryStatusValue);
  }

  static reconstitute(raw: string): DeliveryStatusVO {
    return new DeliveryStatusVO(raw as DeliveryStatusValue);
  }

  static pending(): DeliveryStatusVO { return new DeliveryStatusVO('pending'); }
  static delivered(): DeliveryStatusVO { return new DeliveryStatusVO('delivered'); }

  isPending(): boolean { return this.value === 'pending'; }
  isScheduled(): boolean { return this.value === 'scheduled'; }
  isPickedUp(): boolean { return this.value === 'picked_up'; }
  isInTransit(): boolean { return this.value === 'in_transit'; }
  isOutForDelivery(): boolean { return this.value === 'out_for_delivery'; }
  isDelivered(): boolean { return this.value === 'delivered'; }
  isFailed(): boolean { return this.value === 'failed'; }
  isCancelled(): boolean { return this.value === 'cancelled'; }

  isTerminal(): boolean {
    return this.isDelivered() || this.isCancelled();
  }

  isInProgress(): boolean {
    return this.isPickedUp() || this.isInTransit() || this.isOutForDelivery();
  }

  canTransitionTo(target: string): boolean {
    const allowed = VALID_TRANSITIONS[this.value] ?? [];
    return allowed.includes(target as DeliveryStatusValue);
  }
}
