/**
 * ISavedForLaterService — contract
 * @module cart-service/application/services/interfaces
 */
import type {
  SaveForLaterRequestDTO,
  MoveToCartRequestDTO,
  RemoveSavedRequestDTO,
} from '../../dtos/requests/saved/index.js';
import type {
  SavedForLaterResponseDTO,
  SavedForLaterPublicResponseDTO,
  SavedForLaterListResponseDTO,
} from '../../dtos/responses/saved-for-later-response.dto.js';
import type { CartActionResponseDTO } from '../../dtos/responses/cart-response.dto.js';

// ─── DI Token ──────────────────────────────
export const SAVED_FOR_LATER_SERVICE = Symbol('SAVED_FOR_LATER_SERVICE');

// ─── Filter / Options ─────────────────────
export interface SavedListFilterDTO {
  readonly userId?: string;
  readonly productId?: string;
  readonly status?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
}

export interface SavedListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'savedAt';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: SavedListFilterDTO;
}

// ─── Contract ─────────────────────────────
export interface ISavedForLaterService {
  save(
    dto: SaveForLaterRequestDTO,
    actorId?: string,
  ): Promise<SavedForLaterResponseDTO>;

  moveToCart(
    dto: MoveToCartRequestDTO,
    actorId?: string,
  ): Promise<CartActionResponseDTO>;

  remove(
    dto: RemoveSavedRequestDTO,
    actorId?: string,
  ): Promise<CartActionResponseDTO>;

  getById(id: string): Promise<SavedForLaterResponseDTO>;
  getPublicById(id: string): Promise<SavedForLaterPublicResponseDTO>;
  listByUser(userId: string): Promise<readonly SavedForLaterPublicResponseDTO[]>;
  list(options: SavedListOptionsDTO): Promise<SavedForLaterListResponseDTO>;
}
