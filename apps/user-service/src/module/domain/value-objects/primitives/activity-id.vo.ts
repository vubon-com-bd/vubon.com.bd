import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidActivityIdError } from '../../errors/activity.errors';

export class ActivityIdVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ActivityIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new InvalidActivityIdError('ActivityId cannot be empty');
    }
    return new ActivityIdVO(raw);
  }
}
