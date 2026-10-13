/**
 * Pricing Application Errors
 * @module product-service/application/errors
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors';
import { CommandError } from '@vubon/shared-kernel/application/errors';
import { QueryError } from '@vubon/shared-kernel/application/errors';

export class PricingNotFoundApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.PRODUCT_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(productId: string) {
    super(`Pricing for product "${productId}" not found`, { productId });
    this.name = 'PricingNotFoundApplicationError';
  }
}

export class PricingValidationError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(message, field);
    this.name = 'PricingValidationError';
  }
}

export class PriceUpdateError extends CommandError {
  constructor(productId: string, reason: string) {
    super(`Price update for "${productId}" failed: ${reason}`, 'UpdatePrice');
    this.name = 'PriceUpdateError';
  }
}

export class PricingRuleCreateError extends CommandError {
  constructor(reason: string) {
    super(`Pricing rule creation failed: ${reason}`, 'CreatePricingRule');
    this.name = 'PricingRuleCreateError';
  }
}

export class PriceBelowCostApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 422;

  constructor(newPrice: number, costPrice: number) {
    super(`New price ${newPrice} is below cost ${costPrice}`, { newPrice, costPrice });
    this.name = 'PriceBelowCostApplicationError';
  }
}

export class PricingQueryError extends QueryError {
  constructor(reason: string) {
    super(`Pricing query failed: ${reason}`, 'PricingQuery');
    this.name = 'PricingQueryError';
  }
}
