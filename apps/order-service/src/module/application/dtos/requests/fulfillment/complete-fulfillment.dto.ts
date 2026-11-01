/**
 * Complete Fulfillment Request DTO
 * @module order-service/application/dtos/requests/fulfillment
 */
import type { CompleteFulfillmentRequestSchemaType } from '@vubon/shared-schemas/business';

export type CompleteFulfillmentRequestDTO = CompleteFulfillmentRequestSchemaType;

export interface CompleteFulfillmentCommandDTO extends CompleteFulfillmentRequestDTO {
  readonly actorId?: string;
}
