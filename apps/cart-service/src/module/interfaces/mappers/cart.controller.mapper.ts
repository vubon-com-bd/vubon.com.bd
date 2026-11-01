/**
 * CartControllerMapper — HTTP DTO ↔ App DTO
 * @module cart-service/interfaces/mappers
 */
import type {
  CreateCartHttpDTO,
  UpdateCartHttpDTO,
  ListCartsHttpQueryDTO,
} from '../dtos/requests/cart.request.dto.js';
import type {
  CartHttpResponseDTO,
  CartPublicHttpResponseDTO,
  CartSummaryHttpResponseDTO,
  CartListHttpResponseDTO,
  CartStatsHttpResponseDTO,
  CartDetailHttpResponseDTO,
  CartInitiateHttpResponseDTO,
  CartActionHttpResponseDTO,
} from '../dtos/responses/cart.response.dto.js';

import type {
  CreateCartRequestDTO,
  UpdateCartRequestDTO,
} from '../../application/dtos/requests/cart/index.js';
import type { CartListOptionsDTO } from '../../application/services/interfaces/cart.service.interface.js';
import type {
  CartResponseDTO,
  CartPublicResponseDTO,
  CartSummaryResponseDTO,
  CartListResponseDTO,
  CartStatsResponseDTO,
  CartDetailResponseDTO,
  CartInitiateResponseDTO,
  CartActionResponseDTO,
} from '../../application/dtos/responses/cart-response.dto.js';

export class CartControllerMapper {
  // ═══ HTTP → App ═══

  static toCreateAppDto(dto: CreateCartHttpDTO): CreateCartRequestDTO {
    return {
      type: (dto.type ?? 'user') as never,
      currency: dto.currency ?? 'BDT',
      sessionId: dto.sessionId,
      notes: dto.notes,
    } as CreateCartRequestDTO;
  }

  static toUpdateAppDto(cartId: string, dto: UpdateCartHttpDTO): UpdateCartRequestDTO {
    return {
      cartId,
      notes: dto.notes,
    };
  }

  static toListOptions(q: ListCartsHttpQueryDTO): CartListOptionsDTO {
    return {
      page: q.page ?? 1,
      limit: q.limit ?? 20,
      sortBy: (q.sortBy as never) ?? 'createdAt',
      sortDir: (q.sortDir as never) ?? 'desc',
      filter: {
        status: q.status,
        type: q.type,
        currency: q.currency,
        fromDate: q.fromDate,
        toDate: q.toDate,
        search: q.search,
      },
    };
  }

  // ═══ App → HTTP ═══

  static toHttpResponse(app: CartResponseDTO): CartHttpResponseDTO {
    return {
      id: app.id,
      userId: app.userId,
      sessionId: app.sessionId,
      type: app.type,
      status: app.status,
      itemCount: app.itemCount,
      subtotal: app.subtotal,
      discountAmount: app.discountAmount,
      taxAmount: app.taxAmount,
      shippingAmount: app.shippingAmount,
      total: app.total,
      currency: app.currency,
      couponId: app.couponId,
      voucherId: app.voucherId,
      notes: app.notes,
      expiresAt: app.expiresAt,
      lastActivityAt: app.lastActivityAt,
      createdAt: app.createdAt,
      updatedAt: app.updatedAt,
    };
  }

  static toPublicHttp(app: CartPublicResponseDTO): CartPublicHttpResponseDTO {
    return {
      id: app.id,
      type: app.type,
      status: app.status,
      itemCount: app.itemCount,
      subtotal: app.subtotal,
      discountAmount: app.discountAmount,
      taxAmount: app.taxAmount,
      shippingAmount: app.shippingAmount,
      total: app.total,
      currency: app.currency,
      items: app.items.map((item) => ({
        id: item.id,
        productId: item.productId,
        variantId: item.variantId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        subtotal: item.unitPrice * item.quantity,
        currency: item.currency,
        isAvailable: true,
        note: item.note,
      })),
    };
  }

  static toInitiateHttp(app: CartInitiateResponseDTO): CartInitiateHttpResponseDTO {
    return {
      success: true,
      cartId: app.cartId,
      type: app.type,
      status: app.status,
      createdAt: app.createdAt,
    };
  }

  static toSummaryHttp(app: CartSummaryResponseDTO): CartSummaryHttpResponseDTO {
    return {
      id: app.id,
      itemCount: app.itemCount,
      total: app.total,
      currency: app.currency,
    };
  }

  static toListHttp(app: CartListResponseDTO): CartListHttpResponseDTO {
    return {
      items: app.items.map((i) => this.toSummaryHttp(i)),
      total: app.total,
      page: app.page,
      limit: app.limit,
      totalPages: app.totalPages,
    };
  }

  static toStatsHttp(app: CartStatsResponseDTO): CartStatsHttpResponseDTO {
    return {
      total: app.total,
      totalValue: app.totalValue,
      averageValue: app.averageValue,
      averageItemCount: app.averageItemCount,
      currency: app.currency,
      byStatus: app.byStatus,
      byType: app.byType,
    };
  }

  static toDetailHttp(app: CartDetailResponseDTO): CartDetailHttpResponseDTO {
    return {
      cart: this.toHttpResponse(app.cart),
      items: app.items.map((item) => ({
        id: item.id,
        productId: item.productId,
        variantId: item.variantId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        subtotal: item.unitPrice * item.quantity,
        currency: item.currency,
        isAvailable: true,
        note: item.note,
      })),
    };
  }

  static toActionHttp(app: CartActionResponseDTO): CartActionHttpResponseDTO {
    return {
      success: true,
      cartId: app.cartId,
      message: app.message,
      at: app.at,
    };
  }
}
