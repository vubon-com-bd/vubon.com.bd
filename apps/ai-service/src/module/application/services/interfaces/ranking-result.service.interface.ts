import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { RankingResultEntity } from '../../../domain/entities/ranking-result.entity';
import type { RankingIdVO } from '../../../domain/value-objects/primitives/ranking-id.vo';

export interface RankingResultServiceInterface
  extends BaseServiceInterface<RankingResultEntity, RankingIdVO> {
  findByRankingId(rankingId: string): Promise<RankingResultEntity | null>;
}
