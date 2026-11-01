/**
 * Update Order Request DTO
 * @module order-service/application/dtos/requests/order
 */
import type { UpdateOrderRequestSchemaType } from '@vubon/shared-schemas/business';

export type UpdateOrderRequestDTO = UpdateOrderRequestSchemaType;

export interface UpdateOrderCommandDTO extends UpdateOrderRequestDTO {
  readonly actorId?: string;
}
