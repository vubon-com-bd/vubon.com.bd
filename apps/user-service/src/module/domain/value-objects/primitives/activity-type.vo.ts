import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { USER_ACTIVITY } from '@vubon/shared-constants/user';
import { InvalidActivityTypeError } from '../../errors/activity.errors';

const VALID = new Set<string>(Object.values(USER_ACTIVITY as Record<string, string>));

export class ActivityTypeVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ActivityTypeVO {
    if (VALID.size > 0 && !VALID.has(raw)) {
      throw new InvalidActivityTypeError(raw);
    }
    return new ActivityTypeVO(raw);
  }
}
