import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { SeoMarketingEntity } from '../entities/seo-marketing.entity';
import { SeoMarketingIdVO } from '../value-objects/primitives/seo-marketing-id.vo';

export interface SeoMarketingRepository
  extends BaseRepository<SeoMarketingEntity, SeoMarketingIdVO> {
  findByPageUrl(pageUrl: string): Promise<SeoMarketingEntity | null>;
}
