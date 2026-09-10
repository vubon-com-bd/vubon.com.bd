import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { ProductSchema } from '../../business/product/product.schema';
import { PRODUCT_ANALYTICS } from '@vubon/shared-constants/src/platform/analytics/product-analytics.constants';

const productAnalyticsTypeKeys = Object.keys(PRODUCT_ANALYTICS.TYPES) as [string, ...string[]];
const productAnalyticsMetricKeys = Object.keys(PRODUCT_ANALYTICS.METRICS) as [string, ...string[]];
const productAnalyticsIndicatorKeys = Object.keys(PRODUCT_ANALYTICS.PERFORMANCE_INDICATORS) as [
  string,
  ...string[],
];

export const ProductAnalyticsSchema = BaseSchema.extend({
  analyticsId: z.string().uuid(),
  productId: z.string().uuid(),
  product: ProductSchema,
  type: z.enum(productAnalyticsTypeKeys),
  metric: z.enum(productAnalyticsMetricKeys),
  value: z.number(),
  indicator: z.enum(productAnalyticsIndicatorKeys),
  timestamp: z.date(),
  metadata: z.record(z.unknown()).optional(),
});
