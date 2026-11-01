/**
 * IRefundService — contract
 * @module payment-service/application/services/interfaces
 */
import type {
  RequestRefundRequestDTO,
  ApproveRefundRequestDTO,
  RejectRefundRequestDTO,
  PartialRefundRequestDTO,
} from '@application/dtos/requests/refund/index.js';
import type {
  RefundResponseDTO,
  RefundListResponseDTO,
  RefundStatsResponseDTO,
  RefundInitiateResponseDTO,
} from '@application/dtos/responses/refund-response.dto.js';

export const REFUND_SERVICE = Symbol('REFUND_SERVICE');

export interface RefundListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'amount' | 'status';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: {
    readonly paymentId?: string;
    readonly status?: string;
    readonly fromDate?: string;
    readonly toDate?: string;
  };
}

export interface IRefundService {
  request(dto: RequestRefundRequestDTO, actorId?: string): Promise<RefundInitiateResponseDTO>;
  approve(dto: ApproveRefundRequestDTO, approvedBy: string): Promise<RefundResponseDTO>;
  reject(dto: RejectRefundRequestDTO, rejectedBy: string): Promise<RefundResponseDTO>;
  partial(dto: PartialRefundRequestDTO, actorId?: string): Promise<RefundResponseDTO>;

  getById(id: string): Promise<RefundResponseDTO>;
  listByPayment(paymentId: string): Promise<readonly RefundResponseDTO[]>;
  list(options: RefundListOptionsDTO): Promise<RefundListResponseDTO>;
  getStats(paymentId?: string): Promise<RefundStatsResponseDTO>;
}
