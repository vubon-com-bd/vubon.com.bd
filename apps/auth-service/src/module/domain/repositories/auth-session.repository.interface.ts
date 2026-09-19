import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { AuthSessionEntity } from '../entities/auth-session.entity';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { SessionTokenVO } from '../value-objects/primitives/session-token.vo';

export interface AuthSessionRepository
  extends BaseRepository<AuthSessionEntity, string> {
  findByToken(token: SessionTokenVO): Promise<AuthSessionEntity | null>;
  findActiveByUser(userId: UserIdVO): Promise<readonly AuthSessionEntity[]>;
  revokeAllForUser(userId: UserIdVO): Promise<void>;
}
