/**
 * IGuestCartService — contract
 * @module cart-service/application/services/interfaces
 */
import type {
  CreateGuestCartRequestDTO,
  MergeGuestCartRequestDTO,
} from '../../dtos/requests/guest/index.js';
import type {
  GuestCartResponseDTO,
  GuestCartPublicResponseDTO,
  GuestCartInitiateResponseDTO,
} from '../../dtos/responses/guest-cart-response.dto.js';
import type { MergeResponseDTO } from '../../dtos/responses/merge-response.dto.js';

// ─── DI Token ──────────────────────────────
export const GUEST_CART_SERVICE = Symbol('GUEST_CART_SERVICE');

// ─── Contract ─────────────────────────────
export interface IGuestCartService {
  create(
    dto: CreateGuestCartRequestDTO,
    actorId?: string,
  ): Promise<GuestCartInitiateResponseDTO>;

  merge(
    dto: MergeGuestCartRequestDTO,
    actorId?: string,
  ): Promise<MergeResponseDTO>;

  getById(id: string): Promise<GuestCartResponseDTO>;
  getPublicById(id: string): Promise<GuestCartPublicResponseDTO>;
  findByToken(token: string): Promise<GuestCartPublicResponseDTO | null>;

  expire(
    id: string,
    actorId?: string,
  ): Promise<GuestCartResponseDTO>;

  abandon(
    id: string,
    actorId?: string,
  ): Promise<GuestCartResponseDTO>;
}
