/**
 * CartMapper — Entity → Response DTO
 * @module cart-service/application/mappers
 */
import type { CartEntity } from '../../domain/entities/cart.entity.js';
import type {
  CartResponseDTO,
  CartPublicResponseDTO,
  CartSummaryResponseDTO,
  CartListResponseDTO,
  CartDetailResponseDTO,
} from '../dtos/responses/cart-response.dto.js';

export class CartMapper {
  static toResponse(entity: CartEntity): CartResponseDTO {
    return {
      id: entity.id,
      userId: entity.userId?.value,
      sessionId: entity.sessionId?.value,
      type: entity.type.value,
      status: entity.status.value,
      itemCount: entity.itemCount,
      subtotal: entity.subtotal,
      discountAmount: entity.discountAmount,
      taxAmount: entity.taxAmount,
      shippingAmount: entity.shippingAmount,
      total: entity.total,
      currency: entity.currency,
      notes: entity.notes,
      expiresAt: entity.expiresAt,
      lastActivityAt: entity.lastActivityAt,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toPublicResponse(entity: CartEntity): CartPublicResponseDTO {
    return {
      id: entity.id,
      type: entity.type.value,
      status: entity.status.value,
      itemCount: entity.itemCount,
      subtotal: entity.subtotal,
      discountAmount: entity.discountAmount,
      taxAmount: entity.taxAmount,
      shippingAmount: entity.shippingAmount,
      total: entity.total,
      currency: entity.currency,
      items: [],
    };
  }

  static toSummary(entity: CartEntity): CartSummaryResponseDTO {
    return {
      id: entity.id,
      itemCount: entity.itemCount,
      total: entity.total,
      currency: entity.currency,
    };
  }

  static toListResponse(
    entities: readonly CartEntity[],
    total: number,
    page: number,
    limit: number,
  ): CartListResponseDTO {
    return {
      items: entities.map((e) => this.toSummary(e)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  static toDetail(
    entity: CartEntity,
    _items: readonly unknown[],
  ): CartDetailResponseDTO {
    return {
      cart: this.toResponse(entity),
      items: [],
    };
  }
}
