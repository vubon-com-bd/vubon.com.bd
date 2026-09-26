import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidActivityTimestampError } from '../../errors/activity.errors';

export class ActivityTimestampVO extends BaseVO<Date> {
  private constructor(value: Date) {
    super(value);
  }

  static create(value: Date): ActivityTimestampVO {
    if (Number.isNaN(value.getTime())) {
      throw new InvalidActivityTimestampError('invalid date');
    }
    return new ActivityTimestampVO(value);
  }

  static now(): ActivityTimestampVO {
    return new ActivityTimestampVO(new Date());
  }

  toISOString(): string {
    return this.value.toISOString();
  }
}
