import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { SimilarityServiceInterface } from '../interfaces/similarity.service.interface';
import type { SimilarityRepository } from '../../../domain/repositories/similarity.repository.interface';
import type { VectorRepository } from '../../../domain/repositories/vector.repository.interface';
import { SimilarityEntity } from '../../../domain/entities/similarity.entity';
import { SimilarityIdVO } from '../../../domain/value-objects/primitives/similarity-id.vo';
import { SimilarityThresholdVO } from '../../../domain/value-objects/primitives/similarity-threshold.vo';
import { VectorIdVO } from '../../../domain/value-objects/primitives/vector-id.vo';
import { SimilarityResultVO } from '../../../domain/value-objects/composites/similarity-result.vo';
import { VectorSimilarityService } from '../../../domain/services/vector-similarity.service';
import { VectorNotFoundError } from '../../errors/vector.errors';
import type { ComputeSimilarityRequestDTO } from '../../dtos/requests/similarity/compute-similarity.dto';
import type { SimilarityResponseDTO } from '../../dtos/responses/similarity-response.dto';

@Injectable()
export class SimilarityService
  extends BaseService<SimilarityEntity, SimilarityIdVO>
  implements SimilarityServiceInterface
{
  readonly name = 'SimilarityService';

  constructor(
    private readonly similarityRepo: SimilarityRepository,
    private readonly vectorRepo: VectorRepository,
    private readonly similarityCalculator: VectorSimilarityService,
  ) {
    super();
  }

  async compute(input: ComputeSimilarityRequestDTO): Promise<SimilarityResponseDTO> {
    const sourceId = VectorIdVO.create(input.sourceVectorId);
    const source = await this.vectorRepo.findById(sourceId);
    if (!source) throw new VectorNotFoundError(input.sourceVectorId);

    const targets = await Promise.all(
      input.targetVectorIds.map((id) => this.vectorRepo.findById(VectorIdVO.create(id))),
    );

    const threshold = SimilarityThresholdVO.create(input.threshold);

    const matches = targets
      .filter((t): t is NonNullable<typeof t> => t !== null)
      .map((t) => ({
        vectorId: t.id.value,
        score: this.similarityCalculator.computeSimilarity(source.values, t.values, 'cosine'),
      }))
      .filter((m) => m.score >= threshold.value)
      .sort((a, b) => b.score - a.score);

    const result = SimilarityResultVO.create({
      id: SimilarityIdVO.create(crypto.randomUUID()),
      queryVectorId: input.sourceVectorId,
      matches,
      threshold: threshold.value,
    });

    const entity = SimilarityEntity.create({
      sourceVectorId: sourceId,
      targetVectorId: VectorIdVO.create(input.targetVectorIds[0]),
      metric: input.metric,
      threshold,
      result,
    });

    await this.similarityRepo.save(entity);

    return {
      id: entity.id.value,
      sourceVectorId: sourceId.value,
      metric: entity.metric,
      threshold: entity.threshold.value,
      matches: entity.result.matches.map((m) => ({
        vectorId: m.vectorId,
        score: m.score,
      })),
      computedAt: new Date().toISOString(),
    };
  }
}
