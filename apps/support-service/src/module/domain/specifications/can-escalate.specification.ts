import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { TicketEntity } from '../entities/ticket.entity';

export class CanEscalateSpecification extends Specification<TicketEntity> {
  isSatisfiedBy(candidate: TicketEntity): boolean {
    if (!candidate.isOpen) return false;
    return candidate.isAssigned;
  }
}
