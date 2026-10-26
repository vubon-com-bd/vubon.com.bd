/**
 * Cancel Notification Request DTO
 * @module notification-service/application/dtos/requests/notification
 */
import type { CancelNotificationRequestSchemaType } from '@vubon/shared-schemas/platform';

export type CancelNotificationRequestDTO = CancelNotificationRequestSchemaType;

export interface CancelNotificationCommandDTO extends CancelNotificationRequestDTO {
  readonly actorId?: string;
}
