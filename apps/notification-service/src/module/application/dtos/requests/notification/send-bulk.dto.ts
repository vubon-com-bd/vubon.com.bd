/**
 * Send Bulk Notifications Request DTO
 * @module notification-service/application/dtos/requests/notification
 */
import type { SendBulkNotificationRequestSchemaType } from '@vubon/shared-schemas/platform';

export type SendBulkNotificationRequestDTO = SendBulkNotificationRequestSchemaType;

export interface SendBulkNotificationCommandDTO extends SendBulkNotificationRequestDTO {
  readonly actorId?: string;
}
