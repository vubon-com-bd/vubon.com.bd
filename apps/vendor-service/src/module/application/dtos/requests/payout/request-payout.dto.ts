/**
 * Request Payout Request DTO
 * @module vendor-service/application/dtos/requests/payout
 *
 * Shape derives from RequestPayoutRequestSchema in shared-schemas.
 */
import type { RequestPayoutRequestSchemaType } from '@vubon/shared-schemas/business/vendor';

export type RequestPayoutRequestDTO = RequestPayoutRequestSchemaType;

export interface RequestPayoutCommandDTO extends RequestPayoutRequestDTO {
  readonly idempotencyKey?: string;
  readonly actorId?: string;
}
