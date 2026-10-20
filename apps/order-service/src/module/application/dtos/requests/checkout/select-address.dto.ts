/**
 * Select Address Request DTO
 * @module order-service/application/dtos/requests/checkout
 */
import type { SelectAddressRequestSchemaType } from '@vubon/shared-schemas/business';

export type SelectAddressRequestDTO = SelectAddressRequestSchemaType;

export interface SelectAddressCommandDTO extends SelectAddressRequestDTO {
  readonly actorId?: string;
}
