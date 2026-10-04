/**
 * CategoryId Value Object
 * @module product-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';

export class CategoryIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): CategoryIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new Error('CategoryId cannot be empty');
    }
    return new CategoryIdVO(raw.trim());
  }

  static reconstitute(raw: string): CategoryIdVO {
    return new CategoryIdVO(raw);
  }
}
