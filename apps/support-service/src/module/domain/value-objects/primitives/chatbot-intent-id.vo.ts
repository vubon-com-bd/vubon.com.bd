import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class ChatbotIntentIdVO extends BaseIdVO {
  static create(value: string): ChatbotIntentIdVO {
    return new ChatbotIntentIdVO(value);
  }
  private constructor(value: string) {
    super(value);
  }
}
