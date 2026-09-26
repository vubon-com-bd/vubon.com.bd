import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { CampaignPerformanceEntity } from '../../../domain/entities/campaign-performance.entity';

export interface CampaignPerformanceServiceInterface
  extends BaseServiceInterface<CampaignPerformanceEntity, string> {
  calculateRoi(campaignId: string): Promise<number>;
  calculateRoas(campaignId: string): Promise<number>;
}
