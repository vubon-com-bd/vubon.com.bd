import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { SearchResultEntity } from '../../../domain/entities/search-result.entity';
import type { AiSearchIdVO } from '../../../domain/value-objects/primitives/ai-search-id.vo';

export interface SearchResultServiceInterface
  extends BaseServiceInterface<SearchResultEntity, AiSearchIdVO> {
  findBySearchId(searchId: string): Promise<SearchResultEntity | null>;
}
