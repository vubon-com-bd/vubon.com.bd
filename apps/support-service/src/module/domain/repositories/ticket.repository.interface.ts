import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { TicketEntity } from '../entities/ticket.entity';
import { TicketIdVO } from '../value-objects/primitives/ticket-id.vo';
import { TicketNumberVO } from '../value-objects/primitives/ticket-number.vo';
import { TicketStatusVO } from '../value-objects/primitives/ticket-status.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { AgentIdVO } from '../value-objects/primitives/agent-id.vo';

export interface TicketRepository extends BaseRepository<TicketEntity, TicketIdVO> {
  findByNumber(number: TicketNumberVO): Promise<TicketEntity | null>;
  findByUser(userId: UserIdVO): Promise<readonly TicketEntity[]>;
  findByStatus(status: TicketStatusVO): Promise<readonly TicketEntity[]>;
  findAssignedTo(agentId: AgentIdVO): Promise<readonly TicketEntity[]>;
  findUnassigned(): Promise<readonly TicketEntity[]>;
}
