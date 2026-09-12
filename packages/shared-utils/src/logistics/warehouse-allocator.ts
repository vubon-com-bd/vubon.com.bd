export interface WarehouseData {
  warehouseId: string;
  code: string;
  isActive: boolean;
  status: string;
  usedCapacity: number;
}

export interface InventoryLocationData {
  locationId: string;
  warehouseId: string;
  productId: string;
  status: string;
  type: string;
  locationCode: string;
  quantity: { value: number; unit?: string };
  reservedQuantity: { value: number; unit?: string };
  availableQuantity: { value: number; unit?: string };
  isAvailable: boolean;
  isReserved: boolean;
  isOccupied: boolean;
  lastUpdated: Date;
  metadata: Record<string, unknown>;
}

export const allocateWarehouse = (
  warehouse: WarehouseData,
  productId: string,
  quantity: number
): InventoryLocationData => {
  return {
    locationId: crypto.randomUUID(),
    warehouseId: warehouse.warehouseId,
    productId,
    status: 'available',
    type: 'rack',
    locationCode: `${warehouse.code}-${Date.now()}`,
    quantity: { value: quantity, unit: 'unit' },
    reservedQuantity: { value: 0, unit: 'unit' },
    availableQuantity: { value: quantity, unit: 'unit' },
    isAvailable: true,
    isReserved: false,
    isOccupied: false,
    lastUpdated: new Date(),
    metadata: {},
  };
};

export const findOptimalWarehouse = (warehouses: WarehouseData[]): WarehouseData | null => {
  return (
    warehouses
      .filter((w) => w.isActive && w.status === 'active')
      .sort((a, b) => a.usedCapacity - b.usedCapacity)[0] || null
  );
};
