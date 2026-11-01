/**
 * Create Digest Request DTO
 * @module notification-service/application/dtos/requests/digest
 */
import type { CreateNotificationDigestRequestSchemaType } from '@vubon/shared-schemas/platform';

export type CreateDigestRequestDTO = CreateNotificationDigestRequestSchemaType;

export interface CreateDigestCommandDTO extends CreateDigestRequestDTO {
  readonly actorId?: string;
}
