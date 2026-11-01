/**
 * SKU Value Objects
 * @module shared-kernel/domain/primitives
 *
 * Values আসে shared-constants/common থেকে।
 */
import { BaseVO } from '../base/base.vo.js';

const SKU_PATTERN = /^[A-Z0-9][A-Z0-9\-_]{1,63}$/;
const DEFAULT_MIN_LENGTH = 2;
const DEFAULT_MAX_LENGTH = 64;

/**
 * Abstract base for SKU VOs.
 * Subclasses can override `minLength()` / `maxLength()` to constrain.
 */
export abstract class BaseSkuVO extends BaseVO<string> {
  protected constructor(value: string) {
    super(value);
  }

  protected static minLength(): number {
    return DEFAULT_MIN_LENGTH;
  }

  protected static maxLength(): number {
    return DEFAULT_MAX_LENGTH;
  }

  protected static validateRaw(raw: string): string {
    if (typeof raw !== 'string') {
      throw new Error('SKU must be a string');
    }
    const normalized = raw.trim().toUpperCase();

    if (normalized.length < this.minLength() || normalized.length > this.maxLength()) {
      throw new Error(`SKU must be ${this.minLength()}-${this.maxLength()} characters`);
    }
    if (!SKU_PATTERN.test(normalized)) {
      throw new Error(`Invalid SKU format: ${raw}`);
    }
    return normalized;
  }
}

export class SkuVO extends BaseSkuVO {
  private constructor(value: string) {
    super(value);
  }

  static of(raw: string): SkuVO {
    return new SkuVO(BaseSkuVO.validateRaw(raw));
  }
}
