import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { AuthTokenEntity } from '../entities/auth-token.entity';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { TokenValueVO } from '../value-objects/primitives/token-value.vo';

export interface AuthTokenRepository
  extends BaseRepository<AuthTokenEntity, string> {
  findByValue(value: TokenValueVO): Promise<AuthTokenEntity | null>;
  revokeAllForUser(userId: UserIdVO): Promise<void>;
}
