import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';

export class SubscriptionIdVO extends BaseIdVO {
  static create(value: string): SubscriptionIdVO {
    if (!value || value.trim().length < 3) {
      throw new Error('Invalid subscription id');
    }
    return new SubscriptionIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
