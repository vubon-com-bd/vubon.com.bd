import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ChatbotEntityIdVO } from '../primitives/chatbot-entity-id.vo';

export interface ChatbotEntityVOProps {
  readonly id: ChatbotEntityIdVO;
  readonly name: string;
  readonly entityType: string;
  readonly entityValue: string;
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
  get entityType(): string { return this.value.entityType; }
  get entityValue(): string { return this.value.entityValue; }
}
