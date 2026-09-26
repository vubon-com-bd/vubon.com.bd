import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { EmbeddingBatchServiceInterface } from '../interfaces/embedding-batch.service.interface';
import type { EmbeddingBatchRepository } from '../../../domain/repositories/embedding-batch.repository.interface';
import { EmbeddingBatchEntity } from '../../../domain/entities/embedding-batch.entity';
import { EmbeddingIdVO } from '../../../domain/value-objects/primitives/embedding-id.vo';

@Injectable()
export class EmbeddingBatchService
  extends BaseService<EmbeddingBatchEntity, EmbeddingIdVO>
  implements EmbeddingBatchServiceInterface
{
  readonly name = 'EmbeddingBatchService';

  constructor(private readonly batchRepo: EmbeddingBatchRepository) {
    super();
  }

  async findByEmbeddingId(embeddingId: string): Promise<EmbeddingBatchEntity | null> {
    return this.batchRepo.findByEmbeddingId(EmbeddingIdVO.create(embeddingId));
  }
}
