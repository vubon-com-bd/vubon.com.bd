/**
 * Reject Cancel Order DTO
 * @module order-service/application/dtos/requests/cancel
 */
import type { RejectCancelRequestSchemaType } from '@vubon/shared-schemas/business';

export type RejectCancelRequestDTO = RejectCancelRequestSchemaType;

export interface RejectCancelCommandDTO extends RejectCancelRequestDTO {
  readonly actorId?: string;
}
