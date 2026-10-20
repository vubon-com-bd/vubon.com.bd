/**
 * Delivery & DeliveryMethod Mappers
 * @module order-service/application/mappers
 */
import type { DeliveryEntity } from '../../domain/entities/delivery.entity.js';
import type { DeliveryMethodEntity } from '../../domain/entities/delivery-method.entity.js';
import type {
  DeliveryResponseDTO,
  DeliverySummaryDTO,
  DeliveryListResponseDTO,
  DeliveryMethodResponseDTO,
} from '../dtos/responses/delivery-response.dto.js';

export class DeliveryMapper {
  static toResponse(entity: DeliveryEntity): DeliveryResponseDTO {
    const vo = entity.vo;
    return {
      id: entity.id,
      orderId: vo.orderId.value,
      methodId: vo.methodId.value,
      status: vo.status.value,
      type: vo.type.value,
      trackingNumber: vo.trackingNumber?.value,
      courierId: vo.courierId,
      estimatedAt: vo.estimatedAt,
      deliveredAt: vo.deliveredAt,
      attempts: vo.attempts,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toSummary(entity: DeliveryEntity): DeliverySummaryDTO {
    const vo = entity.vo;
    return {
      id: entity.id,
      orderId: vo.orderId.value,
      status: vo.status.value,
      type: vo.type.value,
      trackingNumber: vo.trackingNumber?.value,
    };
  }

  static toListResponse(
    entities: readonly DeliveryEntity[],
    total: number,
    page: number,
    limit: number,
  ): DeliveryListResponseDTO {
    return {
      items: entities.map((e) => this.toSummary(e)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}

export class DeliveryMethodMapper {
  static toResponse(entity: DeliveryMethodEntity): DeliveryMethodResponseDTO {
    const vo = entity.vo;
    return {
      id: entity.id,
      name: vo.name,
      type: vo.type.value,
      carrier: vo.carrier,
      baseCost: vo.baseCost,
      currency: vo.currency,
      estimatedDays: vo.estimatedDays,
      isActive: vo.isActive,
    };
  }
}
