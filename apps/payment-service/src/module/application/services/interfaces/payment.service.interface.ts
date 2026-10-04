/**
 * IPaymentService — contract
 * @module payment-service/application/services/interfaces
 */
import type {
  InitiatePaymentRequestDTO,
  VerifyPaymentRequestDTO,
  CapturePaymentRequestDTO,
  FailPaymentRequestDTO,
  CancelPaymentRequestDTO,
  RetryPaymentRequestDTO,
  MarkChargebackRequestDTO,
} from '../../dtos/requests/payment/initiate-payment.dto.js';
import type {
  PaymentResponseDTO,
  PaymentPublicResponseDTO,
  PaymentInitiateResponseDTO,
  PaymentListResponseDTO,
  PaymentStatsResponseDTO,
  PaymentDetailResponseDTO,
} from '../../dtos/responses/payment-response.dto.js';

export const PAYMENT_SERVICE = Symbol('PAYMENT_SERVICE');

export interface PaymentListFilterDTO {
  readonly orderId?: string;
  readonly userId?: string;
  readonly status?: string;
  readonly method?: string;
  readonly gateway?: string;
  readonly currency?: string;
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
  /** Create a new payment intent and route to a gateway if needed. */
  initiate(
    dto: InitiatePaymentRequestDTO,
    userId: string,
    actorId?: string,
  ): Promise<PaymentInitiateResponseDTO>;

  /** Verify a gateway callback / signature. */
  verify(dto: VerifyPaymentRequestDTO, actorId?: string): Promise<PaymentResponseDTO>;

  /** Capture an authorized payment (full or partial). */
  capture(dto: CapturePaymentRequestDTO, actorId?: string): Promise<PaymentResponseDTO>;

  /** Mark payment as failed with reason. */
  fail(dto: FailPaymentRequestDTO, actorId?: string): Promise<PaymentResponseDTO>;

  /** Cancel a pending/processing/authorized payment. */
  cancel(dto: CancelPaymentRequestDTO, actorId?: string): Promise<PaymentResponseDTO>;

  /** Retry a failed/declined payment. */
  retry(dto: RetryPaymentRequestDTO, actorId?: string): Promise<PaymentResponseDTO>;

  /** Mark payment as chargeback (from gateway). */
  chargeback(dto: MarkChargebackRequestDTO, actorId?: string): Promise<PaymentResponseDTO>;

  /** Mark payment as paid (webhook confirmation). */
  markPaid(paymentId: string, actorId?: string): Promise<PaymentResponseDTO>;

  getById(paymentId: string): Promise<PaymentResponseDTO>;
  getPublic(paymentId: string): Promise<PaymentPublicResponseDTO>;
  getDetail(paymentId: string): Promise<PaymentDetailResponseDTO>;
  listByOrder(orderId: string): Promise<readonly PaymentResponseDTO[]>;
  listByUser(userId: string, options: PaymentListOptionsDTO): Promise<PaymentListResponseDTO>;
  list(options: PaymentListOptionsDTO): Promise<PaymentListResponseDTO>;
  getStats(userId?: string, gateway?: string): Promise<PaymentStatsResponseDTO>;
}
