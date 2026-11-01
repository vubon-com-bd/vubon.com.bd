/**
 * Fulfillment Mapper
 * @module order-service/application/mappers
 */
import type { OrderFulfillmentEntity } from '../../domain/entities/order-fulfillment.entity.js';
import type {
  FulfillmentResponseDTO,
  FulfillmentSummaryDTO,
  FulfillmentListResponseDTO,
} from '../dtos/responses/fulfillment-response.dto.js';

export class FulfillmentMapper {
  static toResponse(entity: OrderFulfillmentEntity): FulfillmentResponseDTO {
    const vo = entity.vo;
    return {
      id: entity.id,
      orderId: vo.orderId.value,
      vendorId: vo.vendorId?.value,
      status: vo.status.value,
      type: 'standard',
      itemIds: [...vo.itemIds],
      trackingNumber: vo.trackingNumber,
      courierId: vo.courierId,
      warehouseId: vo.warehouseId,
      fulfilledAt: vo.fulfilledAt,
      deliveredAt: vo.deliveredAt,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toSummary(entity: OrderFulfillmentEntity): FulfillmentSummaryDTO {
    const vo = entity.vo;
    return {
      id: entity.id,
      orderId: vo.orderId.value,
      status: vo.status.value,
      type: 'standard',
      itemCount: vo.itemIds.length,
      trackingNumber: vo.trackingNumber,
      createdAt: entity.createdAt,
    };
  }

  static toListResponse(
    entities: readonly OrderFulfillmentEntity[],
    total: number,
    page: number,
    limit: number,
  ): FulfillmentListResponseDTO {
    return {
      items: entities.map((e) => this.toSummary(e)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
