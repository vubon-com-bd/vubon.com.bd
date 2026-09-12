import { BaseEntity } from '../common/base.types';
import { Quantity } from '../common/quantity.types';
import { INVENTORY_LOCATION } from '@vubon/shared-constants/src/logistics/inventory-location.constants';
import { Warehouse } from './warehouse.types';

export interface InventoryLocation extends BaseEntity {
  locationId: string;
  warehouseId: string;
  warehouse: Warehouse;
  productId: string;
  status: keyof typeof INVENTORY_LOCATION.STATUS | string;
  type: keyof typeof INVENTORY_LOCATION.TYPES | string;
  locationCode: string;
  quantity: Quantity;
  reservedQuantity: Quantity;
  availableQuantity: Quantity;
  isAvailable: boolean;
  isReserved: boolean;
  isOccupied: boolean;
  lastUpdated: Date;
  metadata: Record<string, unknown>;
}
