/**
 * FulfillmentMapper — Entity → DTO
 * @module order-service/application/mappers
 */
import type { OrderFulfillmentEntity } from '../../domain/entities/order-fulfillment.entity.js';
import type {
  FulfillmentResponseDTO,
  FulfillmentListResponseDTO,
} from '../dtos/responses/fulfillment-response.dto.js';

export class FulfillmentMapper {
  static toResponse(entity: OrderFulfillmentEntity): FulfillmentResponseDTO {
    return {
      id: entity.id,
      orderId: entity.orderId.value,
      vendorId: entity.vendorId?.value,
      status: entity.status.value,
      type: entity.type,
      itemIds: entity.itemIds.map((i) => i.value),
      itemCount: entity.itemCount,
      trackingNumber: entity.trackingNumber?.value,
      courierId: entity.courierId,
      warehouseId: entity.warehouseId,
      shippingCost: entity.shippingCost,
      currency: entity.currency,
      fulfilledAt: entity.fulfilledAt,
      deliveredAt: entity.deliveredAt,
      notes: entity.notes,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toList(entities: readonly OrderFulfillmentEntity[]): FulfillmentListResponseDTO {
    return {
      items: entities.map((e) => this.toResponse(e)),
      total: entities.length,
    };
  }
}
