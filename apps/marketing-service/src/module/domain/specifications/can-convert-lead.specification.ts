import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { LeadEntity } from '../entities/lead.entity';

export class CanConvertLeadSpecification extends Specification<LeadEntity> {
  isSatisfiedBy(candidate: LeadEntity): boolean {
    if (candidate.isDeleted()) return false;
    if (candidate.status.value !== 'qualified') return false;
    return true;
  }
}
