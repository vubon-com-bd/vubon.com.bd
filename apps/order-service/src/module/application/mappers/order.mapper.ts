/**
 * OrderMapper — Entity → Response DTO
 * @module order-service/application/mappers
 */
import type { OrderEntity } from '../../domain/entities/order.entity.js';
import type { OrderStatusValue, OrderPriorityValue } from '@vubon/shared-types/business/order';
import type {
  OrderResponseDTO,
  OrderPublicResponseDTO,
  OrderSummaryResponseDTO,
  OrderListResponseDTO,
  OrderDetailResponseDTO,
} from '../dtos/responses/order-response.dto.js';

export class OrderMapper {
  static toResponse(entity: OrderEntity): OrderResponseDTO {
    const vo = entity.vo;
    return {
      id: entity.id,
      orderNumber: vo.orderNumber.value,
      customerId: vo.customerId.value,
      status: vo.status.value as OrderStatusValue,
      priority: 'normal' as OrderPriorityValue,
      subtotal: vo.subtotal.amount,
      discountAmount: vo.discount.amount,
      taxAmount: vo.tax.amount,
      shippingAmount: vo.shipping.amount,
      total: vo.total.amount,
      currency: vo.total.currency,
      notes: vo.note?.value,
      confirmedAt: entity.confirmedAt,
      shippedAt: entity.shippedAt,
      deliveredAt: entity.deliveredAt,
      cancelledAt: entity.cancelledAt,
      completedAt: entity.completedAt,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toPublicResponse(entity: OrderEntity): OrderPublicResponseDTO {
    const vo = entity.vo;
    return {
      id: entity.id,
      orderNumber: vo.orderNumber.value,
      status: vo.status.value as OrderStatusValue,
      priority: 'normal' as OrderPriorityValue,
      total: vo.total.amount,
      currency: vo.total.currency,
      createdAt: entity.createdAt,
      shippedAt: entity.shippedAt,
      deliveredAt: entity.deliveredAt,
    };
  }

  static toSummary(entity: OrderEntity): OrderSummaryResponseDTO {
    const vo = entity.vo;
    return {
      id: entity.id,
      orderNumber: vo.orderNumber.value,
      status: vo.status.value as OrderStatusValue,
      total: vo.total.amount,
      currency: vo.total.currency,
      itemCount: entity.items.length,
      createdAt: entity.createdAt,
    };
  }

  static toListResponse(
    entities: readonly OrderEntity[],
    total: number,
    page: number,
    limit: number,
  ): OrderListResponseDTO {
    return {
      items: entities.map((e) => this.toSummary(e)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  static toDetail(entity: OrderEntity): OrderDetailResponseDTO {
    return {
      order: this.toResponse(entity),
      items: [],
    };
  }
}
