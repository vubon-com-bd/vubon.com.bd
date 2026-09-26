import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { CampaignPerformanceServiceInterface } from '../interfaces/campaign-performance.service.interface';
import type { CampaignPerformanceRepository } from '../../../domain/repositories/campaign-performance.repository.interface';
import { CampaignPerformanceEntity } from '../../../domain/entities/campaign-performance.entity';
import { CampaignIdVO } from '../../../domain/value-objects/primitives/campaign-id.vo';

@Injectable()
export class CampaignPerformanceService
  extends BaseService<CampaignPerformanceEntity, string>
  implements CampaignPerformanceServiceInterface
{
  readonly name = 'CampaignPerformanceService';

  constructor(private readonly repo: CampaignPerformanceRepository) {
    super();
  }

  async calculateRoi(_campaignId: string): Promise<number> {
    void _campaignId;
    return 0;
  }

  async calculateRoas(campaignId: string): Promise<number> {
    const items = await this.repo.findByCampaignId(CampaignIdVO.create(campaignId));
    void items;
    return 0;
  }
}
