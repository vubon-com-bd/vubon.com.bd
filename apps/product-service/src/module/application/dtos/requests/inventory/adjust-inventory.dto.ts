/**
 * AdjustInventoryRequestDTO
 */
export interface AdjustInventoryRequestDTO {
  readonly inventoryId: string;
  readonly delta: number;
  readonly reason: string;
  readonly reference?: string;
  readonly adjustedBy: string;
}
