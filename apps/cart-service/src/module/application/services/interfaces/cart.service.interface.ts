/**
 * ICartService — contract
 * @module cart-service/application/services/interfaces
 */
import type {
  CreateCartRequestDTO,
  UpdateCartRequestDTO,
  ClearCartRequestDTO,
  DeleteCartRequestDTO,
  RecoverCartRequestDTO,
} from '../../dtos/requests/cart/index.js';
import type {
  CartResponseDTO,
  CartPublicResponseDTO,
  CartSummaryResponseDTO,
  CartListResponseDTO,
  CartDetailResponseDTO,
  CartCountResponseDTO,
  CartStatsResponseDTO,
  CartInitiateResponseDTO,
  CartActionResponseDTO,
} from '../../dtos/responses/cart-response.dto.js';

// ─── DI Token ──────────────────────────────
export const CART_SERVICE = Symbol('CART_SERVICE');

// ─── Filter / Options ─────────────────────
export interface CartListFilterDTO {
  readonly userId?: string;
  readonly sessionId?: string;
  readonly status?: string;
  readonly type?: string;
  readonly currency?: string;
  readonly minTotal?: number;
  readonly maxTotal?: number;
  readonly fromDate?: string;
  readonly toDate?: string;
  readonly search?: string;
}

export interface CartListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'total' | 'itemCount';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: CartListFilterDTO;
}

// ─── Contract ─────────────────────────────
export interface ICartService {
  // Commands
  create(
    dto: CreateCartRequestDTO,
    userId?: string,
    actorId?: string,
  ): Promise<CartInitiateResponseDTO>;

  update(
    dto: UpdateCartRequestDTO,
    actorId?: string,
  ): Promise<CartResponseDTO>;

  clear(
    dto: ClearCartRequestDTO,
    actorId?: string,
  ): Promise<CartActionResponseDTO>;

  delete(
    dto: DeleteCartRequestDTO,
    actorId?: string,
  ): Promise<CartActionResponseDTO>;

  recover(
    dto: RecoverCartRequestDTO,
    actorId?: string,
  ): Promise<CartResponseDTO>;

  // Queries
  getById(id: string): Promise<CartResponseDTO>;
  getPublic(id: string): Promise<CartPublicResponseDTO>;
  getDetail(id: string): Promise<CartDetailResponseDTO>;
  getSummary(id: string): Promise<CartSummaryResponseDTO>;
  getByUserId(userId: string): Promise<CartResponseDTO | null>;
  list(options: CartListOptionsDTO): Promise<CartListResponseDTO>;
  count(filter?: CartListFilterDTO): Promise<CartCountResponseDTO>;
  getStats(filter?: CartListFilterDTO): Promise<CartStatsResponseDTO>;
}
