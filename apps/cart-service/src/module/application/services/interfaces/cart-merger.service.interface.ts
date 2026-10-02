import type { MergeGuestCartRequestDTO } from '../../dtos/requests/guest/merge-guest-cart.dto.js';
import type { MergeResponseDTO } from '../../dtos/responses/merge-response.dto.js';

export const CART_MERGER_SERVICE = Symbol('CART_MERGER_SERVICE');

export interface ICartMergerService {
  mergeGuestCart(dto: MergeGuestCartRequestDTO): Promise<MergeResponseDTO>;
  getById(id: string): Promise<MergeResponseDTO | null>;
}
