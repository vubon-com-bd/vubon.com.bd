/**
 * ShipmentItemStatus Value Object
 * @module logistics-service/domain/value-objects/primitives
 *
 * State machine:
 *   pending → packed → shipped → delivered ✓ (final)
 *   shipped → returned ✓ (final)
 *   pending/packed → cancelled ✓ (final)
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export type ShipmentItemStatusValue =
  | 'pending'
  | 'packed'
  | 'shipped'
  | 'delivered'
  | 'returned'
  | 'cancelled';

const VALID_STATUSES: readonly ShipmentItemStatusValue[] = [
  'pending',
  'packed',
  'shipped',
  'delivered',
  'returned',
  'cancelled',
];

const VALID_TRANSITIONS: Readonly<
  Record<ShipmentItemStatusValue, readonly ShipmentItemStatusValue[]>
> = {
  pending: ['packed', 'cancelled'],
  packed: ['shipped', 'cancelled'],
  shipped: ['delivered', 'returned'],
  delivered: [], // final
  returned: [], // final
  cancelled: [], // final
};

export class ShipmentItemStatusVO extends BaseVO<ShipmentItemStatusValue> {
  private constructor(value: ShipmentItemStatusValue) {
    super(value);
  }

  static create(raw: string): ShipmentItemStatusVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('ShipmentItemStatus must be a string', 'status');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_STATUSES.includes(normalized as ShipmentItemStatusValue)) {
      throw new ValidationError(
        `Invalid ShipmentItemStatus: "${normalized}". Allowed: ${VALID_STATUSES.join(', ')}`,
        'status',
      );
    }
    return new ShipmentItemStatusVO(normalized as ShipmentItemStatusValue);
  }

  static reconstitute(raw: string): ShipmentItemStatusVO {
    return new ShipmentItemStatusVO(raw as ShipmentItemStatusValue);
  }

  // ─── Factories ────────────────────────────
  static pending(): ShipmentItemStatusVO {
    return new ShipmentItemStatusVO('pending');
  }
  static delivered(): ShipmentItemStatusVO {
    return new ShipmentItemStatusVO('delivered');
  }

  // ─── Predicates ───────────────────────────
  isPending(): boolean {
    return this.value === 'pending';
  }
  isPacked(): boolean {
    return this.value === 'packed';
  }
  isShipped(): boolean {
    return this.value === 'shipped';
  }
  isDelivered(): boolean {
    return this.value === 'delivered';
  }
  isReturned(): boolean {
    return this.value === 'returned';
  }
  isCancelled(): boolean {
    return this.value === 'cancelled';
  }

  /** Final status — no further transitions allowed */
  isFinal(): boolean {
    return this.isDelivered() || this.isReturned() || this.isCancelled();
  }

  /** Can be cancelled (not final, not shipped) */
  isCancellable(): boolean {
    return this.isPending() || this.isPacked();
  }

  // ─── State Machine ────────────────────────
  canTransitionTo(target: string): boolean {
    const normalized = target.trim().toLowerCase() as ShipmentItemStatusValue;
    const allowed = VALID_TRANSITIONS[this.value] ?? [];
    return allowed.includes(normalized);
  }

  allowedTransitions(): readonly ShipmentItemStatusValue[] {
    return VALID_TRANSITIONS[this.value] ?? [];
  }
}
