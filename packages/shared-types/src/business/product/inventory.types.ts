import { BaseEntity } from '../../common/base.types';
import { Quantity } from '../../common/quantity.types';
import { INVENTORY } from '@vubon/shared-constants/src/business/product/inventory.constants';
import { Product } from './product.types';
import { Variant } from './variant.types';

export interface Inventory extends BaseEntity {
  inventoryId: string;
  productId: string;
  product: Product;
  variantId?: string;
  variant?: Variant;
  quantity: Quantity;
  reserved: number;
  sold: number;
  returned: number;
  damaged: number;
  status: keyof typeof INVENTORY.STATUS | string;
  type: keyof typeof INVENTORY.TYPES | string;
  reorderPoint: number;
  reorderQuantity: number;
  warehouseId: string;
  warehouseLocation: string;
  isInStock: boolean;
  isLowStock: boolean;
  isOutOfStock: boolean;
  lastRestockedAt?: Date;
  metadata: Record<string, unknown>;
}
