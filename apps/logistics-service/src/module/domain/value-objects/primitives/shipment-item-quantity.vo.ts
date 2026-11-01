/**
 * ShipmentItemQuantity Value Object
 * @module logistics-service/domain/value-objects/primitives
 *
 * Business Rule:
 * - Integer between 1 and 999999
 * - Immutable
 * - Supports addition/subtraction
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MIN = 1;
const MAX = 999999;

export class ShipmentItemQuantityVO extends BaseVO<number> {
  private constructor(value: number) {
    super(value);
  }

  static create(raw: number): ShipmentItemQuantityVO {
    if (typeof raw !== 'number' || !Number.isFinite(raw)) {
      throw new ValidationError('ShipmentItemQuantity must be a finite number', 'quantity');
    }
    if (!Number.isInteger(raw)) {
      throw new ValidationError('ShipmentItemQuantity must be an integer', 'quantity');
    }
    if (raw < MIN || raw > MAX) {
      throw new ValidationError(
        `ShipmentItemQuantity must be between ${MIN} and ${MAX}`,
        'quantity',
      );
    }
    return new ShipmentItemQuantityVO(raw);
  }

  static reconstitute(raw: number): ShipmentItemQuantityVO {
    return new ShipmentItemQuantityVO(raw);
  }

  static one(): ShipmentItemQuantityVO {
    return new ShipmentItemQuantityVO(1);
  }

  add(other: ShipmentItemQuantityVO): ShipmentItemQuantityVO {
    return ShipmentItemQuantityVO.create(this.value + other.value);
  }

  subtract(other: ShipmentItemQuantityVO): ShipmentItemQuantityVO {
    return ShipmentItemQuantityVO.create(this.value - other.value);
  }

  isOne(): boolean {
    return this.value === 1;
  }

  isGreaterThan(other: ShipmentItemQuantityVO): boolean {
    return this.value > other.value;
  }
}
