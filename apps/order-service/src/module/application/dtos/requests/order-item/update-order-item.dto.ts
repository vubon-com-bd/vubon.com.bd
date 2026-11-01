/**
 * Update Order Item Request DTO
 * @module order-service/application/dtos/requests/order-item
 */
import type { UpdateOrderItemRequestSchemaType } from '@vubon/shared-schemas/business';

export type UpdateOrderItemRequestDTO = UpdateOrderItemRequestSchemaType;

export interface UpdateOrderItemCommandDTO extends UpdateOrderItemRequestDTO {
  readonly actorId?: string;
}
