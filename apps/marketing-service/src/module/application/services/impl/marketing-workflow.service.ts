import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { MarketingWorkflowServiceInterface } from '../interfaces/marketing-workflow.service.interface';
import type { MarketingWorkflowRepository } from '../../../domain/repositories/marketing-workflow.repository.interface';
import { MarketingWorkflowEntity } from '../../../domain/entities/marketing-workflow.entity';

@Injectable()
export class MarketingWorkflowService
  extends BaseService<MarketingWorkflowEntity, string>
  implements MarketingWorkflowServiceInterface
{
  readonly name = 'MarketingWorkflowService';

  constructor(private readonly repo: MarketingWorkflowRepository) {
    super();
  }

  async findByAutomation(automationId: string): Promise<readonly MarketingWorkflowEntity[]> {
    return this.repo.findByAutomation(automationId);
  }
}
