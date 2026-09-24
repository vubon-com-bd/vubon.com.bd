import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class ChatbotIdVO extends BaseIdVO {
  static create(value: string): ChatbotIdVO {
    return new ChatbotIdVO(value);
  }
  private constructor(value: string) {
    super(value);
  }
}
