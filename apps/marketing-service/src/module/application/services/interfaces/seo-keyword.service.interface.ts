import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { SeoKeywordEntity } from '../../../domain/entities/seo-keyword.entity';

export interface SeoKeywordServiceInterface
  extends BaseServiceInterface<SeoKeywordEntity, string> {
  findBySeo(seoMarketingId: string): Promise<readonly SeoKeywordEntity[]>;
}
