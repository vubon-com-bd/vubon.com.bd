import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { SeoMarketingEntity } from '../../../domain/entities/seo-marketing.entity';
import type { TrackKeywordRequestDTO } from '../../dtos/requests/seo-marketing/track-keyword.dto';
import type { SeoMarketingResponseDTO } from '../../dtos/responses/seo-marketing-response.dto';

export interface SeoMarketingServiceInterface
  extends BaseServiceInterface<SeoMarketingEntity, string> {
  track(input: TrackKeywordRequestDTO): Promise<SeoMarketingResponseDTO>;
  audit(pageUrl: string): Promise<number>;
  findByPageUrl(pageUrl: string): Promise<SeoMarketingResponseDTO | null>;
}
