import { INVENTORY } from '@vubon/shared-constants/src/business/product/inventory.constants';

export interface InventoryInput {
  quantity: number;
  status: string;
}

export const validateInventory = (
  inventory: Partial<InventoryInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (inventory.quantity === undefined) errors.push('Quantity is required');
  if (inventory.quantity !== undefined && inventory.quantity < 0) {
    errors.push('Quantity cannot be negative');
  }
  if (inventory.status && !Object.keys(INVENTORY.STATUS).includes(inventory.status)) {
    errors.push('Invalid inventory status');
  }
  return { isValid: errors.length === 0, errors };
};
