/**
 * OrderStatus Value Object
 * @module order-service/domain/value-objects/primitives
 *
 * State machine:
 *   pending → confirmed → processing → packed → shipped
 *   → out_for_delivery → delivered → completed
 *   Any non-terminal → cancelled
 *   delivered → returned → refunded
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { ORDER_STATUS } from '@vubon/shared-constants/business/order';

export type OrderStatusValue = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

const VALID_STATUSES: readonly string[] = Object.values(ORDER_STATUS);

const VALID_TRANSITIONS: Readonly<Record<OrderStatusValue, readonly OrderStatusValue[]>> = {
  pending: ['confirmed', 'cancelled', 'failed', 'on_hold'],
  confirmed: ['processing', 'cancelled', 'on_hold'],
  processing: ['packed', 'cancelled', 'on_hold'],
  packed: ['shipped', 'cancelled'],
  shipped: ['out_for_delivery', 'delivered', 'returned'],
  out_for_delivery: ['delivered', 'failed', 'returned'],
  delivered: ['completed', 'returned'],
  completed: ['returned', 'refunded'],
  cancelled: [],
  returned: ['refunded'],
  refunded: [],
  failed: ['cancelled'],
  on_hold: ['confirmed', 'cancelled'],
} as Readonly<Record<OrderStatusValue, readonly OrderStatusValue[]>>;

export class OrderStatusVO extends BaseStatusVO<OrderStatusValue> {
  private constructor(value: OrderStatusValue) {
    super(value);
  }

  static create(raw: string): OrderStatusVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('OrderStatus must be a string', 'status');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_STATUSES.includes(normalized)) {
      throw new ValidationError(
        `Invalid OrderStatus: "${normalized}". Allowed: ${VALID_STATUSES.join(', ')}`,
        'status',
      );
    }
    return new OrderStatusVO(normalized as OrderStatusValue);
  }

  static reconstitute(raw: string): OrderStatusVO {
    return new OrderStatusVO(raw as OrderStatusValue);
  }

  static pending(): OrderStatusVO { return new OrderStatusVO(ORDER_STATUS.PENDING as OrderStatusValue); }
  static confirmed(): OrderStatusVO { return new OrderStatusVO(ORDER_STATUS.CONFIRMED as OrderStatusValue); }
  static processing(): OrderStatusVO { return new OrderStatusVO(ORDER_STATUS.PROCESSING as OrderStatusValue); }
  static packed(): OrderStatusVO { return new OrderStatusVO(ORDER_STATUS.PACKED as OrderStatusValue); }
  static shipped(): OrderStatusVO { return new OrderStatusVO(ORDER_STATUS.SHIPPED as OrderStatusValue); }
  static delivered(): OrderStatusVO { return new OrderStatusVO(ORDER_STATUS.DELIVERED as OrderStatusValue); }
  static completed(): OrderStatusVO { return new OrderStatusVO(ORDER_STATUS.COMPLETED as OrderStatusValue); }
  static cancelled(): OrderStatusVO { return new OrderStatusVO(ORDER_STATUS.CANCELLED as OrderStatusValue); }
  static returned(): OrderStatusVO { return new OrderStatusVO(ORDER_STATUS.RETURNED as OrderStatusValue); }
  static refunded(): OrderStatusVO { return new OrderStatusVO(ORDER_STATUS.REFUNDED as OrderStatusValue); }
  static failed(): OrderStatusVO { return new OrderStatusVO(ORDER_STATUS.FAILED as OrderStatusValue); }
  static onHold(): OrderStatusVO { return new OrderStatusVO(ORDER_STATUS.ON_HOLD as OrderStatusValue); }

  // ═══ Predicates ═══
  isPending(): boolean { return this.value === ORDER_STATUS.PENDING; }
  isConfirmed(): boolean { return this.value === ORDER_STATUS.CONFIRMED; }
  isProcessing(): boolean { return this.value === ORDER_STATUS.PROCESSING; }
  isPacked(): boolean { return this.value === ORDER_STATUS.PACKED; }
  isShipped(): boolean { return this.value === ORDER_STATUS.SHIPPED; }
  isDelivered(): boolean { return this.value === ORDER_STATUS.DELIVERED; }
  isCompleted(): boolean { return this.value === ORDER_STATUS.COMPLETED; }
  isCancelled(): boolean { return this.value === ORDER_STATUS.CANCELLED; }
  isReturned(): boolean { return this.value === ORDER_STATUS.RETURNED; }
  isRefunded(): boolean { return this.value === ORDER_STATUS.REFUNDED; }
  isFailed(): boolean { return this.value === ORDER_STATUS.FAILED; }
  isOnHold(): boolean { return this.value === ORDER_STATUS.ON_HOLD; }

  isTerminal(): boolean {
    return this.isCancelled() || this.isCompleted() || this.isRefunded();
  }

  isFulfillable(): boolean {
    return this.isConfirmed() || this.isProcessing() || this.isPacked();
  }

  isShippable(): boolean {
    return this.isPacked();
  }

  isReturnable(): boolean {
    return this.isDelivered() || this.isCompleted();
  }

  isCancellable(): boolean {
    return !this.isTerminal() && !this.isShipped() && !this.isDelivered();
  }

  // ═══ State Machine ═══
  canTransitionTo(target: string): boolean {
    const allowed = VALID_TRANSITIONS[this.value] ?? [];
    return allowed.includes(target as OrderStatusValue);
  }
}
