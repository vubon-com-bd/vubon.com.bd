import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { SessionEntity } from '../entities/session.entity';
import { SessionIdVO } from '../value-objects/primitives/session-id.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface SessionRepository extends BaseRepository<SessionEntity, SessionIdVO> {
  findByUser(userId: UserIdVO): Promise<readonly SessionEntity[]>;
  findActive(): Promise<readonly SessionEntity[]>;
  findInWindow(startMs: number, endMs: number): Promise<readonly SessionEntity[]>;
  countByUser(userId: UserIdVO): Promise<number>;
}
