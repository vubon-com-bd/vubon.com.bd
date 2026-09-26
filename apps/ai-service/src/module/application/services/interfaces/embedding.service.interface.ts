import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { EmbeddingEntity } from '../../../domain/entities/embedding.entity';
import type { EmbeddingIdVO } from '../../../domain/value-objects/primitives/embedding-id.vo';
import type { GenerateEmbeddingRequestDTO } from '../../dtos/requests/embedding/generate-embedding.dto';
import type { BatchEmbeddingRequestDTO } from '../../dtos/requests/embedding/batch-embedding.dto';
import type { EmbeddingResponseDTO, EmbeddingBatchResponseDTO } from '../../dtos/responses/embedding-response.dto';

export interface EmbeddingServiceInterface
  extends BaseServiceInterface<EmbeddingEntity, EmbeddingIdVO> {
  generate(input: GenerateEmbeddingRequestDTO): Promise<EmbeddingResponseDTO>;
  generateBatch(input: BatchEmbeddingRequestDTO): Promise<EmbeddingBatchResponseDTO>;
  delete(sourceId: string, sourceType: string): Promise<void>;
  findBySource(sourceId: string, sourceType: string): Promise<readonly EmbeddingEntity[]>;
}
