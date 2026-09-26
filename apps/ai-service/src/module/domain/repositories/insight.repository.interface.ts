import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { InsightEntity } from '../entities/insight.entity';
import { InsightIdVO } from '../value-objects/primitives/insight-id.vo';

export interface InsightRepository
  extends BaseRepository<InsightEntity, InsightIdVO> {
  findByType(type: string): Promise<readonly InsightEntity[]>;
  findByPriority(priority: string): Promise<readonly InsightEntity[]>;
  findByTarget(target: string): Promise<readonly InsightEntity[]>;
  findActive(): Promise<readonly InsightEntity[]>;
  findHighConfidence(): Promise<readonly InsightEntity[]>;
}
