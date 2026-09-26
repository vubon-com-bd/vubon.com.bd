/**
 * ConversationEntity — Conversation aggregate
 * @module support-service/domain/entities
 *
 * Registry: extends AggregateRoot<ConversationIdVO>
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ConversationIdVO } from '../value-objects/primitives/conversation-id.vo';
import { ConversationStatusVO } from '../value-objects/primitives/conversation-status.vo';
import { ConversationTypeVO } from '../value-objects/primitives/conversation-type.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { AgentIdVO } from '../value-objects/primitives/agent-id.vo';
import { TicketIdVO } from '../value-objects/primitives/ticket-id.vo';
import {
  ConversationStartedEvent,
  ConversationEndedEvent,
} from '../events/conversation.events';

export interface CreateConversationInput {
  readonly id: ConversationIdVO;
  readonly userId: UserIdVO;
  readonly type: ConversationTypeVO;
  readonly ticketId?: TicketIdVO;
  readonly now: string;
}

export interface ConversationSnapshot {
  readonly id: string;
  readonly userId: string;
  readonly type: string;
  readonly status: string;
  readonly assignedAgentId?: string;
  readonly ticketId?: string;
  readonly endedAt?: string;
  readonly endedReason?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class ConversationEntity extends AggregateRoot<ConversationIdVO> {
  private readonly _userId: UserIdVO;
  private readonly _type: ConversationTypeVO;
  private _status: ConversationStatusVO;
  private _assignedAgentId?: AgentIdVO;
  private readonly _ticketId?: TicketIdVO;
  private _endedAt?: string;
  private _endedReason?: string;

  private constructor(
    id: ConversationIdVO,
    userId: UserIdVO,
    type: ConversationTypeVO,
    status: ConversationStatusVO,
    createdAt: string,
    updatedAt: string,
    ticketId?: TicketIdVO,
    assignedAgentId?: AgentIdVO,
  ) {
    super(id, createdAt, updatedAt);
    this._userId = userId;
    this._type = type;
    this._status = status;
    this._ticketId = ticketId;
    this._assignedAgentId = assignedAgentId;
  }

  static create(input: CreateConversationInput): ConversationEntity {
    if (!input.id || !input.userId) {
      throw new ValidationError(
        'Conversation requires id and userId',
        'conversation',
      );
    }
    const now = input.now;
    const conversation = new ConversationEntity(
      input.id,
      input.userId,
      input.type,
      ConversationStatusVO.create('active'),
      now,
      now,
      input.ticketId,
    );
    conversation.addDomainEvent(
      new ConversationStartedEvent(
        input.id,
        input.userId,
        input.type.value,
        Date.parse(now),
      ),
    );
    return conversation;
  }

  static rehydrate(snapshot: ConversationSnapshot): ConversationEntity {
    const conversation = new ConversationEntity(
      ConversationIdVO.create(snapshot.id),
      UserIdVO.create(snapshot.userId),
      ConversationTypeVO.create(snapshot.type),
      ConversationStatusVO.create(snapshot.status),
      snapshot.createdAt,
      snapshot.updatedAt,
      snapshot.ticketId ? TicketIdVO.create(snapshot.ticketId) : undefined,
      snapshot.assignedAgentId ? AgentIdVO.create(snapshot.assignedAgentId) : undefined,
    );
    conversation._endedAt = snapshot.endedAt;
    conversation._endedReason = snapshot.endedReason;
    return conversation;
  }

  get userId(): UserIdVO {
    return this._userId;
  }

  get type(): ConversationTypeVO {
    return this._type;
  }

  get status(): ConversationStatusVO {
    return this._status;
  }

  get ticketId(): TicketIdVO | undefined {
    return this._ticketId;
  }

  get assignedAgentId(): AgentIdVO | undefined {
    return this._assignedAgentId;
  }

  get isActive(): boolean {
    return this._status.canAcceptMessages();
  }

  get isTerminal(): boolean {
    return this._status.isTerminal();
  }

  get hasAgent(): boolean {
    return this._assignedAgentId !== undefined;
  }

  assignAgent(agentId: AgentIdVO, now: string): void {
    this.ensureActive('assign agent');
    this._assignedAgentId = agentId;
    this.touch(now);
  }

  unassignAgent(now: string): void {
    this.ensureActive('unassign agent');
    this._assignedAgentId = undefined;
    this.touch(now);
  }

  end(reason: string | undefined, now: string): void {
    if (this.isTerminal) {
      throw new BusinessRuleError(
        'Conversation is already ended',
        'conversation.already.ended',
      );
    }
    this._status = ConversationStatusVO.create('ended');
    this._endedAt = now;
    this._endedReason = reason;
    this.touch(now);
    this.addDomainEvent(
      new ConversationEndedEvent(this.id, Date.parse(now), reason, this.version + 1),
    );
  }

  toSnapshot(): ConversationSnapshot {
    return {
      id: this.id.value,
      userId: this._userId.value,
      type: this._type.value,
      status: this._status.value,
      assignedAgentId: this._assignedAgentId?.value,
      ticketId: this._ticketId?.value,
      endedAt: this._endedAt,
      endedReason: this._endedReason,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  private ensureActive(action: string): void {
    if (this.isTerminal) {
      throw new BusinessRuleError(
        `Cannot ${action} a terminal conversation`,
        'conversation.terminal',
      );
    }
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }
}
