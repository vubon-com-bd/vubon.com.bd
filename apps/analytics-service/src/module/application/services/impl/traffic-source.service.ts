import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import { TrafficSourceEntity } from '../../../domain/entities/traffic-source.entity';
import { TrafficSourceService as DomainTrafficService } from '../../../domain/services/traffic-source.service';
import type { TrafficSourceRepository } from '../../../domain/repositories/traffic-source.repository.interface';
import type { TrafficSourceServiceInterface } from '../interfaces/traffic-source.service.interface';
import {
  type TrafficSourceResponseDTO,
  toTrafficSourceResponse,
} from '../../dtos/responses';

@Injectable()
export class TrafficSourceService
  extends BaseService<TrafficSourceEntity, string>
  implements TrafficSourceServiceInterface
{
  readonly name = 'TrafficSourceService';

  constructor(
    private readonly repo: TrafficSourceRepository,
    private readonly domainService: DomainTrafficService,
  ) {
    super();
  }

  async classify(input: {
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    referrer?: string;
  }): Promise<TrafficSourceResponseDTO> {
    const vo = this.domainService.classify(input);
    return toTrafficSourceResponse(vo);
  }

  async topSources(limit: number): Promise<readonly TrafficSourceResponseDTO[]> {
    const entities = await this.repo.findTopBySessions(limit);
    return entities.map((e) => ({
      source: e.source?.value ?? null,
      medium: e.medium?.value ?? null,
      campaign: e.campaign?.value ?? null,
      referrer: e.referrer.value,
      label: e.source?.value ?? e.referrer.hostname ?? 'unknown',
      isDirect: e.isDirect,
      isPaid: e.isPaid,
      isOrganic: false,
      hasUtm: e.source !== null || e.medium !== null || e.campaign !== null,
    }));
  }
}
