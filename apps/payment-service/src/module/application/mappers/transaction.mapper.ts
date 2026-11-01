/**
 * TransactionMapper — Entity → Response DTO
 * @module payment-service/application/mappers
 */
import type { TransactionEntity } from '@domain/entities/transaction.entity';
import type {
  TransactionResponseDTO,
  TransactionSummaryResponseDTO,
  TransactionListResponseDTO,
} from '@application/dtos/responses/transaction-response.dto';

export class TransactionMapper {
  static toResponse(e: TransactionEntity): TransactionResponseDTO {
    return {
      id: e.id,
      paymentId: e.paymentId.value,
      type: e.type.value,
      status: e.status.value,
      amount: e.amount.amount,
      currency: e.amount.currency,
      gatewayReference: e.gatewayReference?.value,
      failureReason: e.failureReason,
      settledAt: e.settledAt,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    };
  }

  static toSummary(e: TransactionEntity): TransactionSummaryResponseDTO {
    return {
      id: e.id,
      type: e.type.value,
      status: e.status.value,
      amount: e.amount.amount,
      currency: e.amount.currency,
      createdAt: e.createdAt,
    };
  }

  static toListResponse(
    entities: readonly TransactionEntity[],
    total: number,
    page: number,
    limit: number,
  ): TransactionListResponseDTO {
    return {
      items: entities.map((e) => this.toSummary(e)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
