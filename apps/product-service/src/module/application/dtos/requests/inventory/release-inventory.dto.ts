/**
 * ReleaseInventoryRequestDTO
 */
export interface ReleaseInventoryRequestDTO {
  readonly inventoryId: string;
  readonly amount: number;
  readonly reason: string;
}
