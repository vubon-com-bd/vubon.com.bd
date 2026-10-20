/**
 * Delete Order Request DTO
 * @module order-service/application/dtos/requests/order
 */
import type { DeleteOrderRequestSchemaType } from '@vubon/shared-schemas/business';

export type DeleteOrderRequestDTO = DeleteOrderRequestSchemaType;

export interface DeleteOrderCommandDTO extends DeleteOrderRequestDTO {
  readonly actorId?: string;
  readonly deletedBy?: string;
}
