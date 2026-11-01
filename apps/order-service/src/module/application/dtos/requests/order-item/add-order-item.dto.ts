/**
 * Add Order Item Request DTO
 * @module order-service/application/dtos/requests/order-item
 */
import type { AddOrderItemRequestSchemaType } from '@vubon/shared-schemas/business';

export type AddOrderItemRequestDTO = AddOrderItemRequestSchemaType;

export interface AddOrderItemCommandDTO extends AddOrderItemRequestDTO {
  readonly actorId?: string;
}
