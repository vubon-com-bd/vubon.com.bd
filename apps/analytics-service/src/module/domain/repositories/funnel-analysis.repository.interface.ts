/**
 * Funnel Analysis Repository Interface
 * @module analytics-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base';
import type { FunnelAnalysisEntity } from '../entities/funnel-analysis.entity.js';
import type { FunnelIdVO } from '../value-objects/primitives/funnel-id.vo.js';
import type { TimeRangeVO } from '../value-objects/composites/time-range.vo.js';

export interface FunnelAnalysisRepository extends BaseRepository<FunnelAnalysisEntity, string> {
  findByFunnelId(funnelId: FunnelIdVO): Promise<readonly FunnelAnalysisEntity[]>;
  findLatestByFunnel(funnelId: FunnelIdVO): Promise<FunnelAnalysisEntity | null>;
  findByFunnelInRange(
    funnelId: FunnelIdVO,
    range: TimeRangeVO
  ): Promise<readonly FunnelAnalysisEntity[]>;
  deleteOlderThan(cutoff: string): Promise<number>;
}
