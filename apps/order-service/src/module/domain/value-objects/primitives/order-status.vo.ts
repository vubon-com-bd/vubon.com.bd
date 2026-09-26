import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '../../errors/validation.errors';

const VALID = new Set<string>([
  'pending',
  'confirmed',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
  'returned',
  'refunded',
]);

export class OrderStatusVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): OrderStatusVO {
    if (!VALID.has(raw)) {
      throw new ValidationError('OrderStatus', `invalid: ${raw}`);
    }
    return new OrderStatusVO(raw);
  }

  isFinal(): boolean {
    return ['cancelled', 'delivered', 'returned', 'refunded'].includes(this.value);
  }

  isActive(): boolean {
    return !this.isFinal();
  }
}
