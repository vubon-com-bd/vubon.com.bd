/**
 * SplitPaymentMapper — Entity → Response DTO
 * @module payment-service/application/mappers
 */
import type { SplitPaymentEntity } from '@domain/entities/split-payment.entity';
import type {
  SplitResponseDTO,
  SplitListResponseDTO,
} from '@application/dtos/responses/split-response.dto';

export class SplitPaymentMapper {
  static toResponse(e: SplitPaymentEntity): SplitResponseDTO {
    return {
      id: e.id,
      paymentId: e.paymentId.value,
      type: e.type.value,
      totalAmount: e.totalAmount,
      currency: e.currency,
      receivers: e.receivers.map((r) => ({
        receiverId: r.receiverId,
        amount: r.amount.amount,
        percentage: r.percentage?.value,
      })),
      isExecuted: e.isExecuted(),
      executedAt: e.executedAt,
      failureReason: e.failureReason,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    };
  }

  static toListResponse(
    entities: readonly SplitPaymentEntity[],
    total: number,
    page: number,
    limit: number,
  ): SplitListResponseDTO {
    return {
      items: entities.map((e) => this.toResponse(e)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
