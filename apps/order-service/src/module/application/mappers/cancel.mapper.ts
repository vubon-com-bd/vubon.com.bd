/**
 * CancelMapper — Entity → DTO
 * @module order-service/application/mappers
 */
import type { OrderCancelEntity } from '../../domain/entities/order-cancel.entity.js';
import type {
  CancelResponseDTO,
  CancelListResponseDTO,
} from '../dtos/responses/cancel-response.dto.js';

export class CancelMapper {
  static toResponse(entity: OrderCancelEntity): CancelResponseDTO {
    return {
      id: entity.id,
      orderId: entity.orderId.value,
      reason: entity.reason.value,
      status: entity.status.value,
      requestedBy: entity.requestedBy.value,
      approvedBy: entity.approvedBy?.value,
      notes: entity.notes,
      refundAmount: entity.refundAmount,
      currency: entity.currency,
      restockInventory: entity.restockInventory,
      requestedAt: entity.requestedAt,
      processedAt: entity.processedAt,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toList(entities: readonly OrderCancelEntity[]): CancelListResponseDTO {
    return {
      items: entities.map((e) => this.toResponse(e)),
      total: entities.length,
    };
  }
}
