/**
 * Update Notification Preference Request DTO
 * @module notification-service/application/dtos/requests/preference
 */
import type { UpdateNotificationPreferenceRequestSchemaType } from '@vubon/shared-schemas/platform';

export type UpdatePreferenceRequestDTO = UpdateNotificationPreferenceRequestSchemaType;

export interface UpdatePreferenceCommandDTO extends UpdatePreferenceRequestDTO {
  readonly actorId?: string;
}
