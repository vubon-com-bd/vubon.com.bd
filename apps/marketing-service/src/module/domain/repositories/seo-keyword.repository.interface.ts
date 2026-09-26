import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { SeoKeywordEntity } from '../entities/seo-keyword.entity';
import { SeoMarketingIdVO } from '../value-objects/primitives/seo-marketing-id.vo';

export interface SeoKeywordRepository
  extends BaseRepository<SeoKeywordEntity, string> {
  findBySeo(seoMarketingId: SeoMarketingIdVO): Promise<readonly SeoKeywordEntity[]>;
}
