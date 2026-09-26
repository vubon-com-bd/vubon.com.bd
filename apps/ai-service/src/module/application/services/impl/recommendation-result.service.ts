import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { RecommendationResultServiceInterface } from '../interfaces/recommendation-result.service.interface';
import type { RecommendationResultRepository } from '../../../domain/repositories/recommendation-result.repository.interface';
import { RecommendationResultEntity } from '../../../domain/entities/recommendation-result.entity';
import { RecommendationIdVO } from '../../../domain/value-objects/primitives/recommendation-id.vo';

@Injectable()
export class RecommendationResultService
  extends BaseService<RecommendationResultEntity, RecommendationIdVO>
  implements RecommendationResultServiceInterface
{
  readonly name = 'RecommendationResultService';

  constructor(private readonly resultRepo: RecommendationResultRepository) {
    super();
  }

  async findByRecommendationId(
    recommendationId: string,
  ): Promise<RecommendationResultEntity | null> {
    return this.resultRepo.findByRecommendationId(
      RecommendationIdVO.create(recommendationId),
    );
  }
}
