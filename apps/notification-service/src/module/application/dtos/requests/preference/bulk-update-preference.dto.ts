/**
 * Bulk Update Notification Preference Request DTO
 * @module notification-service/application/dtos/requests/preference
 */
import type { BulkUpdateNotificationPreferenceRequestSchemaType } from '@vubon/shared-schemas/platform';

export type BulkUpdatePreferenceRequestDTO = BulkUpdateNotificationPreferenceRequestSchemaType;

export interface BulkUpdatePreferenceCommandDTO extends BulkUpdatePreferenceRequestDTO {
  readonly actorId?: string;
}
