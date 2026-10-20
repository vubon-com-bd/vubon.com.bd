/**
 * Start Fulfillment Request DTO
 * @module order-service/application/dtos/requests/fulfillment
 */
import type { StartFulfillmentRequestSchemaType } from '@vubon/shared-schemas/business';

export type StartFulfillmentRequestDTO = StartFulfillmentRequestSchemaType;

export interface StartFulfillmentCommandDTO extends StartFulfillmentRequestDTO {
  readonly actorId?: string;
}
