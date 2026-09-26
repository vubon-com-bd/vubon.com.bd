import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { RankingEntity } from '../entities/ranking.entity';
import { RankingIdVO } from '../value-objects/primitives/ranking-id.vo';

export interface RankingRepository
  extends BaseRepository<RankingEntity, RankingIdVO> {
  findByAlgorithm(algorithm: string): Promise<readonly RankingEntity[]>;
  findAllRecent(limit: number): Promise<readonly RankingEntity[]>;
}
