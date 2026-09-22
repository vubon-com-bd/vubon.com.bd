import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '../../errors/validation.errors';

export class ReturnIdVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ReturnIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new ValidationError('ReturnId', 'cannot be empty');
    }
    return new ReturnIdVO(raw);
  }
}
