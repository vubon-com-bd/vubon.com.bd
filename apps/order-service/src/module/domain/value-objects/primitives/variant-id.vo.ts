import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '../../errors/validation.errors';

export class VariantIdVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): VariantIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new ValidationError('VariantId', 'cannot be empty');
    }
    return new VariantIdVO(raw);
  }
}
