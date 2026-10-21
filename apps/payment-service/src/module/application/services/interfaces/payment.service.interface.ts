/**
 * IPaymentService — contract
 * @module payment-service/application/services/interfaces
 */
import type {
  InitiatePaymentRequestDTO,
  ConfirmPaymentRequestDTO,
  CancelPaymentRequestDTO,
  RetryPaymentRequestDTO,
  VerifyPaymentRequestDTO,
} from '@application/dtos/requests/payment/index.js';
import type {
  PaymentResponseDTO,
  PaymentPublicResponseDTO,
  PaymentListResponseDTO,
  PaymentStatsResponseDTO,
  PaymentInitiateResponseDTO,
} from '@application/dtos/responses/payment-response.dto.js';
import type { PaymentStatusValue } from '@domain/primitives/payment-status.vo';

export const PAYMENT_SERVICE = Symbol('PAYMENT_SERVICE');

export interface PaymentListFilterDTO {
  readonly orderId?: string;
  readonly userId?: string;
  readonly status?: PaymentStatusValue;
  readonly method?: string;
  readonly gateway?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
  readonly minAmount?: number;
  readonly maxAmount?: number;
  readonly search?: string;
}

export interface PaymentListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'amount' | 'status';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: PaymentListFilterDTO;
}

export interface IPaymentService {
  // Commands
  initiate(dto: InitiatePaymentRequestDTO, userId: string): Promise<PaymentInitiateResponseDTO>;
  confirm(dto: ConfirmPaymentRequestDTO, actorId?: string): Promise<PaymentResponseDTO>;
  cancel(dto: CancelPaymentRequestDTO, actorId?: string): Promise<PaymentResponseDTO>;
  retry(dto: RetryPaymentRequestDTO, actorId?: string): Promise<PaymentResponseDTO>;
  verify(dto: VerifyPaymentRequestDTO, userId: string): Promise<PaymentResponseDTO>;

  // Queries
  getById(id: string): Promise<PaymentResponseDTO>;
  getPublic(id: string): Promise<PaymentPublicResponseDTO>;
  list(options: PaymentListOptionsDTO): Promise<PaymentListResponseDTO>;
  getStats(userId?: string): Promise<PaymentStatsResponseDTO>;
}
