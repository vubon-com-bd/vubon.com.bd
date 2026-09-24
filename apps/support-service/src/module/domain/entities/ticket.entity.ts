import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { TicketIdVO } from '../value-objects/primitives/ticket-id.vo';
import { TicketNumberVO } from '../value-objects/primitives/ticket-number.vo';
import { TicketSubjectVO } from '../value-objects/primitives/ticket-subject.vo';
import { TicketDescriptionVO } from '../value-objects/primitives/ticket-description.vo';
import { TicketStatusVO } from '../value-objects/primitives/ticket-status.vo';
import { TicketPriorityVO } from '../value-objects/primitives/ticket-priority.vo';
import { TicketTypeVO } from '../value-objects/primitives/ticket-type.vo';
import { TicketChannelVO } from '../value-objects/primitives/ticket-channel.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { AgentIdVO } from '../value-objects/primitives/agent-id.vo';
import { TicketCreatedEvent, TicketResolvedEvent, TicketClosedEvent } from '../events/ticket.events';

export interface TicketEntityProps {
  readonly number: TicketNumberVO;
  readonly subject: TicketSubjectVO;
  readonly description: TicketDescriptionVO;
  readonly status: TicketStatusVO;
  readonly priority: TicketPriorityVO;
  readonly type: TicketTypeVO;
  readonly channel: TicketChannelVO;
  readonly userId: UserIdVO;
  readonly assignedAgentId: AgentIdVO | null;
  readonly tags: ReadonlyArray<string>;
  readonly resolvedAt: Date | null;
  readonly closedAt: Date | null;
}

export class TicketEntity extends AggregateRoot<TicketIdVO> {
  private readonly _number: TicketNumberVO;
  private readonly _subject: TicketSubjectVO;
  private readonly _description: TicketDescriptionVO;
  private readonly _status: TicketStatusVO;
  private readonly _priority: TicketPriorityVO;
  private readonly _type: TicketTypeVO;
  private readonly _channel: TicketChannelVO;
  private readonly _userId: UserIdVO;
  private readonly _assignedAgentId: AgentIdVO | null;
  private readonly _tags: ReadonlyArray<string>;
  private readonly _resolvedAt: Date | null;
  private readonly _closedAt: Date | null;

  private constructor(
    id: TicketIdVO,
    props: TicketEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._number = props.number;
    this._subject = props.subject;
    this._description = props.description;
    this._status = props.status;
    this._priority = props.priority;
    this._type = props.type;
    this._channel = props.channel;
    this._userId = props.userId;
    this._assignedAgentId = props.assignedAgentId;
    this._tags = Object.freeze([...props.tags]);
    this._resolvedAt = props.resolvedAt;
    this._closedAt = props.closedAt;
  }

  static create(props: TicketEntityProps): TicketEntity {
    const now = new Date().toISOString();
    const id = TicketIdVO.create(crypto.randomUUID());
    const entity = new TicketEntity(id, props, now, now, null);
    entity.addDomainEvent(new TicketCreatedEvent(id.value, props.userId.value, props.priority.value, 0));
    return entity;
  }

  static reconstitute(
    id: TicketIdVO,
    props: TicketEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): TicketEntity {
    return new TicketEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  assignTo(agentId: AgentIdVO): TicketEntity {
    const updated = new TicketEntity(
      this.id,
      { ...this._toProps(), assignedAgentId: agentId },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
    return updated;
  }

  changePriority(priority: TicketPriorityVO): TicketEntity {
    return new TicketEntity(
      this.id,
      { ...this._toProps(), priority },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  changeStatus(status: TicketStatusVO): TicketEntity {
    return new TicketEntity(
      this.id,
      { ...this._toProps(), status },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  resolve(): TicketEntity {
    const now = new Date();
    const updated = new TicketEntity(
      this.id,
      {
        ...this._toProps(),
        status: TicketStatusVO.create('resolved'),
        resolvedAt: now,
      },
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new TicketResolvedEvent(this.id.value, this._userId.value, this.version + 1),
    );
    return updated;
  }

  close(): TicketEntity {
    const now = new Date();
    const updated = new TicketEntity(
      this.id,
      {
        ...this._toProps(),
        status: TicketStatusVO.create('closed'),
        closedAt: now,
      },
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new TicketClosedEvent(this.id.value, this._userId.value, this.version + 1),
    );
    return updated;
  }

  get number(): TicketNumberVO { return this._number; }
  get subject(): TicketSubjectVO { return this._subject; }
  get description(): TicketDescriptionVO { return this._description; }
  get status(): TicketStatusVO { return this._status; }
  get priority(): TicketPriorityVO { return this._priority; }
  get type(): TicketTypeVO { return this._type; }
  get channel(): TicketChannelVO { return this._channel; }
  get userId(): UserIdVO { return this._userId; }
  get assignedAgentId(): AgentIdVO | null { return this._assignedAgentId; }
  get tags(): ReadonlyArray<string> { return this._tags; }
  get resolvedAt(): Date | null { return this._resolvedAt; }
  get closedAt(): Date | null { return this._closedAt; }

  get isOpen(): boolean {
    return ['open', 'pending', 'in_progress', 'on_hold'].includes(this._status.value);
  }

  get isAssigned(): boolean {
    return this._assignedAgentId !== null;
  }

  private _toProps(): TicketEntityProps {
    return {
      number: this._number,
      subject: this._subject,
      description: this._description,
      status: this._status,
      priority: this._priority,
      type: this._type,
      channel: this._channel,
      userId: this._userId,
      assignedAgentId: this._assignedAgentId,
      tags: this._tags,
      resolvedAt: this._resolvedAt,
      closedAt: this._closedAt,
    };
  }
}
