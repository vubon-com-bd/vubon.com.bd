/**
 * Unsubscribe Request DTO
 * @module notification-service/application/dtos/requests/preference
 */
import type { UnsubscribeRequestSchemaType } from '@vubon/shared-schemas/platform';

export type UnsubscribeRequestDTO = UnsubscribeRequestSchemaType;

export interface UnsubscribeCommandDTO extends UnsubscribeRequestDTO {
  readonly actorId?: string;
}
