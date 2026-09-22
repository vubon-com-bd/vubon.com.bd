import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';

export class AbandonedCartIdVO extends BaseIdVO {
  static create(value: string): AbandonedCartIdVO {
    if (!value || value.trim().length < 3) {
      throw new Error('Invalid abandoned cart id');
    }
    return new AbandonedCartIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
