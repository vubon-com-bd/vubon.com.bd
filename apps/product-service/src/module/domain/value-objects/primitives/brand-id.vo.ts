/**
 * BrandId Value Object
 * @module product-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';

export class BrandIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): BrandIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new Error('BrandId cannot be empty');
    }
    return new BrandIdVO(raw.trim());
  }

  static reconstitute(raw: string): BrandIdVO {
    return new BrandIdVO(raw);
  }
}
