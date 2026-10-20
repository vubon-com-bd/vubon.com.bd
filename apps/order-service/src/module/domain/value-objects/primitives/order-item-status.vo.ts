/**
 * OrderItemStatus Value Object
 * @module order-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { ORDER_ITEM_STATUS } from '@vubon/shared-constants/business/order';

export type OrderItemStatusValue = (typeof ORDER_ITEM_STATUS)[keyof typeof ORDER_ITEM_STATUS];

const VALID_STATUSES: readonly string[] = Object.values(ORDER_ITEM_STATUS);

const VALID_TRANSITIONS: Readonly<Record<OrderItemStatusValue, readonly OrderItemStatusValue[]>> = {
  pending: ['confirmed', 'cancelled'],
  confirmed: ['packed', 'cancelled'],
  packed: ['shipped', 'cancelled'],
  shipped: ['delivered', 'returned'],
  delivered: ['returned', 'refunded'],
  cancelled: [],
  returned: ['refunded'],
  refunded: [],
} as Readonly<Record<OrderItemStatusValue, readonly OrderItemStatusValue[]>>;

export class OrderItemStatusVO extends BaseStatusVO<OrderItemStatusValue> {
  private constructor(value: OrderItemStatusValue) {
    super(value);
  }

  static create(raw: string): OrderItemStatusVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('OrderItemStatus must be a string', 'status');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_STATUSES.includes(normalized)) {
      throw new ValidationError(
        `Invalid OrderItemStatus: "${normalized}". Allowed: ${VALID_STATUSES.join(', ')}`,
        'status',
      );
    }
    return new OrderItemStatusVO(normalized as OrderItemStatusValue);
  }

  static reconstitute(raw: string): OrderItemStatusVO {
    return new OrderItemStatusVO(raw as OrderItemStatusValue);
  }

  static pending(): OrderItemStatusVO { return new OrderItemStatusVO('pending' as OrderItemStatusValue); }
  static confirmed(): OrderItemStatusVO { return new OrderItemStatusVO('confirmed' as OrderItemStatusValue); }
  static cancelled(): OrderItemStatusVO { return new OrderItemStatusVO('cancelled' as OrderItemStatusValue); }

  isPending(): boolean { return this.value === ORDER_ITEM_STATUS.PENDING; }
  isConfirmed(): boolean { return this.value === ORDER_ITEM_STATUS.CONFIRMED; }
  isPacked(): boolean { return this.value === ORDER_ITEM_STATUS.PACKED; }
  isShipped(): boolean { return this.value === ORDER_ITEM_STATUS.SHIPPED; }
  isDelivered(): boolean { return this.value === ORDER_ITEM_STATUS.DELIVERED; }
  isCancelled(): boolean { return this.value === ORDER_ITEM_STATUS.CANCELLED; }
  isReturned(): boolean { return this.value === ORDER_ITEM_STATUS.RETURNED; }
  isRefunded(): boolean { return this.value === ORDER_ITEM_STATUS.REFUNDED; }

  isTerminal(): boolean {
    return this.isCancelled() || this.isRefunded();
  }

  isCancellable(): boolean {
    return this.isPending() || this.isConfirmed() || this.isPacked();
  }

  isReturnable(): boolean {
    return this.isDelivered();
  }

  canTransitionTo(target: string): boolean {
    const allowed = VALID_TRANSITIONS[this.value] ?? [];
    return allowed.includes(target as OrderItemStatusValue);
  }
}
