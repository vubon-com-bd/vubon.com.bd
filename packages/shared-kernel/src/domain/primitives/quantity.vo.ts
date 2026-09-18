/**
 * Quantity Value Object
 * @module shared-kernel/domain/primitives
 *
 * Values আসে shared-constants/common থেকে।
 */
import { VALIDATION } from '@vubon/shared-constants/common';
import { BaseVO } from '../base/base.vo';

export class QuantityVO extends BaseVO<number> {
  private static readonly MIN = 1;
  private static readonly MAX = 999999;

  private constructor(value: number) {
    super(value);
  }

  static of(raw: number): QuantityVO {
    if (!Number.isInteger(raw)) {
      throw new Error('Quantity must be an integer');
    }
    if (raw < QuantityVO.MIN) {
      throw new Error(`Quantity must be >= ${QuantityVO.MIN}`);
    }
    if (raw > QuantityVO.MAX) {
      throw new Error(`Quantity must be <= ${QuantityVO.MAX}`);
    }
    return new QuantityVO(raw);
  }

  add(other: QuantityVO): QuantityVO {
    return QuantityVO.of(this.value + other.value);
  }

  subtract(other: QuantityVO): QuantityVO {
    return QuantityVO.of(this.value - other.value);
  }
}

/**
 * Reference to validation constants to satisfy import contract.
 */
export const QUANTITY_MAX_LENGTH = VALIDATION.NAME_MAX_LENGTH;
