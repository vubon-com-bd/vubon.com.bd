import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { RecommendationServiceInterface } from '../interfaces/recommendation.service.interface';
import type { RecommendationRepository } from '../../../domain/repositories/recommendation.repository.interface';
import { RecommendationEntity } from '../../../domain/entities/recommendation.entity';
import { RecommendationIdVO } from '../../../domain/value-objects/primitives/recommendation-id.vo';
import { RecommendationTypeVO } from '../../../domain/value-objects/primitives/recommendation-type.vo';
import { RecommendationStrategyVO } from '../../../domain/value-objects/primitives/recommendation-strategy.vo';
import { RecommendationStatusVO } from '../../../domain/value-objects/primitives/recommendation-status.vo';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { RecommendationContextVO } from '../../../domain/value-objects/composites/recommendation-context.vo';
import { RecommendationResultVO } from '../../../domain/value-objects/composites/recommendation-result.vo';
import { RecommendationStrategyService } from '../../../domain/services/recommendation-strategy.service';
import { RecommendationNotFoundError } from '../../errors/recommendation.errors';
import type { GenerateRecommendationRequestDTO } from '../../dtos/requests/recommendation/generate-recommendation.dto';
import type { RecommendationResponseDTO } from '../../dtos/responses/recommendation-response.dto';

@Injectable()
export class RecommendationService
  extends BaseService<RecommendationEntity, RecommendationIdVO>
  implements RecommendationServiceInterface
{
  readonly name = 'RecommendationService';

  constructor(
    private readonly recommendationRepo: RecommendationRepository,
    private readonly strategyService: RecommendationStrategyService,
  ) {
    super();
  }

  async generate(input: GenerateRecommendationRequestDTO): Promise<RecommendationResponseDTO> {
    const userId = UserIdVO.create(input.userId);

    const strategy = this.strategyService.selectStrategy({
      hasHistory: true,
      hasSimilarUsers: true,
      itemCount: input.limit,
    });

    const type = RecommendationTypeVO.create(input.type);
    const status = RecommendationStatusVO.create('generated');

    const context = RecommendationContextVO.create({
      userId,
      sessionId: input.sessionId ?? null,
      deviceType: null,
      location: null,
      recentlyViewed: [],
      cartItems: [],
    });

    const result = RecommendationResultVO.create({
      items: [],
      generatedAt: new Date(),
    });

    const entity = RecommendationEntity.create({
      type,
      strategy,
      status,
      context,
      result,
    });

    await this.recommendationRepo.save(entity);
    return this.toDTO(entity);
  }

  async trackClick(recommendationId: string, userId: string, productId: string): Promise<void> {
    void userId;
    void productId;
    const entity = await this.recommendationRepo.findById(
      RecommendationIdVO.create(recommendationId),
    );
    if (!entity) throw new RecommendationNotFoundError(recommendationId);
    await this.recommendationRepo.save(entity.markClicked());
  }

  async trackConversion(
    recommendationId: string,
    userId: string,
    productId: string,
    orderId?: string,
  ): Promise<void> {
    void userId;
    void productId;
    void orderId;
    const entity = await this.recommendationRepo.findById(
      RecommendationIdVO.create(recommendationId),
    );
    if (!entity) throw new RecommendationNotFoundError(recommendationId);
    await this.recommendationRepo.save(entity.markConverted());
  }

  async submitFeedback(
    recommendationId: string,
    userId: string,
    productId: string,
    rating: number,
  ): Promise<void> {
    void userId;
    void productId;
    void rating;
    const entity = await this.recommendationRepo.findById(
      RecommendationIdVO.create(recommendationId),
    );
    if (!entity) throw new RecommendationNotFoundError(recommendationId);
  }

  private toDTO(entity: RecommendationEntity): RecommendationResponseDTO {
    return {
      id: entity.id.value,
      userId: entity.context.userId.value,
      type: entity.type.value,
      strategy: entity.strategy.value,
      status: entity.status.value,
      items: entity.result.items.map((i) => ({
        productId: i.productId.value,
        score: i.score.value,
        rank: i.rank,
        reason: i.reason,
      })),
      generatedAt: entity.result.generatedAt.toISOString(),
    };
  }
}
