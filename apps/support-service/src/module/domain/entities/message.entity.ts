import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { MessageIdVO } from '../value-objects/primitives/message-id.vo';
import { MessageContentVO } from '../value-objects/primitives/message-content.vo';
import { MessageTypeVO } from '../value-objects/primitives/message-type.vo';
import { MessageStatusVO } from '../value-objects/primitives/message-status.vo';
import { ConversationIdVO } from '../value-objects/primitives/conversation-id.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface MessageEntityProps {
  readonly conversationId: ConversationIdVO;
  readonly senderId: UserIdVO;
  readonly content: MessageContentVO;
  readonly type: MessageTypeVO;
  readonly status: MessageStatusVO;
}

export class MessageEntity extends BaseEntity<MessageIdVO> {
  private readonly _conversationId: ConversationIdVO;
  private readonly _senderId: UserIdVO;
  private readonly _content: MessageContentVO;
  private readonly _type: MessageTypeVO;
  private readonly _status: MessageStatusVO;

  private constructor(
    id: MessageIdVO,
    props: MessageEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._conversationId = props.conversationId;
    this._senderId = props.senderId;
    this._content = props.content;
    this._type = props.type;
    this._status = props.status;
  }

  static create(props: MessageEntityProps): MessageEntity {
    const now = new Date().toISOString();
    const id = MessageIdVO.create(crypto.randomUUID());
    return new MessageEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: MessageIdVO,
    props: MessageEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): MessageEntity {
    return new MessageEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get conversationId(): ConversationIdVO { return this._conversationId; }
  get senderId(): UserIdVO { return this._senderId; }
  get content(): MessageContentVO { return this._content; }
  get type(): MessageTypeVO { return this._type; }
  get status(): MessageStatusVO { return this._status; }
}
