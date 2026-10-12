/**
 * Page View Service Implementation
 */
import { BaseService } from '@vubon/shared-kernel/application/services';
import type { PageViewEntity } from '../../../domain/entities/page-view.entity.js';
import type { PageViewRepository } from '../../../domain/repositories/page-view.repository.interface.js';
import { SessionIdVO } from '../../../domain/value-objects/primitives/session-id.vo.js';
import { PagePathVO } from '../../../domain/value-objects/primitives/page-path.vo.js';
import type { IPageViewService } from '../interfaces/page-view.service.interface.js';

export class PageViewService extends BaseService<PageViewEntity, string> implements IPageViewService {
  readonly name = 'PageViewService';

  constructor(private readonly repository: PageViewRepository) {
    super();
  }

  async findBySession(sessionId: string): Promise<readonly PageViewEntity[]> {
    return this.repository.findBySession(SessionIdVO.create(sessionId));
  }

  async findByPath(path: string, limit: number): Promise<readonly PageViewEntity[]> {
    const entities = await this.repository.findByPath(PagePathVO.create(path));
    return entities.slice(0, limit);
  }

  async findTopPages(limit: number): Promise<readonly { path: string; count: number }[]> {
    const now = Date.now();
    const { EventTimestampVO } = await import('../../../domain/value-objects/primitives/event-timestamp.vo.js');
    const { TimeRangeVO } = await import('../../../domain/value-objects/composites/time-range.vo.js');
    const range = TimeRangeVO.create({
      startAt: EventTimestampVO.fromEpochMs(now - 7 * 86400000),
      endAt: EventTimestampVO.now(),
    });
    return this.repository.findTopPages(range, limit);
  }

  async bulkInsert(entities: readonly PageViewEntity[]): Promise<number> {
    return this.repository.bulkInsert(entities);
  }
}
