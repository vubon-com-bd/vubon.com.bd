import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '../../errors/validation.errors';

export class HistoryIdVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): HistoryIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new ValidationError('HistoryId', 'cannot be empty');
    }
    return new HistoryIdVO(raw);
  }
}
