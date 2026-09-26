import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '../../errors/validation.errors';

export class VendorIdVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): VendorIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new ValidationError('VendorId', 'cannot be empty');
    }
    return new VendorIdVO(raw);
  }
}
