import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { SavedForLaterEntity } from '../entities/saved-for-later.entity';
import { SavedItemIdVO } from '../value-objects/primitives/saved-item-id.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface SavedForLaterRepository extends BaseRepository<SavedForLaterEntity, SavedItemIdVO> {
  findByUserId(userId: UserIdVO): Promise<readonly SavedForLaterEntity[]>;
  findActiveByUser(userId: UserIdVO): Promise<readonly SavedForLaterEntity[]>;
}
