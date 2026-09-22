import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';
import { InvalidSubscriptionIdError } from '../../errors/subscription.errors';

export class SubscriptionIdVO extends BaseIdVO {
  static create(value: string): SubscriptionIdVO {
    if (!value || value.trim().length === 0) {
      throw new InvalidSubscriptionIdError(value);
    }
    return new SubscriptionIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
