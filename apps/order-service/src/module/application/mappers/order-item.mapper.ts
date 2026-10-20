/**
 * OrderItemMapper — Entity → Response DTO
 * @module order-service/application/mappers
 */
import type { OrderItemEntity } from '../../domain/entities/order-item.entity.js';
import type { OrderItemStatusValue } from '@vubon/shared-types/business/order';
import type {
  OrderItemResponseDTO,
  OrderItemSummaryDTO,
  OrderItemListResponseDTO,
} from '../dtos/responses/order-item-response.dto.js';

export class OrderItemMapper {
  static toResponse(entity: OrderItemEntity): OrderItemResponseDTO {
    const vo = entity.vo;
    return {
      id: entity.id,
      orderId: vo.orderId.value,
      productId: vo.productId.value,
      variantId: vo.variantId?.value,
      vendorId: vo.vendorId?.value,
      sku: vo.sku,
      name: vo.name,
      status: vo.status.value as OrderItemStatusValue,
      quantity: vo.quantity.value,
      unitPrice: vo.unitPrice.amount,
      currency: vo.unitPrice.currency,
      lineTotal: entity.lineTotal,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toSummary(entity: OrderItemEntity): OrderItemSummaryDTO {
    const vo = entity.vo;
    return {
      id: entity.id,
      productId: vo.productId.value,
      name: vo.name,
      quantity: vo.quantity.value,
      unitPrice: vo.unitPrice.amount,
      lineTotal: entity.lineTotal,
      status: vo.status.value as OrderItemStatusValue,
    };
  }

  static toListResponse(entities: readonly OrderItemEntity[]): OrderItemListResponseDTO {
    return {
      items: entities.map((e) => this.toSummary(e)),
      total: entities.length,
    };
  }
}
