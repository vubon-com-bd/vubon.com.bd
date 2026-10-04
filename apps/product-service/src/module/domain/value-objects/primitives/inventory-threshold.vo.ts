/**
 * InventoryThreshold Value Object
 */
import { BaseQuantityVO } from '@vubon/shared-kernel/domain/primitives';
import { INVENTORY } from '@vubon/shared-constants/business/product';
import { InvalidQuantityError } from '../../errors/inventory.errors.js';

export class InventoryThresholdVO extends BaseQuantityVO {
  private constructor(value: number) {
    super(value);
  }

  static create(raw: number): InventoryThresholdVO {
    if (!Number.isInteger(raw) || raw < 0) {
      throw new InvalidQuantityError(raw, 'threshold must be a non-negative integer');
    }
    if (raw > INVENTORY.MAX_STOCK_PER_VARIANT) {
      throw new InvalidQuantityError(raw, `threshold cannot exceed ${INVENTORY.MAX_STOCK_PER_VARIANT}`);
    }
    return new InventoryThresholdVO(raw);
  }

  static default(): InventoryThresholdVO {
    return new InventoryThresholdVO(INVENTORY.LOW_STOCK_THRESHOLD);
  }

  static reconstitute(raw: number): InventoryThresholdVO {
    return new InventoryThresholdVO(raw);
  }

  isLowStock(quantity: number): boolean {
    return quantity <= this.value && quantity > 0;
  }

  isCritical(quantity: number): boolean {
    return quantity <= INVENTORY.CRITICAL_STOCK_THRESHOLD;
  }
}
