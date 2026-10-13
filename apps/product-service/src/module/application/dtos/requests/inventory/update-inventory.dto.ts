/**
 * Update Inventory Request DTO
 * @module product-service/application/dtos/requests/inventory
 */
import type {
  UpdateInventoryRequestSchemaType,
  SetInventoryRequestSchemaType,
} from '@vubon/shared-schemas/business';

export type UpdateInventoryRequestDTO = UpdateInventoryRequestSchemaType;
export type SetInventoryRequestDTO = SetInventoryRequestSchemaType;

export interface UpdateInventoryCommandDTO extends UpdateInventoryRequestDTO {
  readonly actorId?: string;
}
