/**
 * CartItemControllerMapper
 * @module cart-service/interfaces/mappers
 */
import type {
  AddItemHttpDTO,
  UpdateItemHttpDTO,
  UpdateQuantityHttpDTO,
  SelectItemsHttpDTO,
  MoveToSavedHttpDTO,
  ListItemsHttpQueryDTO,
} from '../dtos/requests/cart-item.request.dto.js';
import type {
  CartItemHttpResponseDTO,
  CartItemPublicHttpResponseDTO,
  CartItemSummaryHttpResponseDTO,
  CartItemListHttpResponseDTO,
} from '../dtos/responses/cart-item.response.dto.js';

import type {
  AddItemRequestDTO,
  UpdateItemRequestDTO,
  UpdateQuantityRequestDTO,
  SelectItemRequestDTO,
  MoveToSavedRequestDTO,
} from '../../application/dtos/requests/item/index.js';
import type {
  CartItemListOptionsDTO,
  CartItemListResponseDTO,
} from '../../application/services/interfaces/cart-item.service.interface.js';
import type {
  CartItemResponseDTO,
  CartItemPublicResponseDTO,
  CartItemSummaryResponseDTO,
} from '../../application/dtos/responses/cart-item-response.dto.js';

export class CartItemControllerMapper {
  // ═══ HTTP → App ═══

  static toAddAppDto(
    cartId: string,
    dto: AddItemHttpDTO,
    cartType: string = 'user',
    idempotencyKey?: string,
  ): AddItemRequestDTO {
    return {
      cartId,
      productId: dto.productId,
      variantId: dto.variantId,
      quantity: dto.quantity,
      cartType: cartType as never,
      attributes: dto.attributes as never,
      idempotencyKey,
    };
  }

  static toUpdateAppDto(cartId: string, itemId: string, dto: UpdateItemHttpDTO): UpdateItemRequestDTO {
    return {
      cartId,
      itemId,
      quantity: dto.quantity,
      attributes: dto.attributes,
      note: dto.note,
    };
  }

  static toUpdateQuantityAppDto(cartId: string, itemId: string, dto: UpdateQuantityHttpDTO): UpdateQuantityRequestDTO {
    return {
      cartId,
      itemId,
      quantity: dto.quantity,
    };
  }

  static toSelectAppDto(cartId: string, dto: SelectItemsHttpDTO): SelectItemRequestDTO {
    return {
      cartId,
      itemIds: [...dto.itemIds],
      selected: dto.selected,
    };
  }

  static toMoveToSavedAppDto(cartId: string, itemId: string, dto: MoveToSavedHttpDTO): MoveToSavedRequestDTO {
    return {
      cartId,
      itemId,
      note: dto.note,
    };
  }

  static toListOptions(cartId: string, q: ListItemsHttpQueryDTO): CartItemListOptionsDTO {
    return {
      page: q.page ?? 1,
      limit: q.limit ?? 20,
      filter: {
        cartId,
        productId: q.productId,
        status: q.status,
      },
    };
  }

  // ═══ App → HTTP ═══

  static toHttpResponse(app: CartItemResponseDTO): CartItemHttpResponseDTO {
    return {
      id: app.id,
      cartId: app.cartId,
      productId: app.productId,
      variantId: app.variantId,
      quantity: app.quantity,
      status: app.status,
      unitPrice: app.unitPrice,
      currency: app.currency,
      subtotal: app.subtotal,
      note: app.note,
      addedAt: app.addedAt,
      updatedAt: app.updatedAt,
    };
  }

  static toPublicHttp(app: CartItemPublicResponseDTO): CartItemPublicHttpResponseDTO {
    return {
      id: app.id,
      productId: app.productId,
      variantId: app.variantId,
      quantity: app.quantity,
      unitPrice: app.unitPrice,
      subtotal: app.subtotal,
      currency: app.currency,
      isAvailable: app.isAvailable,
      note: app.note,
    };
  }

  static toSummaryHttp(app: CartItemSummaryResponseDTO): CartItemSummaryHttpResponseDTO {
    return {
      id: app.id,
      productId: app.productId,
      quantity: app.quantity,
      subtotal: app.subtotal,
    };
  }

  static toListHttp(app: CartItemListResponseDTO): CartItemListHttpResponseDTO {
    return {
      items: app.items.map((i) => this.toSummaryHttp(i)),
      total: app.total,
      page: app.page,
      limit: app.limit,
      totalPages: app.totalPages,
    };
  }
}
