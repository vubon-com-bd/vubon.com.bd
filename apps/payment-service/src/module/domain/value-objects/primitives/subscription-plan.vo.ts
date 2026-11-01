/**
 * SubscriptionPlan Value Object
 * @module payment-service/domain/value-objects/primitives
 *
 * Plan: free | basic | standard | premium | enterprise | custom
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export type SubscriptionPlanValue =
  | 'free'
  | 'basic'
  | 'standard'
  | 'premium'
  | 'enterprise'
  | 'custom';

const VALID_PLANS: readonly string[] = [
  'free',
  'basic',
  'standard',
  'premium',
  'enterprise',
  'custom',
];

export class SubscriptionPlanVO extends BaseVO<SubscriptionPlanValue> {
  private constructor(value: SubscriptionPlanValue) {
    super(value);
  }

  static create(raw: string): SubscriptionPlanVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('SubscriptionPlan must be a string', 'plan');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_PLANS.includes(normalized)) {
      throw new ValidationError(
        `Invalid SubscriptionPlan "${normalized}". Allowed: ${VALID_PLANS.join(', ')}`,
        'plan',
      );
    }
    return new SubscriptionPlanVO(normalized as SubscriptionPlanValue);
  }

  static reconstitute(raw: SubscriptionPlanValue): SubscriptionPlanVO {
    return new SubscriptionPlanVO(raw);
  }

  isFree(): boolean { return this.value === 'free'; }
  isPremium(): boolean { return this.value === 'premium'; }
  isEnterprise(): boolean { return this.value === 'enterprise'; }
  isCustom(): boolean { return this.value === 'custom'; }

  isPaid(): boolean {
    return !this.isFree();
  }

  isHighTier(): boolean {
    return this.isPremium() || this.isEnterprise();
  }
}
