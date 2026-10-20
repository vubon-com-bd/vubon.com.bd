/**
 * Create Order Request DTO
 * @module order-service/application/dtos/requests/order
 *
 * Shape derives from CreateOrderRequestSchema in shared-schemas/business/order.
 */
import type { CreateOrderRequestSchemaType } from '@vubon/shared-schemas/business';

export type CreateOrderRequestDTO = CreateOrderRequestSchemaType;

export interface CreateOrderCommandDTO extends CreateOrderRequestDTO {
  readonly actorId?: string;
  readonly idempotencyKey?: string;
}
