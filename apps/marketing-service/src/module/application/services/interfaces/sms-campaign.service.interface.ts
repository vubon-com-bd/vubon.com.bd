import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { SmsCampaignEntity } from '../../../domain/entities/sms-campaign.entity';

export interface SmsCampaignServiceInterface
  extends BaseServiceInterface<SmsCampaignEntity, string> {
  findByStatus(status: string): Promise<readonly SmsCampaignEntity[]>;
}
