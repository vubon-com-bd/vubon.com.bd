/**
 * IOrderReturnService
 */
import type { RequestReturnRequestDTO } from '../../dtos/requests/return/request-return.dto.js';
import type { ApproveReturnRequestDTO } from '../../dtos/requests/return/approve-return.dto.js';
import type { RejectReturnRequestDTO } from '../../dtos/requests/return/reject-return.dto.js';
import type { CompleteReturnRequestDTO } from '../../dtos/requests/return/complete-return.dto.js';
import type { ReturnResponseDTO } from '../../dtos/responses/return-response.dto.js';

export const ORDER_RETURN_SERVICE = Symbol('ORDER_RETURN_SERVICE');

export interface IOrderReturnService {
  request(dto: RequestReturnRequestDTO, actorId?: string): Promise<ReturnResponseDTO>;
  approve(dto: ApproveReturnRequestDTO, actorId?: string): Promise<ReturnResponseDTO>;
  reject(dto: RejectReturnRequestDTO, actorId?: string): Promise<ReturnResponseDTO>;
  complete(dto: CompleteReturnRequestDTO, actorId?: string): Promise<ReturnResponseDTO>;
  getById(returnId: string): Promise<ReturnResponseDTO>;
  listByOrder(orderId: string): Promise<readonly ReturnResponseDTO[]>;
  listByCustomer(customerId: string): Promise<readonly ReturnResponseDTO[]>;
}
