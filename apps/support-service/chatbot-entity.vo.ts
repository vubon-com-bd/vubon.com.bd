import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ChatbotEntityIdVO } from '../primitives/chatbot-entity-id.vo';

export interface ChatbotEntityVOProps {
  readonly id: ChatbotEntityIdVO;
  readonly name: string;
  readonly type: string;
  readonly value: string;
}

export class ChatbotEntityVO extends BaseVO<ChatbotEntityVOProps> {
  private constructor(props: ChatbotEntityVOProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: ChatbotEntityVOProps): ChatbotEntityVO {
    return new ChatbotEntityVO(props);
  }

  get id(): ChatbotEntityIdVO { return this.value.id; }
  get name(): string { return this.value.name; }
  get type(): string { return this.value.type; }
  get value(): string { return this.value.value; }
}
