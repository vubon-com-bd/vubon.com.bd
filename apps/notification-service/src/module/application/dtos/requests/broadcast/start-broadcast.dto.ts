/**
 * Start Broadcast Request DTO
 * @module notification-service/application/dtos/requests/broadcast
 */
import type { StartNotificationBroadcastRequestSchemaType } from '@vubon/shared-schemas/platform';

export type StartBroadcastRequestDTO = StartNotificationBroadcastRequestSchemaType;

export interface StartBroadcastCommandDTO extends StartBroadcastRequestDTO {
  readonly actorId?: string;
}
