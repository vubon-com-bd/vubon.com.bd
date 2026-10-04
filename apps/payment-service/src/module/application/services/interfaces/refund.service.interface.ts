/**
 * IRefundService — contract
 * @module payment-service/application/services/interfaces
 */
import type {
  RequestRefundRequestDTO,
  ApproveRefundRequestDTO,
  ProcessRefundRequestDTO,
  CompleteRefundRequestDTO,
  FailRefundRequestDTO,
  CancelRefundRequestDTO,
} from '../../dtos/requests/refund/refund.dto.js';
import type {
  RefundResponseDTO,
  RefundPublicResponseDTO,
  RefundRequestResponseDTO,
  RefundListResponseDTO,
} from '../../dtos/responses/refund-response.dto.js';

export const REFUND_SERVICE = Symbol('REFUND_SERVICE');

export interface RefundListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'amount' | 'status';
  readonly sortDir?: 'asc' | 'desc';
  readonly paymentId?: string;
  readonly orderId?: string;
  readonly status?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
}

export interface IRefundService {
  request(dto: RequestRefundRequestDTO, actorId?: string): Promise<RefundRequestResponseDTO>;
  approve(dto: ApproveRefundRequestDTO, actorId?: string): Promise<RefundResponseDTO>;
  process(dto: ProcessRefundRequestDTO, actorId?: string): Promise<RefundResponseDTO>;
  complete(dto: CompleteRefundRequestDTO, actorId?: string): Promise<RefundResponseDTO>;
  fail(dto: FailRefundRequestDTO, actorId?: string): Promise<RefundResponseDTO>;
  cancel(dto: CancelRefundRequestDTO, actorId?: string): Promise<RefundResponseDTO>;
  getById(refundId: string): Promise<RefundResponseDTO>;
  getPublic(refundId: string): Promise<RefundPublicResponseDTO>;
  listByPayment(paymentId: string): Promise<readonly RefundResponseDTO[]>;
  list(options: RefundListOptionsDTO): Promise<RefundListResponseDTO>;
}
