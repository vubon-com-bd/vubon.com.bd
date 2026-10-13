/**
 * Reserve Inventory Request DTO
 * @module product-service/application/dtos/requests/inventory
 */
export interface ReserveInventoryRequestDTO {
  readonly inventoryId: string;
  readonly quantity: number;
  readonly referenceId: string;
  readonly referenceType?: 'order' | 'cart' | 'manual';
  readonly expiresInMinutes?: number;
  readonly actorId?: string;
}
