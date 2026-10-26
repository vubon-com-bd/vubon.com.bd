/**
 * Send Digest Request DTO
 * @module notification-service/application/dtos/requests/digest
 */
import type { SendNotificationDigestRequestSchemaType } from '@vubon/shared-schemas/platform';

export type SendDigestRequestDTO = SendNotificationDigestRequestSchemaType;

export interface SendDigestCommandDTO extends SendDigestRequestDTO {
  readonly actorId?: string;
}
