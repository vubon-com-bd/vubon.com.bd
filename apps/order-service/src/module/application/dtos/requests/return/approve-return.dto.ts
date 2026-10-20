/**
 * Approve Return Order DTO
 * @module order-service/application/dtos/requests/return
 */
import type { ApproveReturnRequestSchemaType } from '@vubon/shared-schemas/business';

export type ApproveReturnRequestDTO = ApproveReturnRequestSchemaType;

export interface ApproveReturnCommandDTO extends ApproveReturnRequestDTO {
  readonly actorId?: string;
}
