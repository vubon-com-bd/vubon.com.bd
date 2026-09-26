/**
 * TicketEntity — Ticket aggregate root
 * @module support-service/domain/entities
 *
 * Registry: extends AggregateRoot<TicketIdVO>
 * Rules: ID-only cross refs, invariant checks, domain events
 * Framework-free — pure TypeScript
 *
 * Note: Entity createdAt/updatedAt = ISO string
 *       Event occurredAt = number (epoch ms)
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { TICKET_STATUS } from '@vubon/shared-constants/support';

import { TicketIdVO } from '../value-objects/primitives/ticket-id.vo';
import { TicketNumberVO } from '../value-objects/primitives/ticket-number.vo';
import { TicketSubjectVO } from '../value-objects/primitives/ticket-subject.vo';
import { TicketDescriptionVO } from '../value-objects/primitives/ticket-description.vo';
import { TicketStatusVO } from '../value-objects/primitives/ticket-status.vo';
import { TicketPriorityVO } from '../value-objects/primitives/ticket-priority.vo';
import { TicketTypeVO } from '../value-objects/primitives/ticket-type.vo';
import { TicketChannelVO } from '../value-objects/primitives/ticket-channel.vo';
import { TicketCategoryIdVO } from '../value-objects/primitives/ticket-category-id.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { OrderIdVO } from '../value-objects/primitives/order-id.vo';
import { ProductIdVO } from '../value-objects/primitives/product-id.vo';
import { AgentIdVO } from '../value-objects/primitives/agent-id.vo';

import {
  TicketAssignedEvent,
  TicketClosedEvent,
  TicketCreatedEvent,
  TicketPriorityChangedEvent,
  TicketReopenedEvent,
  TicketResolvedEvent,
  TicketStatusChangedEvent,
  TicketUpdatedEvent,
} from '../events/ticket.events';

export interface CreateTicketInput {
  readonly id: TicketIdVO;
  readonly number: TicketNumberVO;
  readonly subject: TicketSubjectVO;
  readonly description: TicketDescriptionVO;
  readonly type: TicketTypeVO;
  readonly channel: TicketChannelVO;
  readonly priority: TicketPriorityVO;
  readonly userId: UserIdVO;
  readonly categoryId?: TicketCategoryIdVO;
  readonly orderId?: OrderIdVO;
  readonly productId?: ProductIdVO;
  readonly now: string; // ISO 8601
}

export interface TicketSnapshot {
  readonly id: string;
  readonly number: string;
  readonly subject: string;
  readonly description: string;
  readonly status: string;
  readonly priority: string;
  readonly type: string;
  readonly channel: string;
  readonly categoryId?: string;
  readonly userId: string;
  readonly orderId?: string;
  readonly productId?: string;
  readonly assignedAgentId?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly resolvedAt?: string;
  readonly closedAt?: string;
  readonly reopenedAt?: string;
}

export class TicketEntity extends AggregateRoot<TicketIdVO> {
  private _subject: TicketSubjectVO;
  private _description: TicketDescriptionVO;
  private _status: TicketStatusVO;
  private _priority: TicketPriorityVO;
  private readonly _type: TicketTypeVO;
  private readonly _channel: TicketChannelVO;
  private readonly _categoryId?: TicketCategoryIdVO;
  private readonly _userId: UserIdVO;
  private readonly _orderId?: OrderIdVO;
  private readonly _productId?: ProductIdVO;
  private _assignedAgentId?: AgentIdVO;
  private _resolvedAt?: string;
  private _closedAt?: string;
  private _reopenedAt?: string;

  private constructor(
    id: TicketIdVO,
    private readonly _number: TicketNumberVO,
    subject: TicketSubjectVO,
    description: TicketDescriptionVO,
    status: TicketStatusVO,
    priority: TicketPriorityVO,
    type: TicketTypeVO,
    channel: TicketChannelVO,
    userId: UserIdVO,
    createdAt: string,
    updatedAt: string,
    categoryId?: TicketCategoryIdVO,
    orderId?: OrderIdVO,
    productId?: ProductIdVO,
    assignedAgentId?: AgentIdVO,
  ) {
    super(id, createdAt, updatedAt);
    this._subject = subject;
    this._description = description;
    this._status = status;
    this._priority = priority;
    this._type = type;
    this._channel = channel;
    this._userId = userId;
    this._categoryId = categoryId;
    this._orderId = orderId;
    this._productId = productId;
    this._assignedAgentId = assignedAgentId;
  }

  static create(input: CreateTicketInput): TicketEntity {
    if (!input.id || !input.userId) {
      throw new ValidationError('Ticket requires id and userId', 'ticket');
    }
    if (input.priority.isUrgentOrHigher() && !input.categoryId) {
      throw new BusinessRuleError(
        'Urgent/Critical tickets must have a category',
        'ticket.urgent.requires.category',
      );
    }
    const now = input.now;
    const ticket = new TicketEntity(
      input.id,
      input.number,
      input.subject,
      input.description,
      TicketStatusVO.open(),
      input.priority,
      input.type,
      input.channel,
      input.userId,
      now,
      now,
      input.categoryId,
      input.orderId,
      input.productId,
    );
    ticket.addDomainEvent(
      new TicketCreatedEvent(
        input.id,
        input.userId,
        input.priority,
        ticket._status,
        Date.parse(now),
      ),
    );
    return ticket;
  }

  static rehydrate(snapshot: TicketSnapshot): TicketEntity {
    const ticket = new TicketEntity(
      TicketIdVO.create(snapshot.id),
      TicketNumberVO.create(snapshot.number),
      TicketSubjectVO.create(snapshot.subject),
      TicketDescriptionVO.create(snapshot.description),
      TicketStatusVO.create(snapshot.status),
      TicketPriorityVO.create(snapshot.priority),
      TicketTypeVO.create(snapshot.type),
      TicketChannelVO.create(snapshot.channel),
      UserIdVO.create(snapshot.userId),
      snapshot.createdAt,
      snapshot.updatedAt,
      snapshot.categoryId ? TicketCategoryIdVO.create(snapshot.categoryId) : undefined,
      snapshot.orderId ? OrderIdVO.create(snapshot.orderId) : undefined,
      snapshot.productId ? ProductIdVO.create(snapshot.productId) : undefined,
      snapshot.assignedAgentId ? AgentIdVO.create(snapshot.assignedAgentId) : undefined,
    );
    ticket._resolvedAt = snapshot.resolvedAt;
    ticket._closedAt = snapshot.closedAt;
    ticket._reopenedAt = snapshot.reopenedAt;
    return ticket;
  }

  get number(): TicketNumberVO {
    return this._number;
  }

  get subject(): TicketSubjectVO {
    return this._subject;
  }

  get description(): TicketDescriptionVO {
    return this._description;
  }

  get status(): TicketStatusVO {
    return this._status;
  }

  get priority(): TicketPriorityVO {
    return this._priority;
  }

  get type(): TicketTypeVO {
    return this._type;
  }

  get channel(): TicketChannelVO {
    return this._channel;
  }

  get userId(): UserIdVO {
    return this._userId;
  }

  get assignedAgentId(): AgentIdVO | undefined {
    return this._assignedAgentId;
  }

  get isAssigned(): boolean {
    return this._assignedAgentId !== undefined;
  }

  get isOpen(): boolean {
    return this._status.isActive();
  }

  get isTerminal(): boolean {
    return this._status.isTerminal();
  }

  updateSubject(subject: TicketSubjectVO, now: string): void {
    this.ensureNotTerminal('update');
    this._subject = subject;
    this.touch(now);
    this.addDomainEvent(
      new TicketUpdatedEvent(this.id, ['subject'], Date.parse(now), this.version + 1),
    );
  }

  updateDescription(description: TicketDescriptionVO, now: string): void {
    this.ensureNotTerminal('update');
    this._description = description;
    this.touch(now);
    this.addDomainEvent(
      new TicketUpdatedEvent(this.id, ['description'], Date.parse(now), this.version + 1),
    );
  }

  assignTo(agentId: AgentIdVO, now: string): void {
    this.ensureNotTerminal('assign');
    if (this._assignedAgentId?.equals(agentId)) {
      throw new BusinessRuleError(
        'Agent already assigned to this ticket',
        'ticket.assign.duplicate',
      );
    }
    this._assignedAgentId = agentId;
    this.touch(now);
    this.addDomainEvent(
      new TicketAssignedEvent(this.id, agentId, Date.parse(now), this.version + 1),
    );
  }

  changePriority(next: TicketPriorityVO, now: string): void {
    this.ensureNotTerminal('change priority');
    if (this._priority.equals(next)) {
      throw new BusinessRuleError(
        'New priority same as current',
        'ticket.priority.same',
      );
    }
    const from = this._priority;
    this._priority = next;
    this.touch(now);
    this.addDomainEvent(
      new TicketPriorityChangedEvent(this.id, from, next, Date.parse(now), this.version + 1),
    );
  }

  changeStatus(next: TicketStatusVO, now: string): void {
    if (!this._status.canTransitionTo(next)) {
      throw new BusinessRuleError(
        `Invalid status transition: ${this._status.value} -> ${next.value}`,
        'ticket.status.transition.invalid',
      );
    }
    const from = this._status;
    this._status = next;
    if (next.value === TICKET_STATUS.RESOLVED) {
      this._resolvedAt = now;
    } else if (next.value === TICKET_STATUS.CLOSED) {
      this._closedAt = now;
    } else if (next.value === TICKET_STATUS.REOPENED) {
      this._reopenedAt = now;
      this._resolvedAt = undefined;
      this._closedAt = undefined;
    }
    this.touch(now);
    this.addDomainEvent(
      new TicketStatusChangedEvent(this.id, from, next, Date.parse(now), this.version + 1),
    );
  }

  resolve(now: string): void {
    this.ensureNotTerminal('resolve');
    if (this._status.value === TICKET_STATUS.RESOLVED) {
      throw new BusinessRuleError('Ticket already resolved', 'ticket.already.resolved');
    }
    this.changeStatus(TicketStatusVO.create(TICKET_STATUS.RESOLVED), now);
    this.addDomainEvent(new TicketResolvedEvent(this.id, Date.parse(now), this.version + 1));
  }

  close(now: string): void {
    if (this._status.value === TICKET_STATUS.CLOSED) {
      throw new BusinessRuleError('Ticket already closed', 'ticket.already.closed');
    }
    this.changeStatus(TicketStatusVO.create(TICKET_STATUS.CLOSED), now);
    this.addDomainEvent(new TicketClosedEvent(this.id, Date.parse(now), this.version + 1));
  }

  reopen(now: string): void {
    if (
      this._status.value !== TICKET_STATUS.CLOSED &&
      this._status.value !== TICKET_STATUS.RESOLVED
    ) {
      throw new BusinessRuleError(
        'Only closed or resolved tickets can be reopened',
        'ticket.reopen.invalid.state',
      );
    }
    this.changeStatus(TicketStatusVO.create(TICKET_STATUS.REOPENED), now);
    this.addDomainEvent(new TicketReopenedEvent(this.id, Date.parse(now), this.version + 1));
  }

  toSnapshot(): TicketSnapshot {
    return {
      id: this.id.value,
      number: this._number.value,
      subject: this._subject.value,
      description: this._description.value,
      status: this._status.value,
      priority: this._priority.value,
      type: this._type.value,
      channel: this._channel.value,
      categoryId: this._categoryId?.value,
      userId: this._userId.value,
      orderId: this._orderId?.value,
      productId: this._productId?.value,
      assignedAgentId: this._assignedAgentId?.value,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      resolvedAt: this._resolvedAt,
      closedAt: this._closedAt,
      reopenedAt: this._reopenedAt,
    };
  }

  private ensureNotTerminal(action: string): void {
    if (this._status.isTerminal()) {
      throw new BusinessRuleError(
        `Cannot ${action} a terminal ticket`,
        'ticket.terminal',
      );
    }
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }
}
