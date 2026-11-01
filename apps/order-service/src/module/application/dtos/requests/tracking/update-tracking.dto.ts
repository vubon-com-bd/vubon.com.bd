/**
 * Update Tracking Request DTO
 * @module order-service/application/dtos/requests/tracking
 */
import type { UpdateTrackingRequestSchemaType } from '@vubon/shared-schemas/business';

export type UpdateTrackingRequestDTO = UpdateTrackingRequestSchemaType;

export interface UpdateTrackingCommandDTO extends UpdateTrackingRequestDTO {
  readonly actorId?: string;
}
