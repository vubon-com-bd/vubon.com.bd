/**
 * ICartItemService — contract
 * @module cart-service/application/services/interfaces
 */
import type {
  AddItemRequestDTO,
  UpdateItemRequestDTO,
  RemoveItemRequestDTO,
  UpdateQuantityRequestDTO,
  SelectItemRequestDTO,
  MoveToSavedRequestDTO,
} from '../../dtos/requests/item/index.js';
import type {
  CartItemResponseDTO,
  CartItemPublicResponseDTO,
  CartItemSummaryResponseDTO,
} from '../../dtos/responses/cart-item-response.dto.js';
import type { CartActionResponseDTO } from '../../dtos/responses/cart-response.dto.js';

// ─── DI Token ──────────────────────────────
export const CART_ITEM_SERVICE = Symbol('CART_ITEM_SERVICE');

// ─── Filter / Options ─────────────────────
export interface CartItemListFilterDTO {
  readonly cartId?: string;
  readonly productId?: string;
  readonly variantId?: string;
  readonly status?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
}

export interface CartItemListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'unitPrice' | 'quantity';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: CartItemListFilterDTO;
}

export interface CartItemListResponseDTO {
  readonly items: readonly CartItemSummaryResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

// ─── Contract ─────────────────────────────
export interface ICartItemService {
  // Commands
  add(
    dto: AddItemRequestDTO,
    actorId?: string,
  ): Promise<CartItemResponseDTO>;

  update(
    dto: UpdateItemRequestDTO,
    actorId?: string,
  ): Promise<CartItemResponseDTO>;

  updateQuantity(
    dto: UpdateQuantityRequestDTO,
    actorId?: string,
  ): Promise<CartItemResponseDTO>;

  remove(
    dto: RemoveItemRequestDTO,
    actorId?: string,
  ): Promise<CartActionResponseDTO>;

  select(
    dto: SelectItemRequestDTO,
    actorId?: string,
  ): Promise<CartActionResponseDTO>;

  moveToSaved(
    dto: MoveToSavedRequestDTO,
    actorId?: string,
  ): Promise<CartActionResponseDTO>;

  // Queries
  getById(id: string): Promise<CartItemResponseDTO>;
  getPublic(id: string): Promise<CartItemPublicResponseDTO>;
  listByCart(cartId: string): Promise<readonly CartItemResponseDTO[]>;
  list(options: CartItemListOptionsDTO): Promise<CartItemListResponseDTO>;
  countByCart(cartId: string): Promise<number>;
}
