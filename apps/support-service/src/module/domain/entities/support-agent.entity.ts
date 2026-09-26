/**
 * SupportAgentEntity — Support agent aggregate
 * @module support-service/domain/entities
 *
 * Registry: extends AggregateRoot<AgentIdVO>
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { AgentIdVO } from '../value-objects/primitives/agent-id.vo';
import { AgentStatusVO } from '../value-objects/primitives/agent-status.vo';
import { AgentTypeVO } from '../value-objects/primitives/agent-type.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { TeamIdVO } from '../value-objects/primitives/team-id.vo';
import { TicketIdVO } from '../value-objects/primitives/ticket-id.vo';
import {
  AgentAssignedEvent,
  AgentStatusChangedEvent,
  AgentJoinedTeamEvent,
} from '../events/agent.events';

export interface CreateSupportAgentInput {
  readonly id: AgentIdVO;
  readonly userId: UserIdVO;
  readonly type: AgentTypeVO;
  readonly teamId?: TeamIdVO;
  readonly maxConcurrentTickets?: number;
  readonly now: string;
}

export interface SupportAgentSnapshot {
  readonly id: string;
  readonly userId: string;
  readonly type: string;
  readonly status: string;
  readonly teamId?: string;
  readonly maxConcurrentTickets: number;
  readonly currentTicketIds: readonly string[];
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class SupportAgentEntity extends AggregateRoot<AgentIdVO> {
  private readonly _userId: UserIdVO;
  private readonly _type: AgentTypeVO;
  private _status: AgentStatusVO;
  private _teamId?: TeamIdVO;
  private _maxConcurrentTickets: number;
  private _ticketIds: readonly TicketIdVO[];

  private constructor(
    id: AgentIdVO,
    userId: UserIdVO,
    type: AgentTypeVO,
    status: AgentStatusVO,
    maxConcurrentTickets: number,
    createdAt: string,
    updatedAt: string,
    teamId?: TeamIdVO,
  ) {
    super(id, createdAt, updatedAt);
    this._userId = userId;
    this._type = type;
    this._status = status;
    this._maxConcurrentTickets = maxConcurrentTickets;
    this._teamId = teamId;
    this._ticketIds = Object.freeze([]);
  }

  static create(input: CreateSupportAgentInput): SupportAgentEntity {
    if (!input.id || !input.userId) {
      throw new ValidationError(
        'SupportAgent requires id and userId',
        'supportAgent',
      );
    }
    const maxTickets = input.maxConcurrentTickets ?? 5;
    if (!Number.isInteger(maxTickets) || maxTickets < 1 || maxTickets > 50) {
      throw new ValidationError(
        'SupportAgent maxConcurrentTickets must be 1-50',
        'supportAgent',
      );
    }
    const now = input.now;
    return new SupportAgentEntity(
      input.id,
      input.userId,
      input.type,
      AgentStatusVO.online(),
      maxTickets,
      now,
      now,
      input.teamId,
    );
  }

  static rehydrate(snapshot: SupportAgentSnapshot): SupportAgentEntity {
    const agent = new SupportAgentEntity(
      AgentIdVO.create(snapshot.id),
      UserIdVO.create(snapshot.userId),
      AgentTypeVO.create(snapshot.type),
      AgentStatusVO.create(snapshot.status),
      snapshot.maxConcurrentTickets,
      snapshot.createdAt,
      snapshot.updatedAt,
      snapshot.teamId ? TeamIdVO.create(snapshot.teamId) : undefined,
    );
    agent._ticketIds = Object.freeze(snapshot.currentTicketIds.map((id) => TicketIdVO.create(id)));
    return agent;
  }

  get userId(): UserIdVO {
    return this._userId;
  }

  get type(): AgentTypeVO {
    return this._type;
  }

  get status(): AgentStatusVO {
    return this._status;
  }

  get teamId(): TeamIdVO | undefined {
    return this._teamId;
  }

  get maxConcurrentTickets(): number {
    return this._maxConcurrentTickets;
  }

  get currentLoad(): number {
    return this._ticketIds.length;
  }

  get hasCapacity(): boolean {
    return this.currentLoad < this._maxConcurrentTickets;
  }

  get isAvailable(): boolean {
    return this._status.isAvailable();
  }

  get canTakeTicket(): boolean {
    return this.isAvailable && this.hasCapacity;
  }

  get isSupervisory(): boolean {
    return this._type.isSupervisory();
  }

  get utilizationPercent(): number {
    return (this.currentLoad / this._maxConcurrentTickets) * 100;
  }

  changeStatus(next: AgentStatusVO, now: string): void {
    if (this._status.equals(next)) return;
    const from = this._status;
    this._status = next;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
    this.addDomainEvent(
      new AgentStatusChangedEvent(this.id, from, next, Date.parse(now), this.version + 1),
    );
  }

  joinTeam(teamId: TeamIdVO, now: string): void {
    if (this._teamId?.equals(teamId)) {
      throw new BusinessRuleError(
        'Agent already in this team',
        'supportAgent.team.duplicate',
      );
    }
    this._teamId = teamId;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
    this.addDomainEvent(
      new AgentJoinedTeamEvent(this.id, teamId, Date.parse(now), this.version + 1),
    );
  }

  assignTicket(ticketId: TicketIdVO, now: string): void {
    if (!this.canTakeTicket) {
      throw new BusinessRuleError(
        'Agent cannot take more tickets (unavailable or at capacity)',
        'supportAgent.capacity',
      );
    }
    if (this._ticketIds.some((t) => t.equals(ticketId))) {
      throw new BusinessRuleError(
        'Ticket already assigned to this agent',
        'supportAgent.ticket.duplicate',
      );
    }
    this._ticketIds = Object.freeze([...this._ticketIds, ticketId]);
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
    this.addDomainEvent(
      new AgentAssignedEvent(this.id, Date.parse(now), ticketId.value),
    );
  }

  releaseTicket(ticketId: TicketIdVO, now: string): void {
    if (!this._ticketIds.some((t) => t.equals(ticketId))) return;
    this._ticketIds = Object.freeze(this._ticketIds.filter((t) => !t.equals(ticketId)));
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  toSnapshot(): SupportAgentSnapshot {
    return {
      id: this.id.value,
      userId: this._userId.value,
      type: this._type.value,
      status: this._status.value,
      teamId: this._teamId?.value,
      maxConcurrentTickets: this._maxConcurrentTickets,
      currentTicketIds: this._ticketIds.map((t) => t.value),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
