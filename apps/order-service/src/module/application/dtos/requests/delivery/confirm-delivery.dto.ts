/**
 * Confirm Delivery Request DTO
 * @module order-service/application/dtos/requests/delivery
 */
import type { ConfirmDeliveryRequestSchemaType } from '@vubon/shared-schemas/business';

export type ConfirmDeliveryRequestDTO = ConfirmDeliveryRequestSchemaType;

export interface ConfirmDeliveryCommandDTO extends ConfirmDeliveryRequestDTO {
  readonly actorId?: string;
}
