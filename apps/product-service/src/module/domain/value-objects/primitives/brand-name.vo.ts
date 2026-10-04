/**
 * BrandName Value Object
 * @module product-service/domain/value-objects/primitives
 */
import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives';

const MIN_LENGTH = 2;
const MAX_LENGTH = 100;

export class BrandNameVO extends BaseNameVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): BrandNameVO {
    if (typeof raw !== 'string') {
      throw new Error('BrandName must be a string');
    }
    const trimmed = raw.trim();
    if (trimmed.length < MIN_LENGTH || trimmed.length > MAX_LENGTH) {
      throw new Error(`BrandName must be ${MIN_LENGTH}-${MAX_LENGTH} characters`);
    }
    return new BrandNameVO(trimmed);
  }

  static reconstitute(raw: string): BrandNameVO {
    return new BrandNameVO(raw);
  }
}
