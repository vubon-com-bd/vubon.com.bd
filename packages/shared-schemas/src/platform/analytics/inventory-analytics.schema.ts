import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { InventorySchema } from '../../business/product/inventory.schema';
import { INVENTORY_ANALYTICS } from '@vubon/shared-constants/src/platform/analytics/inventory-analytics.constants';

const inventoryAnalyticsTypeKeys = Object.keys(INVENTORY_ANALYTICS.TYPES) as [string, ...string[]];
const inventoryAnalyticsMetricKeys = Object.keys(INVENTORY_ANALYTICS.METRICS) as [
  string,
  ...string[],
];
const inventoryAnalyticsStatusKeys = Object.keys(INVENTORY_ANALYTICS.INVENTORY_STATUS) as [
  string,
  ...string[],
];
const inventoryAnalyticsReorderLevelKeys = Object.keys(INVENTORY_ANALYTICS.REORDER_LEVELS) as [
  string,
  ...string[],
];

export const InventoryAnalyticsSchema = BaseSchema.extend({
  analyticsId: z.string().uuid(),
  inventoryId: z.string().uuid(),
  inventory: InventorySchema,
  type: z.enum(inventoryAnalyticsTypeKeys),
  metric: z.enum(inventoryAnalyticsMetricKeys),
  value: z.number(),
  status: z.enum(inventoryAnalyticsStatusKeys),
  reorderLevel: z.enum(inventoryAnalyticsReorderLevelKeys),
  timestamp: z.date(),
  metadata: z.record(z.unknown()).optional(),
});
