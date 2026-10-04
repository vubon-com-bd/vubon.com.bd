/**
 * ReserveInventoryRequestDTO
 */
export interface ReserveInventoryRequestDTO {
  readonly inventoryId: string;
  readonly amount: number;
  readonly reference: string;
}
