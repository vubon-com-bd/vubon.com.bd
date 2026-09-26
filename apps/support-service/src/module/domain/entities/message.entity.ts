/**
 * MessageEntity — Generic message in a conversation
 * @module support-service/domain/entities
 *
 * Registry: extends BaseEntity<MessageIdVO>
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { MessageIdVO } from '../value-objects/primitives/message-id.vo';
import { MessageContentVO } from '../value-objects/primitives/message-content.vo';
import { MessageTypeVO } from '../value-objects/primitives/message-type.vo';
import { MessageStatusVO } from '../value-objects/primitives/message-status.vo';
import { ConversationIdVO } from '../value-objects/primitives/conversation-id.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { AgentIdVO } from '../value-objects/primitives/agent-id.vo';

export type MessageSenderKind = 'user' | 'agent' | 'system';

export interface CreateMessageInput {
  readonly id: MessageIdVO;
  readonly conversationId: ConversationIdVO;
  readonly content: MessageContentVO;
  readonly type: MessageTypeVO;
  readonly senderKind: MessageSenderKind;
  readonly senderUserId?: UserIdVO;
  readonly senderAgentId?: AgentIdVO;
  readonly now: string;
}

export interface MessageSnapshot {
  readonly id: string;
  readonly conversationId: string;
  readonly content: string;
  readonly type: string;
  readonly status: string;
  readonly senderKind: MessageSenderKind;
  readonly senderUserId?: string;
  readonly senderAgentId?: string;
  readonly readAt?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class MessageEntity extends BaseEntity<MessageIdVO> {
  private _content: MessageContentVO;
  private readonly _conversationId: ConversationIdVO;
  private readonly _type: MessageTypeVO;
  private _status: MessageStatusVO;
  private readonly _senderKind: MessageSenderKind;
  private readonly _senderUserId?: UserIdVO;
  private readonly _senderAgentId?: AgentIdVO;
  private _readAt?: string;

  private constructor(
    id: MessageIdVO,
    conversationId: ConversationIdVO,
    content: MessageContentVO,
    type: MessageTypeVO,
    status: MessageStatusVO,
    senderKind: MessageSenderKind,
    createdAt: string,
    updatedAt: string,
    senderUserId?: UserIdVO,
    senderAgentId?: AgentIdVO,
  ) {
    super(id, createdAt, updatedAt);
    this._conversationId = conversationId;
    this._content = content;
    this._type = type;
    this._status = status;
    this._senderKind = senderKind;
    this._senderUserId = senderUserId;
    this._senderAgentId = senderAgentId;
  }

  static create(input: CreateMessageInput): MessageEntity {
    if (!input.id || !input.conversationId) {
      throw new ValidationError(
        'Message requires id and conversationId',
        'message',
      );
    }
    if (input.senderKind === 'user' && !input.senderUserId) {
      throw new ValidationError(
        'User messages require senderUserId',
        'message',
      );
    }
    if (input.senderKind === 'agent' && !input.senderAgentId) {
      throw new ValidationError(
        'Agent messages require senderAgentId',
        'message',
      );
    }
    const now = input.now;
    return new MessageEntity(
      input.id,
      input.conversationId,
      input.content,
      input.type,
      MessageStatusVO.create('sent'),
      input.senderKind,
      now,
      now,
      input.senderUserId,
      input.senderAgentId,
    );
  }

  static rehydrate(snapshot: MessageSnapshot): MessageEntity {
    const message = new MessageEntity(
      MessageIdVO.create(snapshot.id),
      ConversationIdVO.create(snapshot.conversationId),
      MessageContentVO.create(snapshot.content),
      MessageTypeVO.create(snapshot.type),
      MessageStatusVO.create(snapshot.status),
      snapshot.senderKind,
      snapshot.createdAt,
      snapshot.updatedAt,
      snapshot.senderUserId ? UserIdVO.create(snapshot.senderUserId) : undefined,
      snapshot.senderAgentId ? AgentIdVO.create(snapshot.senderAgentId) : undefined,
    );
    message._readAt = snapshot.readAt;
    return message;
  }

  get conversationId(): ConversationIdVO {
    return this._conversationId;
  }

  get content(): MessageContentVO {
    return this._content;
  }

  get type(): MessageTypeVO {
    return this._type;
  }

  get senderKind(): MessageSenderKind {
    return this._senderKind;
  }

  get senderUserId(): UserIdVO | undefined {
    return this._senderUserId;
  }

  get senderAgentId(): AgentIdVO | undefined {
    return this._senderAgentId;
  }

  get isRead(): boolean {
    return this._readAt !== undefined;
  }

  get isFromUser(): boolean {
    return this._senderKind === 'user';
  }

  get isFromAgent(): boolean {
    return this._senderKind === 'agent';
  }

  markRead(now: string): void {
    if (this.isRead) return;
    this._readAt = now;
    this._status = MessageStatusVO.create('read');
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  edit(newContent: MessageContentVO, now: string): void {
    if (this.isRead) {
      throw new ValidationError('Read messages cannot be edited', 'message');
    }
    this._content = newContent;
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  toSnapshot(): MessageSnapshot {
    return {
      id: this.id.value,
      conversationId: this._conversationId.value,
      content: this._content.value,
      type: this._type.value,
      status: this._status.value,
      senderKind: this._senderKind,
      senderUserId: this._senderUserId?.value,
      senderAgentId: this._senderAgentId?.value,
      readAt: this._readAt,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
