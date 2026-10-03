/**
 * OrderMapper — Entity → Response DTO
 * @module order-service/application/mappers
 */
import type { OrderEntity } from '../../domain/entities/order.entity.js';
import type {
  OrderResponseDTO,
  OrderItemResponseDTO,
} from '../dtos/responses/order-response.dto.js';
import type { OrderPublicResponseDTO } from '../dtos/responses/order-public-response.dto.js';
import type {
  OrderListResponseDTO,
  OrderSummaryResponseDTO,
} from '../dtos/responses/order-list-response.dto.js';
import type { OrderDetailResponseDTO } from '../dtos/responses/order-detail-response.dto.js';
import type {
  OrderStatusValue,
  OrderPriorityValue,
} from '@vubon/shared-types/business/order';
import { OrderItemMapper } from './order-item.mapper.js';

export class OrderMapper {
  static toResponse(entity: OrderEntity): OrderResponseDTO {
    const items: OrderItemResponseDTO[] = entity.items.map((i) =>
      OrderItemMapper.toResponse(i),
    );

    return {
      id: entity.id,
      orderNumber: entity.orderNumber.value,
      customerId: entity.customerId.value,
      vendorIds: entity.vendorIds.map((v) => v.value),
      type: entity.type.value,
      status: entity.status.value as OrderStatusValue,
      priority: entity.priority.value as OrderPriorityValue,
      items,
      itemCount: entity.itemCount,
      uniqueItemCount: entity.uniqueItemCount,
      subtotal: entity.subtotal,
      discountAmount: entity.discountAmount,
      taxAmount: entity.taxAmount,
      shippingAmount: entity.shippingAmount,
      total: entity.total,
      currency: entity.currency,
      paymentId: entity.paymentId?.value,
      paymentStatus: entity.paymentStatus,
      paymentMethod: entity.paymentMethod,
      shippingMethod: entity.shippingMethod,
      trackingNumber: entity.trackingNumber,
      notes: entity.notes?.value,
      customerNotes: entity.customerNotes?.value,
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
    return {
      id: entity.id,
      orderNumber: entity.orderNumber.value,
      status: entity.status.value as OrderStatusValue,
      priority: entity.priority.value as OrderPriorityValue,
      items: entity.items.map((i) => ({
        id: i.id,
        productId: i.productId.value,
        variantId: i.variantId?.value,
        name: i.name,
        imageUrl: i.imageUrl,
        quantity: i.quantity.value,
        unitPrice: i.price.amount,
        total: i.lineTotal,
        status: i.status.value,
      })),
      subtotal: entity.subtotal,
      discountAmount: entity.discountAmount,
      taxAmount: entity.taxAmount,
      shippingAmount: entity.shippingAmount,
      total: entity.total,
      currency: entity.currency,
      trackingNumber: entity.trackingNumber,
      createdAt: entity.createdAt,
      shippedAt: entity.shippedAt,
      deliveredAt: entity.deliveredAt,
    };
  }

  static toSummary(entity: OrderEntity): OrderSummaryResponseDTO {
    return {
      id: entity.id,
      orderNumber: entity.orderNumber.value,
      status: entity.status.value,
      itemCount: entity.itemCount,
      total: entity.total,
      currency: entity.currency,
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

  static toDetail(
    entity: OrderEntity,
    extras?: {
      statusHistory?: readonly {
        fromStatus: string;
        toStatus: string;
        changedAt: string;
        changedBy?: string;
      }[];
      cancellations?: readonly unknown[];
      returns?: readonly unknown[];
      fulfillments?: readonly unknown[];
      tracking?: readonly unknown[];
    },
  ): OrderDetailResponseDTO {
    return {
      order: this.toResponse(entity),
      items: entity.items.map((i) => OrderItemMapper.toResponse(i)),
      statusHistory: extras?.statusHistory ?? [],
      cancellations: extras?.cancellations ?? [],
      returns: extras?.returns ?? [],
      fulfillments: extras?.fulfillments ?? [],
      tracking: extras?.tracking ?? [],
    };
  }
}
