/**
 * Request Return Order DTO
 * @module order-service/application/dtos/requests/return
 */
import type { RequestReturnRequestSchemaType } from '@vubon/shared-schemas/business';

export type RequestReturnRequestDTO = RequestReturnRequestSchemaType;

export interface RequestReturnCommandDTO extends RequestReturnRequestDTO {
  readonly actorId?: string;
  readonly idempotencyKey?: string;
}
