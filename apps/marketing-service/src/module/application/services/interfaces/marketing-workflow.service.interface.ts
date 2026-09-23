import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { MarketingWorkflowEntity } from '../../../domain/entities/marketing-workflow.entity';

export interface MarketingWorkflowServiceInterface
  extends BaseServiceInterface<MarketingWorkflowEntity, string> {
  findByAutomation(automationId: string): Promise<readonly MarketingWorkflowEntity[]>;
}
