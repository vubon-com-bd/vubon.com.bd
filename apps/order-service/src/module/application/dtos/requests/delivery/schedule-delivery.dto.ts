/**
 * Schedule Delivery Request DTO
 * @module order-service/application/dtos/requests/delivery
 */
import type { ScheduleDeliveryRequestSchemaType } from '@vubon/shared-schemas/business';

export type ScheduleDeliveryRequestDTO = ScheduleDeliveryRequestSchemaType;

export interface ScheduleDeliveryCommandDTO extends ScheduleDeliveryRequestDTO {
  readonly actorId?: string;
}
