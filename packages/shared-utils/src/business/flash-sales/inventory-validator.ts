import { FLASH_SALE_INVENTORY } from '@vubon/shared-constants/src/business/flash-sales/flash-sale-inventory.constants';

export interface FlashSaleInventoryInput {
  productId: string;
  totalQuantity: number;
  availableQuantity: number;
  isSoldOut: boolean;
  status: string;
}

export const validateFlashSaleInventory = (
  inventory: Partial<FlashSaleInventoryInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!inventory.productId) errors.push('Product ID is required');
  if (inventory.totalQuantity !== undefined && inventory.totalQuantity < 0) {
    errors.push('Total quantity cannot be negative');
  }
  if (inventory.status && !Object.keys(FLASH_SALE_INVENTORY.STATUS).includes(inventory.status)) {
    errors.push('Invalid inventory status');
  }
  return { isValid: errors.length === 0, errors };
};

export const isFlashSaleInventoryAvailable = (inventory: FlashSaleInventoryInput): boolean => {
  return inventory.availableQuantity > 0 && !inventory.isSoldOut;
};
