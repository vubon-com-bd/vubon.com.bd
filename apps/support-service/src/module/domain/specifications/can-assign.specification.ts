import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { TicketEntity } from '../entities/ticket.entity';

export class CanAssignSpecification extends Specification<TicketEntity> {
  isSatisfiedBy(candidate: TicketEntity): boolean {
    return candidate.isOpen;
  }
}
