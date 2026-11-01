/**
 * Add Tracking Request DTO
 * @module order-service/application/dtos/requests/tracking
 */
import type { AddTrackingRequestSchemaType } from '@vubon/shared-schemas/business';

export type AddTrackingRequestDTO = AddTrackingRequestSchemaType;

export interface AddTrackingCommandDTO extends AddTrackingRequestDTO {
  readonly actorId?: string;
}
