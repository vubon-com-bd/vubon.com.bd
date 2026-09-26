import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidValueError } from '../../errors/invalid-value.errors';

export class InventoryQuantityVO extends BaseVO<number> {
  private constructor(value: number) {
    super(value);
  }

  static create(raw: number): InventoryQuantityVO {
    if (!Number.isInteger(raw)) {
      throw new InvalidValueError('inventory_quantity', `Quantity must be integer: ${raw}`);
    }
    if (raw < 0) {
      throw new InvalidValueError('inventory_quantity', `Quantity cannot be negative: ${raw}`);
    }
    return new InventoryQuantityVO(raw);
  }

  isZero(): boolean { return this.value === 0; }
  isPositive(): boolean { return this.value > 0; }
}
