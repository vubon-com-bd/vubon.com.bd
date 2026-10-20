/**
 * Reschedule Delivery Request DTO
 * @module order-service/application/dtos/requests/delivery
 */
import type { RescheduleDeliveryRequestSchemaType } from '@vubon/shared-schemas/business';

export type RescheduleDeliveryRequestDTO = RescheduleDeliveryRequestSchemaType;

export interface RescheduleDeliveryCommandDTO extends RescheduleDeliveryRequestDTO {
  readonly actorId?: string;
}
