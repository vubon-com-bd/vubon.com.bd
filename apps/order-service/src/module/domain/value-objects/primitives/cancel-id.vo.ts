import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '../../errors/validation.errors';

export class CancelIdVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): CancelIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new ValidationError('CancelId', 'cannot be empty');
    }
    return new CancelIdVO(raw);
  }
}
