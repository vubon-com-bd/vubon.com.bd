import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { AuthMfaEntity } from '../entities/auth-mfa.entity';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface AuthMfaRepository
  extends BaseRepository<AuthMfaEntity, UserIdVO> {
  findByUserId(userId: UserIdVO): Promise<AuthMfaEntity | null>;
}
