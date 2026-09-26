import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { PageViewEntity } from '../entities/page-view.entity';
import { PageViewIdVO } from '../value-objects/primitives/page-view-id.vo';
import { SessionIdVO } from '../value-objects/primitives/session-id.vo';
import { PagePathVO } from '../value-objects/primitives/page-path.vo';

export interface PageViewRepository
  extends BaseRepository<PageViewEntity, PageViewIdVO> {
  findBySession(sessionId: SessionIdVO): Promise<readonly PageViewEntity[]>;
  findByPath(path: PagePathVO): Promise<readonly PageViewEntity[]>;
  countByPath(path: PagePathVO): Promise<number>;
}
