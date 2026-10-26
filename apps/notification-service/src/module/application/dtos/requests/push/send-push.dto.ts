/**
 * Send Push Request DTO
 * @module notification-service/application/dtos/requests/push
 */
import type { SendPushRequestSchemaType } from '@vubon/shared-schemas/platform';

export type SendPushRequestDTO = SendPushRequestSchemaType;

export interface SendPushCommandDTO extends SendPushRequestDTO {
  readonly actorId?: string;
}
