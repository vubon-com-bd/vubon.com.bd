/**
 * LiveChatEntity — Live chat session aggregate
 * @module support-service/domain/entities
 *
 * Registry: extends AggregateRoot<LiveChatIdVO>
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { LiveChatIdVO } from '../value-objects/primitives/live-chat-id.vo';
import { LiveChatStatusVO } from '../value-objects/primitives/live-chat-status.vo';
import { LiveChatTypeVO } from '../value-objects/primitives/live-chat-type.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { AgentIdVO } from '../value-objects/primitives/agent-id.vo';
import { MessageIdVO } from '../value-objects/primitives/message-id.vo';
import {
  ChatStartedEvent,
  AgentJoinedEvent,
  ChatEndedEvent,
} from '../events/live-chat.events';

export interface CreateLiveChatInput {
  readonly id: LiveChatIdVO;
  readonly userId: UserIdVO;
  readonly type: LiveChatTypeVO;
  readonly now: string;
}

export interface LiveChatSnapshot {
  readonly id: string;
  readonly userId: string;
  readonly type: string;
  readonly status: string;
  readonly agentId?: string;
  readonly messageIds: readonly string[];
  readonly startedAt: string;
  readonly endedAt?: string;
  readonly endedReason?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class LiveChatEntity extends AggregateRoot<LiveChatIdVO> {
  private readonly _userId: UserIdVO;
  private readonly _type: LiveChatTypeVO;
  private _status: LiveChatStatusVO;
  private _agentId?: AgentIdVO;
  private _messageIds: readonly MessageIdVO[];
  private readonly _startedAt: string;
  private _endedAt?: string;
  private _endedReason?: string;

  private constructor(
    id: LiveChatIdVO,
    userId: UserIdVO,
    type: LiveChatTypeVO,
    status: LiveChatStatusVO,
    startedAt: string,
    createdAt: string,
    updatedAt: string,
    agentId?: AgentIdVO,
  ) {
    super(id, createdAt, updatedAt);
    this._userId = userId;
    this._type = type;
    this._status = status;
    this._startedAt = startedAt;
    this._agentId = agentId;
    this._messageIds = Object.freeze([]);
  }

  static create(input: CreateLiveChatInput): LiveChatEntity {
    if (!input.id || !input.userId) {
      throw new ValidationError(
        'LiveChat requires id and userId',
        'liveChat',
      );
    }
    const now = input.now;
    const chat = new LiveChatEntity(
      input.id,
      input.userId,
      input.type,
      LiveChatStatusVO.create('active'),
      now,
      now,
      now,
    );
    chat.addDomainEvent(
      new ChatStartedEvent(input.id, input.userId, input.type.value, Date.parse(now)),
    );
    return chat;
  }

  static rehydrate(snapshot: LiveChatSnapshot): LiveChatEntity {
    const chat = new LiveChatEntity(
      LiveChatIdVO.create(snapshot.id),
      UserIdVO.create(snapshot.userId),
      LiveChatTypeVO.create(snapshot.type),
      LiveChatStatusVO.create(snapshot.status),
      snapshot.startedAt,
      snapshot.createdAt,
      snapshot.updatedAt,
      snapshot.agentId ? AgentIdVO.create(snapshot.agentId) : undefined,
    );
    chat._messageIds = Object.freeze(snapshot.messageIds.map((id) => MessageIdVO.create(id)));
    chat._endedAt = snapshot.endedAt;
    chat._endedReason = snapshot.endedReason;
    return chat;
  }

  get userId(): UserIdVO {
    return this._userId;
  }

  get type(): LiveChatTypeVO {
    return this._type;
  }

  get status(): LiveChatStatusVO {
    return this._status;
  }

  get agentId(): AgentIdVO | undefined {
    return this._agentId;
  }

  get startedAt(): string {
    return this._startedAt;
  }

  get messageCount(): number {
    return this._messageIds.length;
  }

  get isActive(): boolean {
    return this._status.isActive();
  }

  get isTerminal(): boolean {
    return this._status.isTerminal();
  }

  get hasAgent(): boolean {
    return this._agentId !== undefined;
  }

  get isBotInvolved(): boolean {
    return this._type.isBotInvolved();
  }

  assignAgent(agentId: AgentIdVO, now: string): void {
    if (!this.isActive) {
      throw new BusinessRuleError(
        'Cannot assign agent to a terminal chat',
        'liveChat.terminal',
      );
    }
    if (this._agentId?.equals(agentId)) {
      throw new BusinessRuleError(
        'Agent already assigned',
        'liveChat.agent.duplicate',
      );
    }
    this._agentId = agentId;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
    this.addDomainEvent(
      new AgentJoinedEvent(this.id, agentId, Date.parse(now), this.version + 1),
    );
  }

  appendMessage(messageId: MessageIdVO, now: string): void {
    if (!this.isActive) {
      throw new BusinessRuleError(
        'Cannot add message to a terminal chat',
        'liveChat.terminal',
      );
    }
    if (this._messageIds.some((m) => m.equals(messageId))) return;
    this._messageIds = Object.freeze([...this._messageIds, messageId]);
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  end(reason: string | undefined, now: string): void {
    if (this.isTerminal) {
      throw new BusinessRuleError(
        'LiveChat already ended',
        'liveChat.already.ended',
      );
    }
    const durationMinutes = Math.round(
      (Date.parse(now) - Date.parse(this._startedAt)) / (1000 * 60),
    );
    this._status = LiveChatStatusVO.create('ended');
    this._endedAt = now;
    this._endedReason = reason;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
    this.addDomainEvent(
      new ChatEndedEvent(this.id, Date.parse(now), reason, durationMinutes, this.version + 1),
    );
  }

  toSnapshot(): LiveChatSnapshot {
    return {
      id: this.id.value,
      userId: this._userId.value,
      type: this._type.value,
      status: this._status.value,
      agentId: this._agentId?.value,
      messageIds: this._messageIds.map((m) => m.value),
      startedAt: this._startedAt,
      endedAt: this._endedAt,
      endedReason: this._endedReason,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
