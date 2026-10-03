/**
 * Guest Cart Repository Interface
 * @module cart-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { GuestCartEntity } from '../entities/guest-cart.entity.js';
import { GuestCartIdVO } from '../value-objects/primitives/guest-cart-id.vo.js';
import { GuestTokenVO } from '../value-objects/primitives/guest-token.vo.js';

export const GUEST_CART_REPOSITORY = Symbol('GUEST_CART_REPOSITORY');

export interface GuestCartRepository extends BaseRepository<GuestCartEntity, string> {
  findByIdVO(id: GuestCartIdVO): Promise<GuestCartEntity | null>;
  findByToken(token: GuestTokenVO): Promise<GuestCartEntity | null>;
  findActiveByToken(token: GuestTokenVO): Promise<GuestCartEntity | null>;
  findExpired(before: string): Promise<readonly GuestCartEntity[]>;
  findMergeable(): Promise<readonly GuestCartEntity[]>;
  deleteExpired(before: string): Promise<number>;
}
