import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ChatbotIntentIdVO } from '../primitives/chatbot-intent-id.vo';

export interface ChatbotIntentProps {
  readonly id: ChatbotIntentIdVO;
  readonly name: string;
  readonly patterns: ReadonlyArray<string>;
  readonly response: string;
}

export class ChatbotIntentVO extends BaseVO<ChatbotIntentProps> {
  private constructor(props: ChatbotIntentProps) {
    super(Object.freeze({
      ...props,
      patterns: Object.freeze([...props.patterns]),
    }));
  }

  static create(props: ChatbotIntentProps): ChatbotIntentVO {
    return new ChatbotIntentVO(props);
  }

  get id(): ChatbotIntentIdVO { return this.value.id; }
  get name(): string { return this.value.name; }
  get patterns(): ReadonlyArray<string> { return this.value.patterns; }
  get response(): string { return this.value.response; }
}
