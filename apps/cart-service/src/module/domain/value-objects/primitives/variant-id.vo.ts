import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';

export class VariantIdVO extends BaseIdVO {
  static create(value: string): VariantIdVO {
    if (!value || value.trim().length < 3) {
      throw new Error('Invalid variant id');
    }
    return new VariantIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
