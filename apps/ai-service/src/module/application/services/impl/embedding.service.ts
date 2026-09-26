import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { EmbeddingServiceInterface } from '../interfaces/embedding.service.interface';
import type { EmbeddingRepository } from '../../../domain/repositories/embedding.repository.interface';
import { EmbeddingEntity } from '../../../domain/entities/embedding.entity';
import { EmbeddingIdVO } from '../../../domain/value-objects/primitives/embedding-id.vo';
import { EmbeddingTypeVO } from '../../../domain/value-objects/primitives/embedding-type.vo';
import { EmbeddingModelVO } from '../../../domain/value-objects/primitives/embedding-model.vo';
import { EmbeddingDimensionVO } from '../../../domain/value-objects/primitives/embedding-dimension.vo';
import { EmbeddingStatusVO } from '../../../domain/value-objects/primitives/embedding-status.vo';
import { EmbeddingGeneratorService } from '../../../domain/services/embedding-generator.service';
import { TokenCounterService } from '../../../domain/services/token-counter.service';
import {
  EmbeddingFailedError,
  BatchTooLargeError,
} from '../../errors/embedding.errors';
import type { GenerateEmbeddingRequestDTO } from '../../dtos/requests/embedding/generate-embedding.dto';
import type { BatchEmbeddingRequestDTO } from '../../dtos/requests/embedding/batch-embedding.dto';
import type {
  EmbeddingResponseDTO,
  EmbeddingBatchResponseDTO,
} from '../../dtos/responses/embedding-response.dto';

const DEFAULT_DIMENSION = 1536;
const DEFAULT_MODEL = 'text-embedding-3-small';
const MAX_BATCH = 2048;

@Injectable()
export class EmbeddingService
  extends BaseService<EmbeddingEntity, EmbeddingIdVO>
  implements EmbeddingServiceInterface
{
  readonly name = 'EmbeddingService';

  constructor(
    private readonly embeddingRepo: EmbeddingRepository,
    private readonly generator: EmbeddingGeneratorService,
    private readonly tokenCounter: TokenCounterService,
  ) {
    super();
  }

  async generate(input: GenerateEmbeddingRequestDTO): Promise<EmbeddingResponseDTO> {
    const dimValue = typeof input.dimension === 'number' ? input.dimension : DEFAULT_DIMENSION;
    const dimension = EmbeddingDimensionVO.create(dimValue);
    const model = EmbeddingModelVO.create(DEFAULT_MODEL);

    const tokens = this.tokenCounter.estimate(input.content);
    if (tokens > 8191) {
      throw new EmbeddingFailedError(input.sourceId, 'input exceeds token limit');
    }

    const rawVector = new Array(dimension.value).fill(0).map(() => Math.random() - 0.5);
    const generated = this.generator.build(
      { sourceId: input.sourceId, sourceType: input.sourceType, content: input.content },
      rawVector,
      model,
      dimension,
    );

    const typeValue = typeof input.type === 'string' ? input.type : 'text';

    const entity = EmbeddingEntity.create({
      sourceId: input.sourceId,
      sourceType: input.sourceType,
      type: EmbeddingTypeVO.create(typeValue),
      model,
      dimension,
      status: EmbeddingStatusVO.create('generated'),
      vector: generated.vector,
    });

    await this.embeddingRepo.save(entity);
    return this.toDTO(entity);
  }

  async generateBatch(input: BatchEmbeddingRequestDTO): Promise<EmbeddingBatchResponseDTO> {
    if (input.items.length > MAX_BATCH) {
      throw new BatchTooLargeError(input.items.length, MAX_BATCH);
    }

    const embeddings: EmbeddingResponseDTO[] = [];
    let failed = 0;

    for (const item of input.items) {
      try {
        const result = await this.generate({
          sourceId: item.sourceId,
          sourceType: item.sourceType,
          content: item.content,
          type: 'text',
          dimension: DEFAULT_DIMENSION,
        });
        embeddings.push(result);
      } catch {
        failed++;
      }
    }

    return {
      success: true,
      total: input.items.length,
      generated: embeddings.length,
      failed,
      embeddings,
    };
  }

  async delete(sourceId: string, sourceType: string): Promise<void> {
    const existing = await this.embeddingRepo.findBySource(sourceId, sourceType);
    for (const e of existing) {
      await this.embeddingRepo.delete(e.id);
    }
  }

  async findBySource(sourceId: string, sourceType: string): Promise<readonly EmbeddingEntity[]> {
    return this.embeddingRepo.findBySource(sourceId, sourceType);
  }

  private toDTO(entity: EmbeddingEntity): EmbeddingResponseDTO {
    return {
      id: entity.id.value,
      sourceId: entity.sourceId,
      sourceType: entity.sourceType,
      type: entity.type.value,
      model: entity.model.value,
      dimension: entity.dimension.value,
      status: entity.status.value,
      createdAt: entity.createdAt,
    };
  }
}
