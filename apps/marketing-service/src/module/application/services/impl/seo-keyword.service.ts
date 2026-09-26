import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { SeoKeywordServiceInterface } from '../interfaces/seo-keyword.service.interface';
import type { SeoKeywordRepository } from '../../../domain/repositories/seo-keyword.repository.interface';
import { SeoKeywordEntity } from '../../../domain/entities/seo-keyword.entity';
import { SeoMarketingIdVO } from '../../../domain/value-objects/primitives/seo-marketing-id.vo';

@Injectable()
export class SeoKeywordService
  extends BaseService<SeoKeywordEntity, string>
  implements SeoKeywordServiceInterface
{
  readonly name = 'SeoKeywordService';

  constructor(private readonly repo: SeoKeywordRepository) {
    super();
  }

  async findBySeo(seoMarketingId: string): Promise<readonly SeoKeywordEntity[]> {
    return this.repo.findBySeo(SeoMarketingIdVO.create(seoMarketingId));
  }
}
