import { INVENTORY_LOCATION } from '@vubon/shared-constants/src/logistics/inventory-location.constants';

export interface InventoryLocationInput {
  warehouseId: string;
  productId: string;
  quantity: number;
  status: string;
}

export const validateInventoryLocation = (
  location: Partial<InventoryLocationInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!location.warehouseId) errors.push('Warehouse ID is required');
  if (!location.productId) errors.push('Product ID is required');
  if (location.quantity !== undefined && location.quantity < 0) {
    errors.push('Quantity cannot be negative');
  }
  if (location.status && !Object.keys(INVENTORY_LOCATION.STATUS).includes(location.status)) {
    errors.push('Invalid inventory location status');
  }
  return { isValid: errors.length === 0, errors };
};
