import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { SearchResultServiceInterface } from '../interfaces/search-result.service.interface';
import type { SearchResultRepository } from '../../../domain/repositories/search-result.repository.interface';
import { SearchResultEntity } from '../../../domain/entities/search-result.entity';
import { AiSearchIdVO } from '../../../domain/value-objects/primitives/ai-search-id.vo';

@Injectable()
export class SearchResultService
  extends BaseService<SearchResultEntity, AiSearchIdVO>
  implements SearchResultServiceInterface
{
  readonly name = 'SearchResultService';

  constructor(private readonly resultRepo: SearchResultRepository) {
    super();
  }

  async findBySearchId(searchId: string): Promise<SearchResultEntity | null> {
    return this.resultRepo.findBySearchId(AiSearchIdVO.create(searchId));
  }
}
