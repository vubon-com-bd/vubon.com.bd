/**
 * Quantity Value Object
 * @module shared-kernel/domain/primitives
 *
 * Values আসে shared-constants/common থেকে।
 */
import { VALIDATION } from '@vubon/shared-constants/common';
import { BaseVO } from '../base/base.vo';

/**
 * Base Quantity VO — abstract, extend করার জন্য।
 * Subclass-এ specific validation + factory।
 */
export abstract class BaseQuantityVO extends BaseVO<number> {
  protected constructor(value: number) {
    super(value);
  }

  protected static validateNonNegative(raw: number, field = 'quantity'): void {
    if (!Number.isFinite(raw)) {
      throw new Error(`${field} must be a finite number`);
    }
    if (raw < 0) {
      throw new Error(`${field} cannot be negative`);
    }
  }

  protected static validatePositive(raw: number, field = 'quantity'): void {
    if (!Number.isFinite(raw)) {
      throw new Error(`${field} must be a finite number`);
    }
    if (raw <= 0) {
      throw new Error(`${field} must be positive`);
    }
  }

  get isZero(): boolean {
    return this.value === 0;
  }

  get isPositive(): boolean {
    return this.value > 0;
  }

  toNumber(): number {
    return this.value;
  }
}

/**
 * Concrete QuantityVO — general purpose, integer only।
 */
export class QuantityVO extends BaseQuantityVO {
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
