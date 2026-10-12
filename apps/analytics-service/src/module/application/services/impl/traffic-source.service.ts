/**
 * Traffic Source Service Implementation
 */
import { BaseService } from '@vubon/shared-kernel/application/services';
import type { TrafficSourceEntity } from '../../../domain/entities/traffic-source.entity.js';
import type { TrafficSourceRepository } from '../../../domain/repositories/traffic-source.repository.interface.js';
import { TrafficSourceService as DomainTrafficSourceService } from '../../../domain/services/traffic-source.service.js';
import type { ITrafficSourceService } from '../interfaces/traffic-source.service.interface.js';
import type { TrafficSourceResponseData } from '../../dtos/responses/traffic-source-response.dto.js';

export class TrafficSourceService extends BaseService<TrafficSourceEntity, string> implements ITrafficSourceService {
  readonly name = 'TrafficSourceService';
  private readonly domainService = new DomainTrafficSourceService();

  constructor(private readonly repository: TrafficSourceRepository) {
    super();
  }

  classify(input: {
    referrer?: string;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    gclid?: string;
    fbclid?: string;
    ownHost?: string;
  }): TrafficSourceResponseData {
    const ts = this.domainService.classify(input);
    return {
      source: ts.source.value,
      medium: ts.utmMedium?.value,
      campaign: ts.utmCampaign?.value,
      referrer: ts.referrer?.value,
      channel: ts.channel(),
      isPaid: ts.source.isPaid(),
      isOrganic: ts.source.isOrganic(),
      isDirect: ts.source.isDirect(),
    };
  }

  async findByChannelKey(channelKey: string): Promise<TrafficSourceEntity | null> {
    return this.repository.findByChannelKey(channelKey);
  }

  async listPaid(): Promise<readonly TrafficSourceEntity[]> {
    return this.repository.findAllPaid();
  }
}
