/**
 * InventoryStatus Value Object
 * @module product-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { INVENTORY_STATUS } from '@vubon/shared-constants/business';

export type InventoryStatusValue =
  (typeof INVENTORY_STATUS)[keyof typeof INVENTORY_STATUS];

const VALID: readonly string[] = Object.values(INVENTORY_STATUS);

export class InventoryStatusVO extends BaseStatusVO<InventoryStatusValue> {
  private constructor(value: InventoryStatusValue) { super(value); }

  static create(raw: string): InventoryStatusVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('InventoryStatus must be a string', 'status');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID.includes(normalized)) {
      throw new ValidationError(
        `Invalid InventoryStatus: "${normalized}". Allowed: ${VALID.join(', ')}`,
        'status',
      );
    }
    return new InventoryStatusVO(normalized as InventoryStatusValue);
  }

  static reconstitute(raw: string): InventoryStatusVO {
    return new InventoryStatusVO(raw as InventoryStatusValue);
  }

  isInStock(): boolean { return this.value === INVENTORY_STATUS.IN_STOCK; }
  isLowStock(): boolean { return this.value === INVENTORY_STATUS.LOW_STOCK; }
  isOutOfStock(): boolean { return this.value === INVENTORY_STATUS.OUT_OF_STOCK; }
  isBackorder(): boolean { return this.value === INVENTORY_STATUS.BACKORDER; }
  isDiscontinued(): boolean { return this.value === INVENTORY_STATUS.DISCONTINUED; }

  isAvailable(): boolean {
    return this.isInStock() || this.isLowStock() || this.isBackorder();
  }
}
