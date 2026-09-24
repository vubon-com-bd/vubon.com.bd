import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ChatbotIdVO } from '../primitives/chatbot-id.vo';
import { ChatbotStatusVO } from '../primitives/chatbot-status.vo';
import { ChatbotTypeVO } from '../primitives/chatbot-type.vo';

export interface ChatbotProps {
  readonly id: ChatbotIdVO;
  readonly name: string;
  readonly status: ChatbotStatusVO;
  readonly type: ChatbotTypeVO;
}

export class ChatbotVO extends BaseVO<ChatbotProps> {
  private constructor(props: ChatbotProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: ChatbotProps): ChatbotVO {
    return new ChatbotVO(props);
  }

  get id(): ChatbotIdVO { return this.value.id; }
  get name(): string { return this.value.name; }
  get status(): ChatbotStatusVO { return this.value.status; }
  get type(): ChatbotTypeVO { return this.value.type; }
}
