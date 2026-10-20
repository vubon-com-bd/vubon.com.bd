/**
 * Remove Order Item Request DTO
 * @module order-service/application/dtos/requests/order-item
 */
import type { RemoveOrderItemRequestSchemaType } from '@vubon/shared-schemas/business';

export type RemoveOrderItemRequestDTO = RemoveOrderItemRequestSchemaType;

export interface RemoveOrderItemCommandDTO extends RemoveOrderItemRequestDTO {
  readonly actorId?: string;
}
