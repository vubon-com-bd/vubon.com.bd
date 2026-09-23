import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { CampaignEntity } from '../entities/campaign.entity';

export class CanLaunchCampaignSpecification extends Specification<CampaignEntity> {
  isSatisfiedBy(candidate: CampaignEntity): boolean {
    if (candidate.isDeleted()) return false;
    if (candidate.status.value !== 'draft') return false;
    return true;
  }
}
