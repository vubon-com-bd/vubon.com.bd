import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';

export class RecurringIdVO extends BaseIdVO {
  static create(value: string): RecurringIdVO {
    if (!value || value.trim().length < 3) {
      throw new Error('Invalid recurring id');
    }
    return new RecurringIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
