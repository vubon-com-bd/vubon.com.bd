import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { AbandonedCartEntity } from '../entities/abandoned-cart.entity';
import { AbandonedCartIdVO } from '../value-objects/primitives/abandoned-cart-id.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface AbandonedCartRepository extends BaseRepository<AbandonedCartEntity, AbandonedCartIdVO> {
  findByUserId(userId: UserIdVO): Promise<readonly AbandonedCartEntity[]>;
  findPendingReminders(before: Date): Promise<readonly AbandonedCartEntity[]>;
}
