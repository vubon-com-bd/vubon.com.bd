/**
 * Release Order Request DTO
 * @module order-service/application/dtos/requests/order
 */
import type { ReleaseOrderRequestSchemaType } from '@vubon/shared-schemas/business';

export type ReleaseOrderRequestDTO = ReleaseOrderRequestSchemaType;

export interface ReleaseOrderCommandDTO extends ReleaseOrderRequestDTO {
  readonly actorId?: string;
}
