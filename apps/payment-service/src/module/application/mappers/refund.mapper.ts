/**
 * RefundMapper — Entity → Response DTO
 * @module payment-service/application/mappers
 */
import type { RefundEntity } from '@domain/entities/refund.entity';
import type {
  RefundResponseDTO,
  RefundSummaryResponseDTO,
  RefundListResponseDTO,
} from '@application/dtos/responses/refund-response.dto';

export class RefundMapper {
  static toResponse(e: RefundEntity): RefundResponseDTO {
    return {
      id: e.id,
      paymentId: e.paymentId.value,
      status: e.status.value,
      amount: e.amount.amount,
      currency: e.amount.currency,
      reason: e.reason.reason,
      note: e.reason.note,
      approvedBy: e.approvedBy,
      completedAt: e.completedAt,
      failureReason: e.failureReason,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    };
  }

  static toSummary(e: RefundEntity): RefundSummaryResponseDTO {
    return {
      id: e.id,
      status: e.status.value,
      amount: e.amount.amount,
      currency: e.amount.currency,
      createdAt: e.createdAt,
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
