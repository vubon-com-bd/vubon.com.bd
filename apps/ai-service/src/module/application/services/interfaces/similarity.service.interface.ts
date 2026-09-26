import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { SimilarityEntity } from '../../../domain/entities/similarity.entity';
import type { SimilarityIdVO } from '../../../domain/value-objects/primitives/similarity-id.vo';
import type { ComputeSimilarityRequestDTO } from '../../dtos/requests/similarity/compute-similarity.dto';
import type { SimilarityResponseDTO } from '../../dtos/responses/similarity-response.dto';

export interface SimilarityServiceInterface
  extends BaseServiceInterface<SimilarityEntity, SimilarityIdVO> {
  compute(input: ComputeSimilarityRequestDTO): Promise<SimilarityResponseDTO>;
}
