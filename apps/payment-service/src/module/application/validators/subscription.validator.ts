/**
 * SubscriptionValidator — manual business-rule validation
 * @module payment-service/application/validators
 *
 * Zod schema for subscription creation is not yet in shared-schemas;
 * falls back to inline validation with ApplicationValidationError.
 */
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';

export interface SubscriptionCreateInput {
  readonly plan: string;
  readonly price: number;
  readonly currency: string;
  readonly interval: string;
  readonly intervalCount: number;
}

const VALID_PLANS = ['free', 'basic', 'standard', 'premium', 'enterprise', 'custom'];
const VALID_INTERVALS = ['daily', 'weekly', 'biweekly', 'monthly', 'quarterly', 'yearly'];

export class SubscriptionValidator {
  static validateCreate(input: unknown): SubscriptionCreateInput {
    if (!input || typeof input !== 'object') {
      throw new ApplicationValidationError('Subscription input must be an object');
    }
    const i = input as Partial<SubscriptionCreateInput>;
    if (!i.plan || !VALID_PLANS.includes(i.plan)) {
      throw new ApplicationValidationError(
        `Invalid plan "${i.plan}". Allowed: ${VALID_PLANS.join(', ')}`,
        'plan',
      );
    }
    if (typeof i.price !== 'number' || i.price <= 0) {
      throw new ApplicationValidationError('price must be positive', 'price');
    }
    if (!i.currency || i.currency.length !== 3) {
      throw new ApplicationValidationError('currency must be 3 letters', 'currency');
    }
    if (!i.interval || !VALID_INTERVALS.includes(i.interval)) {
      throw new ApplicationValidationError(
        `Invalid interval "${i.interval}". Allowed: ${VALID_INTERVALS.join(', ')}`,
        'interval',
      );
    }
    if (
      typeof i.intervalCount !== 'number' ||
      !Number.isInteger(i.intervalCount) ||
      i.intervalCount < 1
    ) {
      throw new ApplicationValidationError('intervalCount must be a positive integer', 'intervalCount');
    }
    return {
      plan: i.plan,
      price: i.price,
      currency: i.currency.toUpperCase(),
      interval: i.interval,
      intervalCount: i.intervalCount,
    };
  }
}
