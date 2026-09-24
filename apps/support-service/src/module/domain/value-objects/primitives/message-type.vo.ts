import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { MESSAGE_TYPE } from '@vubon/shared-constants/support';

const VALID = new Set<string>(Object.values(MESSAGE_TYPE));

export class MessageTypeVO extends BaseTypeVO<string> {
  static create(value: string): MessageTypeVO {
    if (!VALID.has(value)) {
      throw new Error(`Invalid message type: ${value}`);
    }
    return new MessageTypeVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
