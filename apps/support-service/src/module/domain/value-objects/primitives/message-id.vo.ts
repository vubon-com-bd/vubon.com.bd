import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class MessageIdVO extends BaseIdVO {
  static create(value: string): MessageIdVO {
    return new MessageIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
