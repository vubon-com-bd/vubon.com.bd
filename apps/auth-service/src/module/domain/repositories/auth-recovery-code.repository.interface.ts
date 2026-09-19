import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { AuthRecoveryCodeEntity } from '../entities/auth-recovery-code.entity';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface AuthRecoveryCodeRepository
  extends BaseRepository<AuthRecoveryCodeEntity, string> {
  findByUserId(userId: UserIdVO): Promise<readonly AuthRecoveryCodeEntity[]>;
  markUsed(id: string): Promise<void>;
  deleteAllForUser(userId: UserIdVO): Promise<void>;
}
