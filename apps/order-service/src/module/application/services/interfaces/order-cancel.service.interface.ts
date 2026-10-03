/**
 * IOrderCancelService
 */
import type { RequestCancelRequestDTO } from '../../dtos/requests/cancel/request-cancel.dto.js';
import type { ApproveCancelRequestDTO } from '../../dtos/requests/cancel/approve-cancel.dto.js';
import type { RejectCancelRequestDTO } from '../../dtos/requests/cancel/reject-cancel.dto.js';
import type { CancelResponseDTO } from '../../dtos/responses/cancel-response.dto.js';

export const ORDER_CANCEL_SERVICE = Symbol('ORDER_CANCEL_SERVICE');

export interface IOrderCancelService {
  request(dto: RequestCancelRequestDTO, actorId?: string): Promise<CancelResponseDTO>;
  approve(dto: ApproveCancelRequestDTO, actorId?: string): Promise<CancelResponseDTO>;
  reject(dto: RejectCancelRequestDTO, actorId?: string): Promise<CancelResponseDTO>;
  getById(cancelId: string): Promise<CancelResponseDTO>;
  listByOrder(orderId: string): Promise<readonly CancelResponseDTO[]>;
  getActiveByOrder(orderId: string): Promise<CancelResponseDTO | null>;
}
