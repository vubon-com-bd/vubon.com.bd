import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { MessageIdVO } from '../primitives/message-id.vo';
import { MessageContentVO } from '../primitives/message-content.vo';
import { MessageTypeVO } from '../primitives/message-type.vo';
import { MessageStatusVO } from '../primitives/message-status.vo';
import { ConversationIdVO } from '../primitives/conversation-id.vo';
import { UserIdVO } from '../primitives/user-id.vo';

export interface MessageProps {
  readonly id: MessageIdVO;
  readonly conversationId: ConversationIdVO;
  readonly senderId: UserIdVO;
  readonly content: MessageContentVO;
  readonly type: MessageTypeVO;
  readonly status: MessageStatusVO;
  readonly createdAt: Date;
}

export class MessageVO extends BaseVO<MessageProps> {
  private constructor(props: MessageProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: MessageProps): MessageVO {
    return new MessageVO(props);
  }

  get id(): MessageIdVO { return this.value.id; }
  get conversationId(): ConversationIdVO { return this.value.conversationId; }
  get senderId(): UserIdVO { return this.value.senderId; }
  get content(): MessageContentVO { return this.value.content; }
  get type(): MessageTypeVO { return this.value.type; }
  get status(): MessageStatusVO { return this.value.status; }
  get createdAt(): Date { return this.value.createdAt; }
}
