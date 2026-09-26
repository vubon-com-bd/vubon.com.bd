import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { MarketingWorkflowEntity } from '../entities/marketing-workflow.entity';

export interface MarketingWorkflowRepository
  extends BaseRepository<MarketingWorkflowEntity, string> {
  findByAutomation(automationId: string): Promise<readonly MarketingWorkflowEntity[]>;
}
