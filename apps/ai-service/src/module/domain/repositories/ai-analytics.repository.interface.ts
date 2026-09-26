import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { AiAnalyticsEntity } from '../entities/ai-analytics.entity';
import { AiAnalyticsIdVO } from '../value-objects/primitives/ai-analytics-id.vo';

export interface AiAnalyticsRepository
  extends BaseRepository<AiAnalyticsEntity, AiAnalyticsIdVO> {
  findByType(type: string): Promise<readonly AiAnalyticsEntity[]>;
  findByModelId(modelId: string): Promise<readonly AiAnalyticsEntity[]>;
  findRecentByType(type: string, limit: number): Promise<readonly AiAnalyticsEntity[]>;
}
