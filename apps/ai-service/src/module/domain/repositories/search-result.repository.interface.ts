import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { SearchResultEntity } from '../entities/search-result.entity';
import { AiSearchIdVO } from '../value-objects/primitives/ai-search-id.vo';

export interface SearchResultRepository
  extends BaseRepository<SearchResultEntity, AiSearchIdVO> {
  findBySearchId(searchId: AiSearchIdVO): Promise<SearchResultEntity | null>;
}
