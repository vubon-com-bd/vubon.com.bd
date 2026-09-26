import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';

const VALID = new Set<string>([
  'free',
  'basic',
  'standard',
  'premium',
  'enterprise',
  'custom',
]);

export class SubscriptionPlanVO extends BaseTypeVO<string> {
  static create(value: string): SubscriptionPlanVO {
    if (!VALID.has(value)) {
      throw new Error(`Invalid subscription plan: ${value}`);
    }
    return new SubscriptionPlanVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
