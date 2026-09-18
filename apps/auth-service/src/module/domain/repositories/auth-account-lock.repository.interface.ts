import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { AuthAccountLockEntity } from '../entities/auth-account-lock.entity';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface AuthAccountLockRepository
  extends BaseRepository<AuthAccountLockEntity, UserIdVO> {
  findActiveByUser(userId: UserIdVO): Promise<AuthAccountLockEntity | null>;
}
