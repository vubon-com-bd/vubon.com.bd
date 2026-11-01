/**
 * Cancel Mapper
 * @module order-service/application/mappers
 */
import type { OrderCancelEntity } from '../../domain/entities/order-cancel.entity.js';
import type {
  CancelResponseDTO,
  CancelSummaryDTO,
  CancelListResponseDTO,
} from '../dtos/responses/cancel-response.dto.js';

export class CancelMapper {
  static toResponse(entity: OrderCancelEntity): CancelResponseDTO {
    const vo = entity.vo;
    return {
      id: entity.id,
      orderId: vo.orderId.value,
      reason: vo.reason.value,
      status: vo.status.value,
      requestedBy: vo.requestedBy,
      approvedBy: vo.approvedBy,
      notes: vo.notes,
      requestedAt: vo.requestedAt,
      processedAt: vo.processedAt,
    };
  }

  static toSummary(entity: OrderCancelEntity): CancelSummaryDTO {
    const vo = entity.vo;
    return {
      id: entity.id,
      orderId: vo.orderId.value,
      status: vo.status.value,
      reason: vo.reason.value,
      requestedAt: vo.requestedAt,
    };
  }

  static toListResponse(
    entities: readonly OrderCancelEntity[],
    total: number,
    page: number,
    limit: number,
  ): CancelListResponseDTO {
    return {
      items: entities.map((e) => this.toSummary(e)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
