import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { RecommendationContextServiceInterface } from '../interfaces/recommendation-context.service.interface';
import type { RecommendationContextRepository } from '../../../domain/repositories/recommendation-context.repository.interface';
import { RecommendationContextEntity } from '../../../domain/entities/recommendation-context.entity';
import { RecommendationIdVO } from '../../../domain/value-objects/primitives/recommendation-id.vo';

@Injectable()
export class RecommendationContextService
  extends BaseService<RecommendationContextEntity, RecommendationIdVO>
  implements RecommendationContextServiceInterface
{
  readonly name = 'RecommendationContextService';

  constructor(private readonly contextRepo: RecommendationContextRepository) {
    super();
  }

  async findByRecommendationId(
    recommendationId: string,
  ): Promise<RecommendationContextEntity | null> {
    return this.contextRepo.findByRecommendationId(
      RecommendationIdVO.create(recommendationId),
    );
  }
}
