/**
 * Approve Cancel Order DTO
 * @module order-service/application/dtos/requests/cancel
 */
import type { ApproveCancelRequestSchemaType } from '@vubon/shared-schemas/business';

export type ApproveCancelRequestDTO = ApproveCancelRequestSchemaType;

export interface ApproveCancelCommandDTO extends ApproveCancelRequestDTO {
  readonly actorId?: string;
}
