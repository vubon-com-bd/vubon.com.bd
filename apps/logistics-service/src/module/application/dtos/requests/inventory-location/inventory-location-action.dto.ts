export interface InventoryLocationActionRequestDTO {
  readonly inventoryLocationId: string;
}
export interface DeactivateInventoryLocationRequestDTO {
  readonly inventoryLocationId: string;
  readonly reason?: string;
}
export interface QuarantineInventoryLocationRequestDTO {
  readonly inventoryLocationId: string;
  readonly reason: string;
}
export interface ArchiveInventoryLocationRequestDTO {
  readonly inventoryLocationId: string;
  readonly reason?: string;
}
export interface AddInventoryStockRequestDTO {
  readonly inventoryLocationId: string;
  readonly weightKg: number;
  readonly volumeM3?: number;
}
export interface RemoveInventoryStockRequestDTO {
  readonly inventoryLocationId: string;
  readonly weightKg: number;
  readonly volumeM3?: number;
}
