import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class ChatbotEntityIdVO extends BaseIdVO {
  static create(value: string): ChatbotEntityIdVO {
    return new ChatbotEntityIdVO(value);
  }
  private constructor(value: string) {
    super(value);
  }
}
