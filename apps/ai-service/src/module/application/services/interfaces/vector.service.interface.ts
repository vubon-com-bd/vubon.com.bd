import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { VectorEntity } from '../../../domain/entities/vector.entity';
import type { VectorIdVO } from '../../../domain/value-objects/primitives/vector-id.vo';
import type { SearchVectorRequestDTO } from '../../dtos/requests/vector/search-vector.dto';
import type { VectorSearchResponseDTO } from '../../dtos/responses/vector-response.dto';

export interface VectorServiceInterface
  extends BaseServiceInterface<VectorEntity, VectorIdVO> {
  search(input: SearchVectorRequestDTO): Promise<VectorSearchResponseDTO>;
  index(vectorId: string, indexId: string): Promise<void>;
  rebuildIndex(indexId: string, force?: boolean): Promise<void>;
}
