/**
 * Create Broadcast Request DTO
 * @module notification-service/application/dtos/requests/broadcast
 */
import type { CreateNotificationBroadcastRequestSchemaType } from '@vubon/shared-schemas/platform';

export type CreateBroadcastRequestDTO = CreateNotificationBroadcastRequestSchemaType;

export interface CreateBroadcastCommandDTO extends CreateBroadcastRequestDTO {
  readonly actorId?: string;
}
