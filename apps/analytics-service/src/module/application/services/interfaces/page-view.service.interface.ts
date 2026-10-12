/**
 * Page View Service Interface
 * @module analytics-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services';
import type { PageViewEntity } from '../../../domain/entities/page-view.entity.js';

export interface IPageViewService extends BaseServiceInterface<PageViewEntity, string> {
  findBySession(sessionId: string): Promise<readonly PageViewEntity[]>;
  findByPath(path: string, limit: number): Promise<readonly PageViewEntity[]>;
  findTopPages(limit: number): Promise<readonly { path: string; count: number }[]>;
  bulkInsert(entities: readonly PageViewEntity[]): Promise<number>;
}
