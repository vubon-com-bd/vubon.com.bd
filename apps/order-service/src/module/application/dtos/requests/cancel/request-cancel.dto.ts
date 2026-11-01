/**
 * Request Cancel Order DTO
 * @module order-service/application/dtos/requests/cancel
 */
import type { RequestCancelRequestSchemaType } from '@vubon/shared-schemas/business';

export type RequestCancelRequestDTO = RequestCancelRequestSchemaType;

export interface RequestCancelCommandDTO extends RequestCancelRequestDTO {
  readonly actorId?: string;
  readonly idempotencyKey?: string;
}
