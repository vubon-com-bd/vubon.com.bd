import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { CampaignBudgetServiceInterface } from '../interfaces/campaign-budget.service.interface';
import type { CampaignBudgetRepository } from '../../../domain/repositories/campaign-budget.repository.interface';
import { CampaignBudgetEntity } from '../../../domain/entities/campaign-budget.entity';
import { CampaignIdVO } from '../../../domain/value-objects/primitives/campaign-id.vo';
import { CampaignBudgetService as CampaignBudgetDomainService } from '../../../domain/services/campaign-budget.service';

@Injectable()
export class CampaignBudgetService
  extends BaseService<CampaignBudgetEntity, string>
  implements CampaignBudgetServiceInterface
{
  readonly name = 'CampaignBudgetService';

  constructor(
    private readonly repo: CampaignBudgetRepository,
    private readonly domainService: CampaignBudgetDomainService,
  ) {
    super();
  }

  async getRemaining(campaignId: string): Promise<number> {
    const entity = await this.repo.findByCampaignId(CampaignIdVO.create(campaignId));
    if (!entity) return 0;
    return this.domainService.calculateRemaining(entity.budget, entity.spent);
  }

  async checkExceeded(campaignId: string, spent: number): Promise<boolean> {
    const entity = await this.repo.findByCampaignId(CampaignIdVO.create(campaignId));
    if (!entity) return false;
    return this.domainService.isExceeded(entity.budget, spent);
  }
}
