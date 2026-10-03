/**
 * OrderItemStatus Value Object
 * @module order-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { ORDER_ITEM_STATUS } from '@vubon/shared-constants/business/order';
import { InvalidOrderItemStatusError } from '../../errors/order-item.errors.js';

const ALLOWED = Object.values(ORDER_ITEM_STATUS) as readonly string[];

export class OrderItemStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): OrderItemStatusVO {
    if (!ALLOWED.includes(raw)) {
      throw new InvalidOrderItemStatusError(raw, ALLOWED);
    }
    return new OrderItemStatusVO(raw);
  }

  static pending(): OrderItemStatusVO { return new OrderItemStatusVO(ORDER_ITEM_STATUS.PENDING); }
  static confirmed(): OrderItemStatusVO { return new OrderItemStatusVO(ORDER_ITEM_STATUS.CONFIRMED); }
  static packed(): OrderItemStatusVO { return new OrderItemStatusVO(ORDER_ITEM_STATUS.PACKED); }
  static shipped(): OrderItemStatusVO { return new OrderItemStatusVO(ORDER_ITEM_STATUS.SHIPPED); }
  static delivered(): OrderItemStatusVO { return new OrderItemStatusVO(ORDER_ITEM_STATUS.DELIVERED); }
  static cancelled(): OrderItemStatusVO { return new OrderItemStatusVO(ORDER_ITEM_STATUS.CANCELLED); }
  static returned(): OrderItemStatusVO { return new OrderItemStatusVO(ORDER_ITEM_STATUS.RETURNED); }
  static refunded(): OrderItemStatusVO { return new OrderItemStatusVO(ORDER_ITEM_STATUS.REFUNDED); }

  static reconstitute(raw: string): OrderItemStatusVO {
    return new OrderItemStatusVO(raw);
  }

  isPending(): boolean { return this.value === ORDER_ITEM_STATUS.PENDING; }
  isConfirmed(): boolean { return this.value === ORDER_ITEM_STATUS.CONFIRMED; }
  isPacked(): boolean { return this.value === ORDER_ITEM_STATUS.PACKED; }
  isShipped(): boolean { return this.value === ORDER_ITEM_STATUS.SHIPPED; }
  isDelivered(): boolean { return this.value === ORDER_ITEM_STATUS.DELIVERED; }
  isCancelled(): boolean { return this.value === ORDER_ITEM_STATUS.CANCELLED; }
  isReturned(): boolean { return this.value === ORDER_ITEM_STATUS.RETURNED; }
  isRefunded(): boolean { return this.value === ORDER_ITEM_STATUS.REFUNDED; }

  isFinal(): boolean {
    return [
      ORDER_ITEM_STATUS.DELIVERED,
      ORDER_ITEM_STATUS.CANCELLED,
      ORDER_ITEM_STATUS.RETURNED,
      ORDER_ITEM_STATUS.REFUNDED,
    ].includes(this.value as never);
  }

  canTransitionTo(target: string): boolean {
    const T = ORDER_ITEM_STATUS;
    const transitions: Record<string, readonly string[]> = {
      [T.PENDING]: [T.CONFIRMED, T.CANCELLED],
      [T.CONFIRMED]: [T.PACKED, T.CANCELLED],
      [T.PACKED]: [T.SHIPPED, T.CANCELLED],
      [T.SHIPPED]: [T.DELIVERED, T.RETURNED],
      [T.DELIVERED]: [T.RETURNED, T.REFUNDED],
      [T.RETURNED]: [T.REFUNDED],
    };
    return (transitions[this.value] ?? []).includes(target);
  }
}
