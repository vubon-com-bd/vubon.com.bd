import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { SimilarityResultEntity } from '../../../domain/entities/similarity-result.entity';
import type { SimilarityIdVO } from '../../../domain/value-objects/primitives/similarity-id.vo';

export interface SimilarityResultServiceInterface
  extends BaseServiceInterface<SimilarityResultEntity, SimilarityIdVO> {
  findBySimilarityId(similarityId: string): Promise<SimilarityResultEntity | null>;
}
