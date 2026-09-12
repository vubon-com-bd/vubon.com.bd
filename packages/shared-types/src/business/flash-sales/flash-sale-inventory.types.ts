import { BaseEntity } from '../../common/base.types';
import { Quantity } from '../../common/quantity.types';
import { FLASH_SALE_INVENTORY } from '@vubon/shared-constants/src/business/flash-sales/flash-sale-inventory.constants';
import { Product } from '../product/product.types';
import { FlashSale } from './flash-sale.types';

export interface FlashSaleInventory extends BaseEntity {
  inventoryId: string;
  flashSaleId: string;
  flashSale: FlashSale;
  productId: string;
  product: Product;
  status: keyof typeof FLASH_SALE_INVENTORY.STATUS | string;
  type: keyof typeof FLASH_SALE_INVENTORY.INVENTORY_TYPES | string;
  totalQuantity: Quantity;
  reservedQuantity: Quantity;
  soldQuantity: Quantity;
  availableQuantity: Quantity;
  isAvailable: boolean;
  isReserved: boolean;
  isSoldOut: boolean;
  lastUpdated: Date;
  metadata: Record<string, unknown>;
}
