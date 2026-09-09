import { BaseEntity } from '../../common/base.types';
import { Inventory } from '../../business/product/inventory.types';
import { INVENTORY_ANALYTICS } from '@vubon/shared-constants/src/platform/analytics/inventory-analytics.constants';

export interface InventoryAnalytics extends BaseEntity {
  analyticsId: string;
  inventoryId: string;
  inventory: Inventory;
  type: keyof typeof INVENTORY_ANALYTICS.TYPES | string;
  metric: keyof typeof INVENTORY_ANALYTICS.METRICS | string;
  value: number;
  status: keyof typeof INVENTORY_ANALYTICS.INVENTORY_STATUS | string;
  reorderLevel: keyof typeof INVENTORY_ANALYTICS.REORDER_LEVELS | string;
  timestamp: Date;
  metadata: Record<string, unknown>;
}
