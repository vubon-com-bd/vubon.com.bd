/**
 * TransactionMapper — Entity → Response DTO
 * @module payment-service/application/mappers
 */
import type { TransactionEntity } from '../../domain/entities/transaction.entity.js';
import type {
  TransactionResponseDTO,
  TransactionPublicResponseDTO,
  TransactionListResponseDTO,
} from '../dtos/responses/transaction-response.dto.js';

export class TransactionMapper {
  static toResponse(entity: TransactionEntity): TransactionResponseDTO {
    return {
      id: entity.id,
      paymentId: entity.paymentId.value,
      orderId: entity.orderId?.value,
      userId: entity.userId?.value,
      type: entity.type.value,
      status: entity.status.value,
      amount: entity.amount,
      currency: entity.currency,
      gateway: entity.gateway,
      gatewayTransactionId: entity.gatewayTransactionId,
      reference: entity.reference?.value,
      idempotencyKey: entity.idempotencyKey,
      errorCode: entity.errorCode?.value,
      errorMessage: entity.errorMessage?.value,
      metadata: entity.metadata,
      processedAt: entity.processedAt,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toPublicResponse(entity: TransactionEntity): TransactionPublicResponseDTO {
    return {
      id: entity.id,
      type: entity.type.value,
      status: entity.status.value,
      amount: entity.amount,
      currency: entity.currency,
      reference: entity.reference?.value,
      createdAt: entity.createdAt,
    };
  }

  static toListResponse(
    entities: readonly TransactionEntity[],
    total: number,
    page: number,
    limit: number,
  ): TransactionListResponseDTO {
    return {
      items: entities.map((e) => this.toResponse(e)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
