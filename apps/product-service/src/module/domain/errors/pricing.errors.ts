/**
 * Pricing Domain Errors
 * @module product-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class InvalidPricingTypeError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid pricing type "${value}". Allowed: ${allowed.join(', ')}`, 'pricingType');
    this.name = 'InvalidPricingTypeError';
  }
}

export class InvalidDiscountError extends ValidationError {
  constructor(reason: string) {
    super(`Invalid discount: ${reason}`, 'discount');
    this.name = 'InvalidDiscountError';
  }
}

export class PriceNegativeError extends ValidationError {
  constructor(amount: number) {
    super(`Price cannot be negative (got ${amount})`, 'price');
    this.name = 'PriceNegativeError';
  }
}

export class DiscountExceedsPriceError extends BusinessRuleError {
  constructor(price: number, discount: number) {
    super(
      `Discount ${discount} cannot exceed price ${price}`,
      'DISCOUNT_EXCEEDS_PRICE',
      { price, discount },
    );
    this.name = 'DiscountExceedsPriceError';
  }
}

export class PricingRuleInactiveError extends BusinessRuleError {
  constructor(ruleId: string) {
    super(`Pricing rule "${ruleId}" is inactive`, 'PRICING_RULE_INACTIVE', { ruleId });
    this.name = 'PricingRuleInactiveError';
  }
}
