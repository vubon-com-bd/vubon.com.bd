/**
 * Reject Return Order DTO
 * @module order-service/application/dtos/requests/return
 */
import type { RejectReturnRequestSchemaType } from '@vubon/shared-schemas/business';

export type RejectReturnRequestDTO = RejectReturnRequestSchemaType;

export interface RejectReturnCommandDTO extends RejectReturnRequestDTO {
  readonly actorId?: string;
}
