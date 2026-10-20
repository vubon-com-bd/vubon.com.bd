/**
 * Pack Order Request DTO
 * @module order-service/application/dtos/requests/fulfillment
 */
import type { PackOrderRequestSchemaType } from '@vubon/shared-schemas/business';

export type PackOrderRequestDTO = PackOrderRequestSchemaType;

export interface PackOrderCommandDTO extends PackOrderRequestDTO {
  readonly actorId?: string;
}
