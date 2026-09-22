import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '../../errors/validation.errors';

const VALID = new Set<string>([
  'pending',
  'confirmed',
  'packed',
  'shipped',
  'delivered',
  'cancelled',
  'returned',
]);

export class OrderItemStatusVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): OrderItemStatusVO {
    if (!VALID.has(raw)) {
      throw new ValidationError('OrderItemStatus', `invalid: ${raw}`);
    }
    return new OrderItemStatusVO(raw);
  }

  isFinal(): boolean {
    return ['delivered', 'cancelled', 'returned'].includes(this.value);
  }
}
