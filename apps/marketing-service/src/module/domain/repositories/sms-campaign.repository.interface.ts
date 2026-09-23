import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { SmsCampaignEntity } from '../entities/sms-campaign.entity';
import { SmsMarketingIdVO } from '../value-objects/primitives/sms-marketing-id.vo';
import { SmsCampaignStatusVO } from '../value-objects/primitives/sms-campaign-status.vo';

export interface SmsCampaignRepository
  extends BaseRepository<SmsCampaignEntity, SmsMarketingIdVO> {
  findByStatus(status: SmsCampaignStatusVO): Promise<readonly SmsCampaignEntity[]>;
}
