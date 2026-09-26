import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { RankingServiceInterface } from '../interfaces/ranking.service.interface';
import type { RankingRepository } from '../../../domain/repositories/ranking.repository.interface';
import { RankingEntity } from '../../../domain/entities/ranking.entity';
import { RankingIdVO } from '../../../domain/value-objects/primitives/ranking-id.vo';
import { RankingAlgorithmVO } from '../../../domain/value-objects/primitives/ranking-algorithm.vo';
import { RankingFeatureVO } from '../../../domain/value-objects/primitives/ranking-feature.vo';
import { RankingResultVO } from '../../../domain/value-objects/composites/ranking-result.vo';
import { ProductIdVO } from '../../../domain/value-objects/primitives/product-id.vo';
import { LearningToRankService } from '../../../domain/services/learning-to-rank.service';
import type { RankProductsRequestDTO } from '../../dtos/requests/ranking/rank-products.dto';
import type { RankingResponseDTO } from '../../dtos/responses/ranking-response.dto';

@Injectable()
export class RankingService
  extends BaseService<RankingEntity, RankingIdVO>
  implements RankingServiceInterface
{
  readonly name = 'RankingService';

  constructor(
    private readonly rankingRepo: RankingRepository,
    private readonly ltr: LearningToRankService,
  ) {
    super();
  }

  async rank(input: RankProductsRequestDTO): Promise<RankingResponseDTO> {
    const scored = this.ltr.scoreBatch(
      input.items.map((i) => ({
        documentId: i.productId,
        relevanceScore: i.relevanceScore,
        clickThroughRate: i.clickThroughRate,
        freshness: i.freshness,
        popularity: i.popularity,
      })),
    );

    const limited = input.limit ? scored.slice(0, input.limit) : scored;

    const algorithm = RankingAlgorithmVO.create(input.algorithm);

    const ranked = limited.map((item, idx) => ({
      productId: ProductIdVO.create(item.documentId),
      rank: idx + 1,
      score: item.score,
      features: {} as Readonly<Record<string, number>>,
    }));

    const result = RankingResultVO.create({
      items: ranked,
      algorithm: input.algorithm,
    });

    const entity = RankingEntity.create({
      algorithm,
      features: [],
      result,
    });

    await this.rankingRepo.save(entity);

    return {
      id: entity.id.value,
      algorithm: entity.algorithm.value,
      items: entity.result.items.map((i) => ({
        productId: i.productId.value,
        rank: i.rank,
        score: i.score,
        features: i.features,
      })),
      generatedAt: new Date().toISOString(),
    };
  }

  async trainModel(input: {
    name: string;
    algorithm: string;
    datasetId: string;
    features: readonly string[];
  }): Promise<void> {
    void input;
    // Training orchestrated via TrainingService — stub here.
  }
}
