/**
 * ReturnMapper — Entity → DTO
 * @module order-service/application/mappers
 */
import type { OrderReturnEntity } from '../../domain/entities/order-return.entity.js';
import type {
  ReturnResponseDTO,
  ReturnListResponseDTO,
} from '../dtos/responses/return-response.dto.js';

export class ReturnMapper {
  static toResponse(entity: OrderReturnEntity): ReturnResponseDTO {
    return {
      id: entity.id,
      orderId: entity.orderId.value,
      customerId: entity.customerId.value,
      status: entity.status.value,
      reason: entity.reason.value,
      itemIds: entity.itemIds.map((i) => i.value),
      images: [...entity.images],
      notes: entity.notes,
      refundAmount: entity.refundAmount,
      restockFee: entity.restockFee,
      netRefund: entity.netRefund(),
      currency: entity.currency,
      requestedAt: entity.requestedAt,
      approvedAt: entity.approvedAt,
      pickedUpAt: entity.pickedUpAt,
      receivedAt: entity.receivedAt,
      refundedAt: entity.refundedAt,
      closedAt: entity.closedAt,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toList(entities: readonly OrderReturnEntity[]): ReturnListResponseDTO {
    return {
      items: entities.map((e) => this.toResponse(e)),
      total: entities.length,
    };
  }
}
