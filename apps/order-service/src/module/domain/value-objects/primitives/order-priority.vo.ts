/**
 * OrderPriority Value Object
 * @module order-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { ORDER_PRIORITY } from '@vubon/shared-constants/business/order';
import { InvalidOrderPriorityError } from '../../errors/order.errors.js';

const ALLOWED = Object.values(ORDER_PRIORITY) as readonly string[];
const WEIGHT: Record<string, number> = {
  [ORDER_PRIORITY.LOW]: 1,
  [ORDER_PRIORITY.NORMAL]: 2,
  [ORDER_PRIORITY.HIGH]: 3,
  [ORDER_PRIORITY.URGENT]: 4,
};

export class OrderPriorityVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): OrderPriorityVO {
    if (!ALLOWED.includes(raw)) {
      throw new InvalidOrderPriorityError(raw, ALLOWED);
    }
    return new OrderPriorityVO(raw);
  }

  static normal(): OrderPriorityVO {
    return new OrderPriorityVO(ORDER_PRIORITY.NORMAL);
  }

  static reconstitute(raw: string): OrderPriorityVO {
    return new OrderPriorityVO(raw);
  }

  get weight(): number {
    return WEIGHT[this.value] ?? 0;
  }

  isUrgent(): boolean { return this.value === ORDER_PRIORITY.URGENT; }
  isHigh(): boolean { return this.value === ORDER_PRIORITY.HIGH; }
  isNormal(): boolean { return this.value === ORDER_PRIORITY.NORMAL; }
}
