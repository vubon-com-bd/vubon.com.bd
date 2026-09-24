import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class LiveChatIdVO extends BaseIdVO {
  static create(value: string): LiveChatIdVO {
    return new LiveChatIdVO(value);
  }
  private constructor(value: string) {
    super(value);
  }
}
