import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { RecommendationEntity } from '../entities/recommendation.entity';
import { RecommendationIdVO } from '../value-objects/primitives/recommendation-id.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface RecommendationRepository
  extends BaseRepository<RecommendationEntity, RecommendationIdVO> {
  findByUser(userId: UserIdVO): Promise<readonly RecommendationEntity[]>;
  findLatestByUser(userId: UserIdVO): Promise<RecommendationEntity | null>;
  findByStatus(status: string): Promise<readonly RecommendationEntity[]>;
  findConvertedByUser(userId: UserIdVO): Promise<readonly RecommendationEntity[]>;
}
