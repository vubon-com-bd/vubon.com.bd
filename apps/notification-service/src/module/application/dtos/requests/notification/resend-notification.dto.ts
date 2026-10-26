/**
 * Resend Notification Request DTO
 * @module notification-service/application/dtos/requests/notification
 */
import type { ResendNotificationRequestSchemaType } from '@vubon/shared-schemas/platform';

export type ResendNotificationRequestDTO = ResendNotificationRequestSchemaType;

export interface ResendNotificationCommandDTO extends ResendNotificationRequestDTO {
  readonly actorId?: string;
}
