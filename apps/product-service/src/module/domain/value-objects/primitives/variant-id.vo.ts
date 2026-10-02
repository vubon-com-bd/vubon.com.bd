/**
 * VariantId Value Object
 * @module product-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';

export class VariantIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): VariantIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new Error('VariantId cannot be empty');
    }
    return new VariantIdVO(raw.trim());
  }

  static reconstitute(raw: string): VariantIdVO {
    return new VariantIdVO(raw);
  }
}
