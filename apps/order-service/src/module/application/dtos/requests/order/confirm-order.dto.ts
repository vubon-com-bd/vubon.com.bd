/**
 * Confirm Order Request DTO
 * @module order-service/application/dtos/requests/order
 */
import type { ConfirmOrderStatusRequestSchemaType } from '@vubon/shared-schemas/business';

export type ConfirmOrderRequestDTO = ConfirmOrderStatusRequestSchemaType;

export interface ConfirmOrderCommandDTO extends ConfirmOrderRequestDTO {
  readonly actorId?: string;
  readonly confirmedBy?: string;
}
