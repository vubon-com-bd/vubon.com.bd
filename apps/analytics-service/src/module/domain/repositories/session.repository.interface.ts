/**
 * Session Repository Interface
 * @module analytics-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base';
import type { SessionEntity } from '../entities/session.entity.js';
import type { SessionIdVO } from '../value-objects/primitives/session-id.vo.js';
import type { UserIdVO } from '../value-objects/primitives/user-id.vo.js';
import type { TimeRangeVO } from '../value-objects/composites/time-range.vo.js';

export interface SessionRepository extends BaseRepository<SessionEntity, string> {
  findBySessionId(id: SessionIdVO): Promise<SessionEntity | null>;
  findByUser(userId: UserIdVO): Promise<readonly SessionEntity[]>;
  findActiveByUser(userId: UserIdVO): Promise<SessionEntity | null>;
  findByUserInRange(
    userId: UserIdVO,
    range: TimeRangeVO
  ): Promise<readonly SessionEntity[]>;
  findStaleActive(thresholdIso: string): Promise<readonly SessionEntity[]>;
  countByUser(userId: UserIdVO): Promise<number>;
  deleteOlderThan(cutoff: string): Promise<number>;
}
