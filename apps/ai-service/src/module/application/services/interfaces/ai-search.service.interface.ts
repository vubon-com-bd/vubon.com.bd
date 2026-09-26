import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { AiSearchEntity } from '../../../domain/entities/ai-search.entity';
import type { AiSearchIdVO } from '../../../domain/value-objects/primitives/ai-search-id.vo';
import type { SemanticSearchRequestDTO } from '../../dtos/requests/search/semantic-search.dto';
import type { HybridSearchRequestDTO } from '../../dtos/requests/search/hybrid-search.dto';
import type { SearchResponseDTO } from '../../dtos/responses/search-response.dto';

export interface AiSearchServiceInterface
  extends BaseServiceInterface<AiSearchEntity, AiSearchIdVO> {
  semantic(input: SemanticSearchRequestDTO): Promise<SearchResponseDTO>;
  hybrid(input: HybridSearchRequestDTO): Promise<SearchResponseDTO>;
  autocomplete(prefix: string, limit: number): Promise<readonly string[]>;
}
