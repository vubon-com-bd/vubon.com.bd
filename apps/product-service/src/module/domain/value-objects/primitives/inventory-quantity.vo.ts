/**
 * InventoryQuantity Value Object
 * @module product-service/domain/value-objects/primitives
 *
 * Non-negative integer (0 .. MAX_STOCK_PER_VARIANT)
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { INVENTORY } from '@vubon/shared-constants/business';

const MAX = INVENTORY.MAX_STOCK_PER_VARIANT;

export class InventoryQuantityVO extends BaseVO<number> {
  private constructor(value: number) { super(value); }

  static create(raw: number): InventoryQuantityVO {
    if (!Number.isFinite(raw)) {
      throw new ValidationError('InventoryQuantity must be finite', 'quantity');
    }
    if (!Number.isInteger(raw)) {
      throw new ValidationError('InventoryQuantity must be integer', 'quantity');
    }
    if (raw < 0) {
      throw new ValidationError('InventoryQuantity cannot be negative', 'quantity');
    }
    if (raw > MAX) {
      throw new ValidationError(`InventoryQuantity exceeds max ${MAX}`, 'quantity');
    }
    return new InventoryQuantityVO(raw);
  }

  static reconstitute(raw: number): InventoryQuantityVO { return new InventoryQuantityVO(raw); }
  static zero(): InventoryQuantityVO { return new InventoryQuantityVO(0); }

  isZero(): boolean { return this.value === 0; }
  isPositive(): boolean { return this.value > 0; }

  isLow(threshold: number = INVENTORY.LOW_STOCK_THRESHOLD): boolean {
    return this.value > 0 && this.value <= threshold;
  }

  isCritical(threshold: number = INVENTORY.CRITICAL_STOCK_THRESHOLD): boolean {
    return this.value > 0 && this.value <= threshold;
  }

  add(other: InventoryQuantityVO): InventoryQuantityVO {
    return InventoryQuantityVO.create(this.value + other.value);
  }

  subtract(other: InventoryQuantityVO): InventoryQuantityVO {
    const next = this.value - other.value;
    if (next < 0) {
      throw new ValidationError('InventoryQuantity subtraction underflow', 'quantity');
    }
    return InventoryQuantityVO.create(next);
  }
}
