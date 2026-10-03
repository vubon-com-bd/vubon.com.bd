/**
 * Pricing domain errors
 * @module product-service/domain/errors
 */
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

export class PricingNotFoundError extends NotFoundError {
  constructor(pricingId: string) {
    super('ProductPricing', pricingId);
    this.name = 'PricingNotFoundError';
  }
}

export class InvalidPriceError extends ValidationError {
  constructor(value: number, reason: string) {
    super(`Invalid price "${value}": ${reason}`, 'price');
    this.name = 'InvalidPriceError';
  }
}

export class PricingRuleConflictError extends BusinessRuleError {
  constructor(ruleId: string, reason: string) {
    super(`Pricing rule "${ruleId}" conflict: ${reason}`, 'PRICING_RULE_CONFLICT', { ruleId, reason });
    this.name = 'PricingRuleConflictError';
  }
}

export class DiscountExceededError extends BusinessRuleError {
  constructor(discount: number, max: number) {
    super(`Discount ${discount}% exceeds maximum ${max}%`, 'DISCOUNT_EXCEEDED', { discount, max });
    this.name = 'DiscountExceededError';
  }
}
