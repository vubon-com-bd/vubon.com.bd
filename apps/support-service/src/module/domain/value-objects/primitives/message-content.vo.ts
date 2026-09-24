import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

export class MessageContentVO extends BaseCodeVO {
  static create(value: string): MessageContentVO {
    BaseCodeVO.validateNonEmpty(value, 'MessageContent');
    const trimmed = value.trim();
    if (trimmed.length > 10000) {
      throw new Error('Message content exceeds 10000 characters');
    }
    return new MessageContentVO(trimmed);
  }

  private constructor(value: string) {
    super(value);
  }
}
