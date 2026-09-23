import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { SmsMarketingEntity } from '../entities/sms-marketing.entity';
import { SmsMarketingIdVO } from '../value-objects/primitives/sms-marketing-id.vo';
import { SmsCampaignStatusVO } from '../value-objects/primitives/sms-campaign-status.vo';

export interface SmsMarketingRepository
  extends BaseRepository<SmsMarketingEntity, SmsMarketingIdVO> {
  findByStatus(status: SmsCampaignStatusVO): Promise<readonly SmsMarketingEntity[]>;
}
