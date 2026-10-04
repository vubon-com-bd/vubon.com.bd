/**
 * PaymentMapper — Entity → Response DTO
 * @module payment-service/application/mappers
 */
import type { PaymentEntity } from '../../domain/entities/payment.entity.js';
import type { TransactionEntity } from '../../domain/entities/transaction.entity.js';
import type { PaymentStatusValue } from '@vubon/shared-types/business/payment';
import type {
  PaymentResponseDTO,
  PaymentPublicResponseDTO,
  PaymentSummaryResponseDTO,
  PaymentListResponseDTO,
  PaymentDetailResponseDTO,
  PaymentTransactionSummaryDTO,
} from '../dtos/responses/payment-response.dto.js';

export class PaymentMapper {
  static toResponse(entity: PaymentEntity): PaymentResponseDTO {
    return {
      id: entity.id,
      orderId: entity.orderId.value,
      userId: entity.userId.value,
      type: entity.type.value,
      status: entity.status.value as PaymentStatusValue,
      method: entity.method.value,
      gateway: entity.gateway?.value,
      amount: entity.amount,
      currency: entity.currency,
      gatewayPaymentId: entity.gatewayPaymentId?.value,
      idempotencyKey: entity.idempotencyKey?.value,
      refundedAmount: entity.refundedAmount,
      refundableRemaining: entity.refundableRemaining,
      retryAttempts: entity.retryAttempts,
      authorizedAt: entity.authorizedAt,
      capturedAt: entity.capturedAt,
      failedAt: entity.failedAt,
      cancelledAt: entity.cancelledAt,
      expiredAt: entity.expiredAt,
      failureReason: entity.failureReason?.value,
      failureCode: entity.failureCode?.value,
      metadata: entity.metadata,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toPublicResponse(entity: PaymentEntity): PaymentPublicResponseDTO {
    return {
      id: entity.id,
      orderId: entity.orderId.value,
      status: entity.status.value as PaymentStatusValue,
      method: entity.method.value,
      gateway: entity.gateway?.value,
      amount: entity.amount,
      currency: entity.currency,
      refundedAmount: entity.refundedAmount,
      createdAt: entity.createdAt,
      capturedAt: entity.capturedAt,
    };
  }

  static toSummary(entity: PaymentEntity): PaymentSummaryResponseDTO {
    return {
      id: entity.id,
      orderId: entity.orderId.value,
      status: entity.status.value,
      amount: entity.amount,
      currency: entity.currency,
      createdAt: entity.createdAt,
    };
  }

  static toListResponse(
    entities: readonly PaymentEntity[],
    total: number,
    page: number,
    limit: number,
  ): PaymentListResponseDTO {
    return {
      items: entities.map((e) => this.toSummary(e)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  static toTransactionSummary(tx: TransactionEntity): PaymentTransactionSummaryDTO {
    return {
      id: tx.id,
      type: tx.type.value,
      status: tx.status.value,
      amount: tx.amount,
      currency: tx.currency,
      reference: tx.reference?.value,
      createdAt: tx.createdAt,
    };
  }

  static toDetail(
    entity: PaymentEntity,
    transactions: readonly TransactionEntity[],
  ): PaymentDetailResponseDTO {
    return {
      payment: this.toResponse(entity),
      transactions: transactions.map((t) => this.toTransactionSummary(t)),
    };
  }
}
