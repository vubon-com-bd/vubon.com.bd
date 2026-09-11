export interface InventoryData {
  quantity: { value: number };
  reserved: number;
  sold: number;
  reorderPoint: number;
  reorderQuantity: number;
}

export const calculateAvailableStock = (inventory: InventoryData): number => {
  return inventory.quantity.value - inventory.reserved - inventory.sold;
};

export const isInStock = (inventory: InventoryData): boolean => {
  return calculateAvailableStock(inventory) > 0;
};

export const isLowStock = (inventory: InventoryData): boolean => {
  const available = calculateAvailableStock(inventory);
  return available > 0 && available <= inventory.reorderPoint;
};

export const isOutOfStock = (inventory: InventoryData): boolean => {
  return calculateAvailableStock(inventory) <= 0;
};

export const calculateReorderQuantity = (inventory: InventoryData): number => {
  const available = calculateAvailableStock(inventory);
  return Math.max(0, inventory.reorderPoint - available + inventory.reorderQuantity);
};
