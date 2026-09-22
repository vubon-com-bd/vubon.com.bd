import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';

const VALID = new Set<string>([
  'active',
  'trialing',
  'past_due',
  'paused',
  'cancelled',
  'expired',
  'incomplete',
]);

export class SubscriptionStatusVO extends BaseStatusVO<string> {
  static create(value: string): SubscriptionStatusVO {
    if (!VALID.has(value)) {
      throw new Error(`Invalid subscription status: ${value}`);
    }
    return new SubscriptionStatusVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
