import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { RankingResultEntity } from '../entities/ranking-result.entity';
import { RankingIdVO } from '../value-objects/primitives/ranking-id.vo';

export interface RankingResultRepository
  extends BaseRepository<RankingResultEntity, RankingIdVO> {
  findByRankingId(rankingId: RankingIdVO): Promise<RankingResultEntity | null>;
}
