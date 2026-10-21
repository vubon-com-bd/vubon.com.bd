/**
 * PaymentMapper — Entity → Response DTO
 * @module payment-service/application/mappers
 */
import type { PaymentEntity } from '@domain/entities/payment.entity';
import type {
  PaymentResponseDTO,
  PaymentPublicResponseDTO,
  PaymentSummaryResponseDTO,
  PaymentListResponseDTO,
} from '@application/dtos/responses/payment-response.dto';

export class PaymentMapper {
  static toResponse(e: PaymentEntity): PaymentResponseDTO {
    return {
      id: e.id,
      orderId: e.orderId.value,
      userId: e.userId.value,
      status: e.status.value,
      method: e.method.method,
      gateway: e.provider?.provider,
      amount: e.amount.amount,
      currency: e.currency.value,
      gatewayReference: e.gatewayReference?.value,
      refundedAmount: e.refundedAmount || undefined,
      failureReason: e.failureReason,
      failureCode: e.failureCode,
      authorizedAt: e.authorizedAt,
      capturedAt: e.capturedAt,
      paidAt: e.paidAt,
      metadata: e.metadata,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    };
  }

  static toPublicResponse(e: PaymentEntity): PaymentPublicResponseDTO {
    return {
      id: e.id,
      orderId: e.orderId.value,
      status: e.status.value,
      method: e.method.method,
      amount: e.amount.amount,
      currency: e.currency.value,
      refundedAmount: e.refundedAmount || undefined,
      createdAt: e.createdAt,
      capturedAt: e.capturedAt,
    };
  }

  static toSummary(e: PaymentEntity): PaymentSummaryResponseDTO {
    return {
      id: e.id,
      orderId: e.orderId.value,
      status: e.status.value,
      amount: e.amount.amount,
      currency: e.currency.value,
      createdAt: e.createdAt,
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
}
