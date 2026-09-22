import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { GuestCartEntity } from '../entities/guest-cart.entity';
import { GuestCartIdVO } from '../value-objects/primitives/guest-cart-id.vo';
import { GuestTokenVO } from '../value-objects/primitives/guest-token.vo';

export interface GuestCartRepository extends BaseRepository<GuestCartEntity, GuestCartIdVO> {
  findByToken(token: GuestTokenVO): Promise<GuestCartEntity | null>;
  findExpired(before: Date): Promise<readonly GuestCartEntity[]>;
}
