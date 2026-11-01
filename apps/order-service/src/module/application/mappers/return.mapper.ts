/**
 * Return Mapper
 * @module order-service/application/mappers
 */
import type { OrderReturnEntity } from '../../domain/entities/order-return.entity.js';
import type {
  ReturnResponseDTO,
  ReturnSummaryDTO,
  ReturnListResponseDTO,
} from '../dtos/responses/return-response.dto.js';

export class ReturnMapper {
  static toResponse(entity: OrderReturnEntity): ReturnResponseDTO {
    const vo = entity.vo;
    return {
      id: entity.id,
      orderId: vo.orderId.value,
      customerId: vo.customerId.value,
      status: vo.status.value,
      reason: vo.reason.value,
      itemIds: [...vo.itemIds],
      notes: vo.notes,
      currency: 'BDT',
      requestedAt: vo.requestedAt,
    };
  }

  static toSummary(entity: OrderReturnEntity): ReturnSummaryDTO {
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
    entities: readonly OrderReturnEntity[],
    total: number,
    page: number,
    limit: number,
  ): ReturnListResponseDTO {
    return {
      items: entities.map((e) => this.toSummary(e)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
