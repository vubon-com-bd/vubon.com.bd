/**
 * SKU Value Object
 * @module shared-kernel/domain/primitives
 *
 * Values আসে shared-constants/common থেকে।
 */
import { BaseVO } from '../base/base.vo';

const SKU_PATTERN = /^[A-Z0-9][A-Z0-9\-_]{1,63}$/;

export class SkuVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static of(raw: string): SkuVO {
    if (typeof raw !== 'string') {
      throw new Error('SKU must be a string');
    }
    const normalized = raw.trim().toUpperCase();

    if (normalized.length < 2 || normalized.length > 64) {
      throw new Error('SKU must be 2-64 characters');
    }
    if (!SKU_PATTERN.test(normalized)) {
      throw new Error(`Invalid SKU format: ${raw}`);
    }

    return new SkuVO(normalized);
  }
}
