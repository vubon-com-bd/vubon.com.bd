/**
 * Ship Order Request DTO
 * @module order-service/application/dtos/requests/fulfillment
 */
import type { ShipOrderRequestSchemaType } from '@vubon/shared-schemas/business';

export type ShipOrderRequestDTO = ShipOrderRequestSchemaType;

export interface ShipOrderCommandDTO extends ShipOrderRequestDTO {
  readonly actorId?: string;
  readonly shippedBy?: string;
}
