/**
 * Release Inventory Request DTO
 * @module product-service/application/dtos/requests/inventory
 */
export interface ReleaseInventoryRequestDTO {
  readonly inventoryId: string;
  readonly quantity: number;
  readonly referenceId: string;
  readonly reason?: string;
  readonly actorId?: string;
}
