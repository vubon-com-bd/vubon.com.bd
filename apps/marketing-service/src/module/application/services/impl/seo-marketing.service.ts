import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { SeoMarketingServiceInterface } from '../interfaces/seo-marketing.service.interface';
import type { SeoMarketingRepository } from '../../../domain/repositories/seo-marketing.repository.interface';
import { SeoMarketingEntity } from '../../../domain/entities/seo-marketing.entity';
import { SeoElementVO } from '../../../domain/value-objects/primitives/seo-element.vo';
import type { TrackKeywordRequestDTO } from '../../dtos/requests/seo-marketing/track-keyword.dto';
import type { SeoMarketingResponseDTO } from '../../dtos/responses/seo-marketing-response.dto';

@Injectable()
export class SeoMarketingService
  extends BaseService<SeoMarketingEntity, string>
  implements SeoMarketingServiceInterface
{
  readonly name = 'SeoMarketingService';

  constructor(private readonly repo: SeoMarketingRepository) {
    super();
  }

  async track(input: TrackKeywordRequestDTO): Promise<SeoMarketingResponseDTO> {
    const entity = SeoMarketingEntity.create({
      pageUrl: input.pageUrl,
      title: SeoElementVO.create(input.keyword),
      description: null,
      score: 0,
    });
    await this.repo.save(entity);
    return this.toDTO(entity);
  }

  async audit(pageUrl: string): Promise<number> {
    const entity = await this.repo.findByPageUrl(pageUrl);
    return entity?.score ?? 0;
  }

  async findByPageUrl(pageUrl: string): Promise<SeoMarketingResponseDTO | null> {
    const entity = await this.repo.findByPageUrl(pageUrl);
    return entity ? this.toDTO(entity) : null;
  }

  private toDTO(entity: SeoMarketingEntity): SeoMarketingResponseDTO {
    return {
      id: entity.id.value,
      pageUrl: entity.pageUrl,
      title: entity.title?.value,
      description: entity.description?.value,
      score: entity.score,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt ?? null,
    } as unknown as SeoMarketingResponseDTO;
  }
}
