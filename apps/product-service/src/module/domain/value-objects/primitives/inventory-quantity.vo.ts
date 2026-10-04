/**
 * InventoryQuantity Value Object
 */
import { BaseQuantityVO } from '@vubon/shared-kernel/domain/primitives';
import { INVENTORY } from '@vubon/shared-constants/business/product';
import { InvalidQuantityError, StockLimitExceededError } from '../../errors/inventory.errors.js';

export class InventoryQuantityVO extends BaseQuantityVO {
  private constructor(value: number) {
    super(value);
  }

  static create(raw: number): InventoryQuantityVO {
    if (!Number.isInteger(raw)) {
      throw new InvalidQuantityError(raw, 'must be an integer');
    }
    if (raw < INVENTORY.MIN_STOCK) {
      throw new InvalidQuantityError(raw, `cannot be less than ${INVENTORY.MIN_STOCK}`);
    }
    if (raw > INVENTORY.MAX_STOCK_PER_VARIANT) {
      throw new StockLimitExceededError(raw, INVENTORY.MAX_STOCK_PER_VARIANT);
    }
    return new InventoryQuantityVO(raw);
  }

  static zero(): InventoryQuantityVO {
    return new InventoryQuantityVO(0);
  }

  static reconstitute(raw: number): InventoryQuantityVO {
    return new InventoryQuantityVO(raw);
  }
}
