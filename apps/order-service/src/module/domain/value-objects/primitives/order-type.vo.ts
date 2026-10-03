/**
 * OrderType Value Object
 * @module order-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { ORDER_TYPE } from '@vubon/shared-constants/business/order';
import { InvalidOrderTypeError } from '../../errors/order.errors.js';

const ALLOWED = Object.values(ORDER_TYPE) as readonly string[];

export class OrderTypeVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): OrderTypeVO {
    if (!ALLOWED.includes(raw)) {
      throw new InvalidOrderTypeError(raw, ALLOWED);
    }
    return new OrderTypeVO(raw);
  }

  static regular(): OrderTypeVO { return new OrderTypeVO(ORDER_TYPE.REGULAR); }
  static preOrder(): OrderTypeVO { return new OrderTypeVO(ORDER_TYPE.PRE_ORDER); }
  static backorder(): OrderTypeVO { return new OrderTypeVO(ORDER_TYPE.BACKORDER); }

  static reconstitute(raw: string): OrderTypeVO {
    return new OrderTypeVO(raw);
  }

  isRegular(): boolean { return this.value === ORDER_TYPE.REGULAR; }
  isSubscription(): boolean { return this.value === ORDER_TYPE.SUBSCRIPTION; }
}
