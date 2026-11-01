/**
 * Hold Order Request DTO
 * @module order-service/application/dtos/requests/order
 */
import type { HoldOrderRequestSchemaType } from '@vubon/shared-schemas/business';

export type HoldOrderRequestDTO = HoldOrderRequestSchemaType;

export interface HoldOrderCommandDTO extends HoldOrderRequestDTO {
  readonly actorId?: string;
}
