/**
 * SubscriptionPlan Value Object
 * @module vendor-service/domain/value-objects/primitives
 *
 * Tiered subscription plan with feature limits.
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_SUBSCRIPTION_PLAN } from '@vubon/shared-constants/business';

export type SubscriptionPlanValue =
  (typeof VENDOR_SUBSCRIPTION_PLAN)[keyof typeof VENDOR_SUBSCRIPTION_PLAN];

const VALID_PLANS = new Set<string>(Object.values(VENDOR_SUBSCRIPTION_PLAN));
const PLAN_ORDER: readonly SubscriptionPlanValue[] = [
  'free',
  'basic',
  'standard',
  'premium',
  'enterprise',
];

export class SubscriptionPlanVO extends BaseTypeVO<SubscriptionPlanValue> {
  private constructor(value: SubscriptionPlanValue) {
    super(value);
  }

  protected static override allowedValues(): ReadonlySet<string> {
    return VALID_PLANS;
  }

  static create(raw: string): SubscriptionPlanVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('SubscriptionPlan must be a string', 'plan');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_PLANS.has(normalized)) {
      throw new ValidationError(
        `Invalid SubscriptionPlan: "${normalized}". Allowed: ${[...VALID_PLANS].join(', ')}`,
        'plan',
      );
    }
    return new SubscriptionPlanVO(normalized as SubscriptionPlanValue);
  }

  static reconstitute(raw: string): SubscriptionPlanVO {
    return new SubscriptionPlanVO(raw as SubscriptionPlanValue);
  }

  // ─── Predicates ───
  isFree(): boolean { return this.value === 'free'; }
  isBasic(): boolean { return this.value === 'basic'; }
  isStandard(): boolean { return this.value === 'standard'; }
  isPremium(): boolean { return this.value === 'premium'; }
  isEnterprise(): boolean { return this.value === 'enterprise'; }

  /** Paid plan */
  isPaid(): boolean {
    return !this.isFree();
  }

  /** Tier weight for comparisons */
  get weight(): number {
    return PLAN_ORDER.indexOf(this.value);
  }

  isHigherThan(other: SubscriptionPlanVO): boolean {
    return this.weight > other.weight;
  }

  isLowerThan(other: SubscriptionPlanVO): boolean {
    return this.weight < other.weight;
  }

  nextPlan(): SubscriptionPlanVO | null {
    const idx = PLAN_ORDER.indexOf(this.value);
    if (idx < 0 || idx >= PLAN_ORDER.length - 1) return null;
    return new SubscriptionPlanVO(PLAN_ORDER[idx + 1]!);
  }
}
