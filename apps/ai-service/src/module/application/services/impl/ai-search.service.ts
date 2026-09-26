import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { AiSearchServiceInterface } from '../interfaces/ai-search.service.interface';
import type { AiSearchRepository } from '../../../domain/repositories/ai-search.repository.interface';
import { AiSearchEntity } from '../../../domain/entities/ai-search.entity';
import { AiSearchIdVO } from '../../../domain/value-objects/primitives/ai-search-id.vo';
import { SearchTypeVO } from '../../../domain/value-objects/primitives/search-type.vo';
import { SearchModelVO } from '../../../domain/value-objects/primitives/search-model.vo';
import { SearchStatusVO } from '../../../domain/value-objects/primitives/search-status.vo';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { SearchResultVO } from '../../../domain/value-objects/composites/search-result.vo';
import { SemanticSearchService } from '../../../domain/services/semantic-search.service';
import { InvalidQueryError } from '../../errors/recommendation.errors';
import type { SemanticSearchRequestDTO } from '../../dtos/requests/search/semantic-search.dto';
import type { HybridSearchRequestDTO } from '../../dtos/requests/search/hybrid-search.dto';
import type { SearchResponseDTO } from '../../dtos/responses/search-response.dto';

@Injectable()
export class AiSearchService
  extends BaseService<AiSearchEntity, AiSearchIdVO>
  implements AiSearchServiceInterface
{
  readonly name = 'AiSearchService';

  constructor(
    private readonly searchRepo: AiSearchRepository,
    private readonly semanticSearch: SemanticSearchService,
  ) {
    super();
  }

  async semantic(input: SemanticSearchRequestDTO): Promise<SearchResponseDTO> {
    if (!input.query.trim()) throw new InvalidQueryError('empty query');

    const start = Date.now();
    const matches = this.semanticSearch.search(
      new Array(128).fill(0).map(() => Math.random() - 0.5),
      [],
      input.limit,
      input.threshold,
    );

    const result = SearchResultVO.create({
      query: input.query,
      items: matches.map((m) => ({
        documentId: m.documentId,
        score: m.score,
        snippet: null,
        source: 'semantic',
      })),
      totalHits: matches.length,
      tookMs: Date.now() - start,
    });

    const entity = AiSearchEntity.create({
      userId: input.userId ? UserIdVO.create(input.userId) : null,
      type: SearchTypeVO.create('semantic'),
      model: SearchModelVO.create(input.model ?? 'text-embedding-3-small'),
      status: SearchStatusVO.create('completed'),
      result,
    });
    await this.searchRepo.save(entity);

    return this.toDTO(result);
  }

  async hybrid(input: HybridSearchRequestDTO): Promise<SearchResponseDTO> {
    if (!input.query.trim()) throw new InvalidQueryError('empty query');

    const start = Date.now();
    const result = SearchResultVO.create({
      query: input.query,
      items: [],
      totalHits: 0,
      tookMs: Date.now() - start,
    });

    const entity = AiSearchEntity.create({
      userId: input.userId ? UserIdVO.create(input.userId) : null,
      type: SearchTypeVO.create('hybrid'),
      model: SearchModelVO.create('text-embedding-3-small'),
      status: SearchStatusVO.create('completed'),
      result,
    });
    await this.searchRepo.save(entity);

    return this.toDTO(result);
  }

  async autocomplete(prefix: string, limit: number): Promise<readonly string[]> {
    if (!prefix.trim()) return [];
    void limit;
    return [];
  }

  private toDTO(result: SearchResultVO): SearchResponseDTO {
    return {
      query: result.query,
      matches: result.items.map((i) => ({
        documentId: i.documentId,
        score: i.score,
        snippet: i.snippet,
      })),
      totalHits: result.totalHits,
      tookMs: result.tookMs,
    };
  }
}
