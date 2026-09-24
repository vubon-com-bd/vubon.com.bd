import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { MessageIdVO } from '../primitives/message-id.vo';
import { MessageContentVO } from '../primitives/message-content.vo';
import { MessageTypeVO } from '../primitives/message-type.vo';
import { UserIdVO } from '../primitives/user-id.vo';

export interface ChatMessageProps {
  readonly id: MessageIdVO;
  readonly senderId: UserIdVO;
  readonly content: MessageContentVO;
  readonly type: MessageTypeVO;
  readonly sentAt: Date;
}

export class ChatMessageVO extends BaseVO<ChatMessageProps> {
  private constructor(props: ChatMessageProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: ChatMessageProps): ChatMessageVO {
    return new ChatMessageVO(props);
  }

  get id(): MessageIdVO { return this.value.id; }
  get senderId(): UserIdVO { return this.value.senderId; }
  get content(): MessageContentVO { return this.value.content; }
  get type(): MessageTypeVO { return this.value.type; }
  get sentAt(): Date { return this.value.sentAt; }
}
