/**
 * SubscriptionPlan Value Object — vendor SaaS plan with limits
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { VENDOR_SUBSCRIPTION_PLAN, VENDOR_SUBSCRIPTION } from '@vubon/shared-constants/business';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const ALLOWED = Object.values(VENDOR_SUBSCRIPTION_PLAN) as readonly string[];

const PLAN_PRODUCT_LIMIT: Record<string, number | null> = {
  [VENDOR_SUBSCRIPTION_PLAN.FREE]: VENDOR_SUBSCRIPTION.MAX_PRODUCTS_FREE,
  [VENDOR_SUBSCRIPTION_PLAN.BASIC]: VENDOR_SUBSCRIPTION.MAX_PRODUCTS_BASIC,
  [VENDOR_SUBSCRIPTION_PLAN.STANDARD]: VENDOR_SUBSCRIPTION.MAX_PRODUCTS_STANDARD,
  [VENDOR_SUBSCRIPTION_PLAN.PREMIUM]: VENDOR_SUBSCRIPTION.MAX_PRODUCTS_PREMIUM,
  [VENDOR_SUBSCRIPTION_PLAN.ENTERPRISE]: VENDOR_SUBSCRIPTION.MAX_PRODUCTS_ENTERPRISE,
};

export class SubscriptionPlanVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  protected static allowedValues(): ReadonlySet<string> {
    return new Set(ALLOWED);
  }

  static create(raw: string): SubscriptionPlanVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new ValidationError(
        `Invalid subscription plan "${raw}". Allowed: ${ALLOWED.join(', ')}`,
        'plan',
      );
    }
    return new SubscriptionPlanVO(raw);
  }

  static reconstitute(raw: string): SubscriptionPlanVO {
    return new SubscriptionPlanVO(raw);
  }

  static free(): SubscriptionPlanVO {
    return new SubscriptionPlanVO(VENDOR_SUBSCRIPTION_PLAN.FREE);
  }

  /** null = unlimited. */
  getProductLimit(): number | null {
    const limit = PLAN_PRODUCT_LIMIT[this.value];
    return limit === undefined ? 0 : limit;
  }

  isUnlimited(): boolean {
    return this.getProductLimit() === null;
  }

  canAddProducts(currentCount: number, adding: number = 1): boolean {
    const limit = this.getProductLimit();
    if (limit === null) return true;
    return currentCount + adding <= limit;
  }

  isFree(): boolean {
    return this.value === VENDOR_SUBSCRIPTION_PLAN.FREE;
  }

  isPaid(): boolean {
    return !this.isFree();
  }

  /** Ranking for upgrades / downgrades. */
  getRank(): number {
    return ALLOWED.indexOf(this.value);
  }

  isHigherThan(other: SubscriptionPlanVO): boolean {
    return this.getRank() > other.getRank();
  }

  isLowerThan(other: SubscriptionPlanVO): boolean {
    return this.getRank() < other.getRank();
  }
}
