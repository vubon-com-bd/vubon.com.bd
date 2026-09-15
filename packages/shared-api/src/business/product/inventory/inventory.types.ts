export interface InventoryItem {
  readonly productId: string;
  readonly variantId?: string;
  readonly available: number;
  readonly reserved: number;
  readonly warehouseId: string;
}

export interface InventoryCheckResponse {
  readonly items: readonly InventoryItem[];
  readonly allAvailable: boolean;
}
