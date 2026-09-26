import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { InsightResultEntity } from '../entities/insight-result.entity';
import { InsightIdVO } from '../value-objects/primitives/insight-id.vo';

export interface InsightResultRepository
  extends BaseRepository<InsightResultEntity, InsightIdVO> {
  findByInsightId(insightId: InsightIdVO): Promise<InsightResultEntity | null>;
  findHighConfidence(): Promise<readonly InsightResultEntity[]>;
}
