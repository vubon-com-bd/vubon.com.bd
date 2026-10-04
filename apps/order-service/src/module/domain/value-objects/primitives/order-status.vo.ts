/**
 * OrderStatus Value Object
 * @module order-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { ORDER_STATUS } from '@vubon/shared-constants/business/order';
import { InvalidOrderStatusError } from '../../errors/order.errors.js';

const ALLOWED = Object.values(ORDER_STATUS) as readonly string[];

export class OrderStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): OrderStatusVO {
    if (typeof raw !== 'string') {
      throw new InvalidOrderStatusError(String(raw), ALLOWED);
    }
    if (!ALLOWED.includes(raw)) {
      throw new InvalidOrderStatusError(raw, ALLOWED);
    }
    return new OrderStatusVO(raw);
  }

  // ─── Named constructors ───
  static pending(): OrderStatusVO { return new OrderStatusVO(ORDER_STATUS.PENDING); }
  static confirmed(): OrderStatusVO { return new OrderStatusVO(ORDER_STATUS.CONFIRMED); }
  static processing(): OrderStatusVO { return new OrderStatusVO(ORDER_STATUS.PROCESSING); }
  static packed(): OrderStatusVO { return new OrderStatusVO(ORDER_STATUS.PACKED); }
  static shipped(): OrderStatusVO { return new OrderStatusVO(ORDER_STATUS.SHIPPED); }
  static outForDelivery(): OrderStatusVO { return new OrderStatusVO(ORDER_STATUS.OUT_FOR_DELIVERY); }
  static delivered(): OrderStatusVO { return new OrderStatusVO(ORDER_STATUS.DELIVERED); }
  static completed(): OrderStatusVO { return new OrderStatusVO(ORDER_STATUS.COMPLETED); }
  static cancelled(): OrderStatusVO { return new OrderStatusVO(ORDER_STATUS.CANCELLED); }
  static returned(): OrderStatusVO { return new OrderStatusVO(ORDER_STATUS.RETURNED); }
  static refunded(): OrderStatusVO { return new OrderStatusVO(ORDER_STATUS.REFUNDED); }
  static failed(): OrderStatusVO { return new OrderStatusVO(ORDER_STATUS.FAILED); }
  static onHold(): OrderStatusVO { return new OrderStatusVO(ORDER_STATUS.ON_HOLD); }

  static reconstitute(raw: string): OrderStatusVO {
    return new OrderStatusVO(raw);
  }

  // ─── Predicates ───
  isPending(): boolean { return this.value === ORDER_STATUS.PENDING; }
  isConfirmed(): boolean { return this.value === ORDER_STATUS.CONFIRMED; }
  isProcessing(): boolean { return this.value === ORDER_STATUS.PROCESSING; }
  isPacked(): boolean { return this.value === ORDER_STATUS.PACKED; }
  isShipped(): boolean { return this.value === ORDER_STATUS.SHIPPED; }
  isOutForDelivery(): boolean { return this.value === ORDER_STATUS.OUT_FOR_DELIVERY; }
  isDelivered(): boolean { return this.value === ORDER_STATUS.DELIVERED; }
  isCompleted(): boolean { return this.value === ORDER_STATUS.COMPLETED; }
  isCancelled(): boolean { return this.value === ORDER_STATUS.CANCELLED; }
  isReturned(): boolean { return this.value === ORDER_STATUS.RETURNED; }
  isRefunded(): boolean { return this.value === ORDER_STATUS.REFUNDED; }
  isFailed(): boolean { return this.value === ORDER_STATUS.FAILED; }
  isOnHold(): boolean { return this.value === ORDER_STATUS.ON_HOLD; }

  isFinal(): boolean {
    return [
      ORDER_STATUS.DELIVERED,
      ORDER_STATUS.COMPLETED,
      ORDER_STATUS.CANCELLED,
      ORDER_STATUS.RETURNED,
      ORDER_STATUS.REFUNDED,
    ].includes(this.value as never);
  }

  isActive(): boolean {
    return !this.isFinal() && !this.isFailed() && !this.isOnHold();
  }

  canTransitionTo(target: string): boolean {
    const transitions: Record<string, readonly string[]> = {
      [ORDER_STATUS.PENDING]: [
        ORDER_STATUS.CONFIRMED,
        ORDER_STATUS.CANCELLED,
        ORDER_STATUS.FAILED,
        ORDER_STATUS.ON_HOLD,
      ],
      [ORDER_STATUS.CONFIRMED]: [
        ORDER_STATUS.PROCESSING,
        ORDER_STATUS.CANCELLED,
        ORDER_STATUS.ON_HOLD,
      ],
      [ORDER_STATUS.PROCESSING]: [
        ORDER_STATUS.PACKED,
        ORDER_STATUS.CANCELLED,
      ],
      [ORDER_STATUS.PACKED]: [
        ORDER_STATUS.SHIPPED,
        ORDER_STATUS.CANCELLED,
      ],
      [ORDER_STATUS.SHIPPED]: [
        ORDER_STATUS.OUT_FOR_DELIVERY,
        ORDER_STATUS.DELIVERED,
        ORDER_STATUS.RETURNED,
      ],
      [ORDER_STATUS.OUT_FOR_DELIVERY]: [
        ORDER_STATUS.DELIVERED,
        ORDER_STATUS.FAILED,
      ],
      [ORDER_STATUS.DELIVERED]: [
        ORDER_STATUS.COMPLETED,
        ORDER_STATUS.RETURNED,
      ],
      [ORDER_STATUS.ON_HOLD]: [
        ORDER_STATUS.PENDING,
        ORDER_STATUS.CONFIRMED,
        ORDER_STATUS.CANCELLED,
      ],
      [ORDER_STATUS.RETURNED]: [ORDER_STATUS.REFUNDED],
    };
    return (transitions[this.value] ?? []).includes(target);
  }
}
