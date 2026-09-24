import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class ConversationIdVO extends BaseIdVO {
  static create(value: string): ConversationIdVO {
    return new ConversationIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
