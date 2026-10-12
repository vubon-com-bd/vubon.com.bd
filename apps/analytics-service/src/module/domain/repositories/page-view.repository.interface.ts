/**
 * Page View Repository Interface
 * @module analytics-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base';
import type { PageViewEntity } from '../entities/page-view.entity.js';
import type { SessionIdVO } from '../value-objects/primitives/session-id.vo.js';
import type { PageViewIdVO } from '../value-objects/primitives/page-view-id.vo.js';
import type { UserIdVO } from '../value-objects/primitives/user-id.vo.js';
import type { PagePathVO } from '../value-objects/primitives/page-path.vo.js';
import type { TimeRangeVO } from '../value-objects/composites/time-range.vo.js';

export interface PageViewRepository extends BaseRepository<PageViewEntity, string> {
  findByPageViewId(id: PageViewIdVO): Promise<PageViewEntity | null>;
  findBySession(sessionId: SessionIdVO): Promise<readonly PageViewEntity[]>;
  findByUser(userId: UserIdVO): Promise<readonly PageViewEntity[]>;
  findByPath(path: PagePathVO): Promise<readonly PageViewEntity[]>;
  findByPathInRange(path: PagePathVO, range: TimeRangeVO): Promise<readonly PageViewEntity[]>;
  countByPathInRange(path: PagePathVO, range: TimeRangeVO): Promise<number>;
  findTopPages(range: TimeRangeVO, limit: number): Promise<readonly { path: string; count: number }[]>;
  bulkInsert(pageViews: readonly PageViewEntity[]): Promise<number>;
  deleteOlderThan(cutoff: string): Promise<number>;
}
