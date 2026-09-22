import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { InvalidSubscriptionPlanError } from '../../errors/subscription.errors';

const VALID = new Set<string>([
  'free',
  'basic',
  'pro',
  'business',
  'enterprise',
]);

export class SubscriptionPlanVO extends BaseTypeVO {
  static create(value: string): SubscriptionPlanVO {
    if (!VALID.has(value)) {
      throw new InvalidSubscriptionPlanError(value);
    }
    return new SubscriptionPlanVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
