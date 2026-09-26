/**
 * TicketRepository — Repository interface for TicketEntity
 * @module support-service/domain/repositories
 *
 * Registry: extends BaseRepository<TicketEntity, TicketIdVO>
 * Rules: interface only, no implementation, domain-needs only
 */
import { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { TicketEntity } from '../entities/ticket.entity';
import { TicketIdVO } from '../value-objects/primitives/ticket-id.vo';
import { TicketNumberVO } from '../value-objects/primitives/ticket-number.vo';
import { TicketStatusVO } from '../value-objects/primitives/ticket-status.vo';
import { TicketPriorityVO } from '../value-objects/primitives/ticket-priority.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { AgentIdVO } from '../value-objects/primitives/agent-id.vo';
import { TicketCategoryIdVO } from '../value-objects/primitives/ticket-category-id.vo';

export interface TicketFilter {
  readonly userId?: UserIdVO;
  readonly agentId?: AgentIdVO;
  readonly status?: readonly TicketStatusVO[];
  readonly priority?: readonly TicketPriorityVO[];
  readonly categoryId?: TicketCategoryIdVO;
  readonly from?: string;
  readonly to?: string;
}

export interface TicketRepository
  extends BaseRepository<TicketEntity, TicketIdVO> {
  findByNumber(number: TicketNumberVO): Promise<TicketEntity | null>;
  findByUser(userId: UserIdVO): Promise<readonly TicketEntity[]>;
  findByAgent(agentId: AgentIdVO): Promise<readonly TicketEntity[]>;
  findByStatus(status: TicketStatusVO): Promise<readonly TicketEntity[]>;
  findUnassigned(): Promise<readonly TicketEntity[]>;
  findOpen(): Promise<readonly TicketEntity[]>;
  findOverdue(resolvedBefore: string): Promise<readonly TicketEntity[]>;
  search(filter: TicketFilter): Promise<readonly TicketEntity[]>;
  countByStatus(status: TicketStatusVO): Promise<number>;
  nextTicketSequence(): Promise<number>;
}
