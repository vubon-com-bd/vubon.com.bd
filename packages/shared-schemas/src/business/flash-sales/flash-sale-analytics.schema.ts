import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { FLASH_SALE_ANALYTICS } from '@vubon/shared-constants/src/business/flash-sales/flash-sale-analytics.constants';

const analyticsTypeKeys = Object.keys(FLASH_SALE_ANALYTICS.TYPES) as [string, ...string[]];
const analyticsMetricKeys = Object.keys(FLASH_SALE_ANALYTICS.METRICS) as [string, ...string[]];
const analyticsFrameKeys = Object.keys(FLASH_SALE_ANALYTICS.ANALYTICS_TIME_FRAMES) as [
  string,
  ...string[],
];

export const FlashSaleAnalyticsSchema = BaseSchema.extend({
  analyticsId: z.string().uuid(),
  flashSaleId: z.string().uuid(),
  type: z.enum(analyticsTypeKeys),
  metric: z.enum(analyticsMetricKeys),
  value: z.number(),
  period: z.enum(analyticsFrameKeys),
  timestamp: z.date(),
  metadata: z.record(z.unknown()).optional(),
});
