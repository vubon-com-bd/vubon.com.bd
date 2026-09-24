import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { FunnelAnalysisEntity } from '../entities/funnel-analysis.entity';
import { FunnelIdVO } from '../value-objects/primitives/funnel-id.vo';

export interface FunnelAnalysisRepository
  extends BaseRepository<FunnelAnalysisEntity, string> {
  findByFunnelId(funnelId: FunnelIdVO): Promise<readonly FunnelAnalysisEntity[]>;
  findLatestByFunnelId(funnelId: FunnelIdVO): Promise<FunnelAnalysisEntity | null>;
}
