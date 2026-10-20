/**
 * Select Shipping Request DTO
 * @module order-service/application/dtos/requests/checkout
 */
import type { SelectShippingRequestSchemaType } from '@vubon/shared-schemas/business';

export type SelectShippingRequestDTO = SelectShippingRequestSchemaType;

export interface SelectShippingCommandDTO extends SelectShippingRequestDTO {
  readonly actorId?: string;
}
