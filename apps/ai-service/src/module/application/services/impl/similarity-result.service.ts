import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { SimilarityResultServiceInterface } from '../interfaces/similarity-result.service.interface';
import type { SimilarityResultRepository } from '../../../domain/repositories/similarity-result.repository.interface';
import { SimilarityResultEntity } from '../../../domain/entities/similarity-result.entity';
import { SimilarityIdVO } from '../../../domain/value-objects/primitives/similarity-id.vo';

@Injectable()
export class SimilarityResultService
  extends BaseService<SimilarityResultEntity, SimilarityIdVO>
  implements SimilarityResultServiceInterface
{
  readonly name = 'SimilarityResultService';

  constructor(private readonly resultRepo: SimilarityResultRepository) {
    super();
  }

  async findBySimilarityId(similarityId: string): Promise<SimilarityResultEntity | null> {
    return this.resultRepo.findBySimilarityId(SimilarityIdVO.create(similarityId));
  }
}
