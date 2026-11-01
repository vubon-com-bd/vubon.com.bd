/**
 * Complete Return Order DTO
 * @module order-service/application/dtos/requests/return
 */
import type { CompleteReturnRequestSchemaType } from '@vubon/shared-schemas/business';

export type CompleteReturnRequestDTO = CompleteReturnRequestSchemaType;

export interface CompleteReturnCommandDTO extends CompleteReturnRequestDTO {
  readonly actorId?: string;
}
