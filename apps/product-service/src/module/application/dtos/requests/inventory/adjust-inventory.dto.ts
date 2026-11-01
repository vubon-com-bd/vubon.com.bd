/**
 * Adjust Inventory Request DTO
 * @module product-service/application/dtos/requests/inventory
 */
export interface AdjustInventoryRequestDTO {
  readonly inventoryId: string;
  readonly delta: number;
  readonly reason: string;
  readonly reference?: string;
  readonly actorId?: string;
  readonly actorRole?: 'admin' | 'vendor' | 'staff' | 'system';
}
