import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetSearchQuery } from './get-search.query';
import type { AiSearchRepository } from '../../../domain/repositories/ai-search.repository.interface';
import { AiSearchIdVO } from '../../../domain/value-objects/primitives/ai-search-id.vo';
import type { SearchResponseDTO } from '../../dtos/responses/search-response.dto';

@QueryHandler(GetSearchQuery)
export class GetSearchHandler
  extends BaseQueryHandler<GetSearchQuery, SearchResponseDTO | null>
  implements IQueryHandler<GetSearchQuery>
{
  readonly queryType = 'ai.search.get';
  constructor(private readonly searchRepo: AiSearchRepository) { super(); }

  async execute(query: GetSearchQuery): Promise<SearchResponseDTO | null> {
    const entity = await this.searchRepo.findById(AiSearchIdVO.create(query.searchId));
    if (!entity) return null;
    return {
      query: entity.result.query,
      matches: entity.result.items.map((i) => ({
        documentId: i.documentId,
        score: i.score,
        snippet: i.snippet,
      })),
      totalHits: entity.result.totalHits,
      tookMs: entity.result.tookMs,
    };
  }
}
