/**
 * Mark Notification as Read Request DTO
 * @module notification-service/application/dtos/requests/in-app
 */
import type {
  MarkNotificationReadRequestSchemaType,
  MarkNotificationUnreadRequestSchemaType,
} from '@vubon/shared-schemas/platform';

export type MarkNotificationReadRequestDTO = MarkNotificationReadRequestSchemaType;
export type MarkNotificationUnreadRequestDTO = MarkNotificationUnreadRequestSchemaType;

export interface MarkNotificationReadCommandDTO extends MarkNotificationReadRequestDTO {
  readonly actorId?: string;
}
