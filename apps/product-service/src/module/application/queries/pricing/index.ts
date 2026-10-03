// application/queries/pricing/index.ts
export * from './get-pricing-by-product.query.js';
export * from './get-pricing-by-product.handler.js';
export * from './quote-price.query.js';
export * from './quote-price.handler.js';

import { GetPricingByProductHandler } from './get-pricing-by-product.handler.js';
import { QuotePriceHandler } from './quote-price.handler.js';

export const PRICING_QUERY_HANDLERS = [
  GetPricingByProductHandler,
  QuotePriceHandler,
] as const;
