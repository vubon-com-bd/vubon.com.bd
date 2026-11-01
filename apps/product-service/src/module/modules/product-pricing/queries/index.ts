/**
 * ProductPricing Query Handlers Barrel
 * @module product-service/modules/product-pricing/queries
 */
import { GetPriceHandler } from '../../../application/queries/pricing/get-price.handler.js';
import { CalculatePriceHandler } from '../../../application/queries/pricing/calculate-price.handler.js';

export const PRICING_QUERY_HANDLERS = [
  GetPriceHandler,
  CalculatePriceHandler,
] as const;

export { GetPriceHandler, CalculatePriceHandler };
