import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';

export class AbandonedCartReminderVO extends BaseVO<number> {
  static create(value: number): AbandonedCartReminderVO {
    if (!Number.isInteger(value) || value < 0) {
      throw new Error('Reminder count must be non-negative integer');
    }
    return new AbandonedCartReminderVO(value);
  }

  get count(): number {
    return this.value;
  }

  private constructor(value: number) {
    super(value);
  }
}
