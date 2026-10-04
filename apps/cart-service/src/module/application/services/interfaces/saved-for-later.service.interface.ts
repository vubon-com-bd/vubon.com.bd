import type { SaveForLaterRequestDTO } from '../../dtos/requests/saved/save-for-later.dto.js';
import type { MoveToCartRequestDTO } from '../../dtos/requests/saved/move-to-cart.dto.js';
import type { RemoveSavedRequestDTO } from '../../dtos/requests/saved/remove-saved.dto.js';
import type {
  SavedForLaterResponseDTO,
  SavedListResponseDTO,
} from '../../dtos/responses/saved-for-later-response.dto.js';

export const SAVED_FOR_LATER_SERVICE = Symbol('SAVED_FOR_LATER_SERVICE');

export interface ISavedForLaterService {
  save(dto: SaveForLaterRequestDTO): Promise<SavedForLaterResponseDTO>;
  moveToCart(dto: MoveToCartRequestDTO): Promise<void>;
  remove(dto: RemoveSavedRequestDTO): Promise<void>;
  listByUser(userId: string, page?: number, limit?: number): Promise<SavedListResponseDTO>;
}
