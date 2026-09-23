import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { EmailMarketingEntity } from '../entities/email-marketing.entity';

export class CanSendEmailSpecification extends Specification<EmailMarketingEntity> {
  isSatisfiedBy(candidate: EmailMarketingEntity): boolean {
    if (candidate.isDeleted()) return false;
    if (candidate.status.value === 'sent') return false;
    if (candidate.status.value === 'cancelled') return false;
    return true;
  }
}
