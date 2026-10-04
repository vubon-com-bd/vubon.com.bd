/**
 * RefundMapper — Entity → Response DTO
 * @module payment-service/application/mappers
 */
import type { RefundEntity } from '../../domain/entities/refund.entity.js';
import type {
  RefundResponseDTO,
  RefundPublicResponseDTO,
  RefundSummaryResponseDTO,
  RefundListResponseDTO,
} from '../dtos/responses/refund-response.dto.js';

export class RefundMapper {
  static toResponse(entity: RefundEntity): RefundResponseDTO {
    return {
      id: entity.id,
      paymentId: entity.paymentId.value,
      orderId: entity.orderId?.value,
      status: entity.status.value,
      amount: entity.amount,
      currency: entity.currency,
      reason: entity.reason?.value,
      gatewayRefundId: entity.gatewayRefundId,
      processedAt: entity.processedAt,
      failedAt: entity.failedAt,
      failureReason: entity.failureReason?.value,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toPublicResponse(entity: RefundEntity): RefundPublicResponseDTO {
    return {
      id: entity.id,
      status: entity.status.value,
      amount: entity.amount,
      currency: entity.currency,
      reason: entity.reason?.value,
      createdAt: entity.createdAt,
      processedAt: entity.processedAt,
    };
  }

  static toSummary(entity: RefundEntity): RefundSummaryResponseDTO {
    return {
      id: entity.id,
      paymentId: entity.paymentId.value,
      status: entity.status.value,
      amount: entity.amount,
      currency: entity.currency,
      createdAt: entity.createdAt,
    };
  }

  static toListResponse(
    entities: readonly RefundEntity[],
    total: number,
    page: number,
    limit: number,
  ): RefundListResponseDTO {
    return {
      items: entities.map((e) => this.toSummary(e)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
