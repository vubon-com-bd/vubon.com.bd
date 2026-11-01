/**
 * Cancel Broadcast Request DTO
 * @module notification-service/application/dtos/requests/broadcast
 */
import type { CancelNotificationBroadcastRequestSchemaType } from '@vubon/shared-schemas/platform';

export type CancelBroadcastRequestDTO = CancelNotificationBroadcastRequestSchemaType;

export interface CancelBroadcastCommandDTO extends CancelBroadcastRequestDTO {
  readonly actorId?: string;
}
