import type { CreateGuestCartRequestDTO } from '../../dtos/requests/guest/create-guest-cart.dto.js';
import type { GuestCartResponseDTO } from '../../dtos/responses/guest-cart-response.dto.js';

export const GUEST_CART_SERVICE = Symbol('GUEST_CART_SERVICE');

export interface IGuestCartService {
  create(dto: CreateGuestCartRequestDTO): Promise<GuestCartResponseDTO>;
  findByToken(token: string): Promise<GuestCartResponseDTO | null>;
  updateItemCount(id: string, count: number): Promise<void>;
  expire(id: string): Promise<void>;
}
