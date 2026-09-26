import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { CartMergerEntity } from '../entities/cart-merger.entity';
import { CartMergerIdVO } from '../value-objects/primitives/cart-merger-id.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface CartMergerRepository extends BaseRepository<CartMergerEntity, CartMergerIdVO> {
  findByUserId(userId: UserIdVO): Promise<readonly CartMergerEntity[]>;
}
