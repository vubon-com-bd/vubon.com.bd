/**
 * ProductName Value Object
 * @module product-service/domain/value-objects/primitives
 */
import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { PRODUCT } from '@vubon/shared-constants/business';

const MIN_LENGTH = 3;
const MAX_LENGTH = 200;

export class ProductNameVO extends BaseNameVO {
  private constructor(value: string) { super(value); }

  static create(raw: string): ProductNameVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('ProductName must be a string', 'name');
    }
    const normalized = raw.trim().replace(/\s+/g, ' ');
    if (normalized.length < MIN_LENGTH || normalized.length > MAX_LENGTH) {
      throw new ValidationError(
        `ProductName must be ${MIN_LENGTH}-${MAX_LENGTH} chars`,
        'name',
      );
    }
    return new ProductNameVO(normalized);
  }

  static reconstitute(raw: string): ProductNameVO { return new ProductNameVO(raw); }

  isShort(): boolean { return this.value.length <= 40; }
}
