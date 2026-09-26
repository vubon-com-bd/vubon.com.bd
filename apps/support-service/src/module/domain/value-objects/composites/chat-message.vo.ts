/**
 * ChatMessageVO — Composite for chat-specific message
 * @module support-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { MessageIdVO } from '../primitives/message-id.vo';
import { MessageContentVO } from '../primitives/message-content.vo';
import { MessageTypeVO } from '../primitives/message-type.vo';
import { LiveChatIdVO } from '../primitives/live-chat-id.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { AgentIdVO } from '../primitives/agent-id.vo';

export type ChatSender = 'user' | 'agent' | 'bot' | 'system';

export interface ChatMessageVOProps {
  readonly id: MessageIdVO;
  readonly chatId: LiveChatIdVO;
  readonly content: MessageContentVO;
  readonly type: MessageTypeVO;
  readonly sender: ChatSender;
  readonly senderUserId?: UserIdVO;
  readonly senderAgentId?: AgentIdVO;
  readonly sentAt: string;
}

export class ChatMessageVO extends BaseVO<Readonly<ChatMessageVOProps>> {
  private constructor(props: ChatMessageVOProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: ChatMessageVOProps): ChatMessageVO {
    if (!props.id || !props.chatId || !props.content || !props.sender) {
      throw new ValidationError(
        'ChatMessageVO requires id, chatId, content, sender',
        'chatMessage',
      );
    }
    if (typeof props.sentAt !== 'string' || props.sentAt.length === 0) {
      throw new ValidationError('ChatMessageVO sentAt required', 'chatMessage');
    }
    return new ChatMessageVO(props);
  }

  get id(): MessageIdVO {
    return this.value.id;
  }

  get chatId(): LiveChatIdVO {
    return this.value.chatId;
  }

  get content(): MessageContentVO {
    return this.value.content;
  }

  get sender(): ChatSender {
    return this.value.sender;
  }

  get isFromUser(): boolean {
    return this.value.sender === 'user';
  }

  get isFromAgent(): boolean {
    return this.value.sender === 'agent';
  }

  get isFromBot(): boolean {
    return this.value.sender === 'bot';
  }

  get isSystem(): boolean {
    return this.value.sender === 'system';
  }

  get isMedia(): boolean {
    return this.value.type.isMedia();
  }
}
