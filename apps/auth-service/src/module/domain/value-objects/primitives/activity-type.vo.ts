import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { USER_ACTIVITY } from '@vubon/shared-constants/user';
import { InvalidTypeError } from '../../errors/user.errors';

const VALID = new Set<string>(Object.values(USER_ACTIVITY));

export class ActivityTypeVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ActivityTypeVO {
    if (!VALID.has(raw)) {
      throw new InvalidTypeError(raw);
    }
    return new ActivityTypeVO(raw);
  }
}
