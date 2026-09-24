import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';
import { MESSAGE_STATUS } from '@vubon/shared-constants/support';

const VALID = new Set<string>(Object.values(MESSAGE_STATUS));

export class MessageStatusVO extends BaseStatusVO<string> {
  static create(value: string): MessageStatusVO {
    if (!VALID.has(value)) {
      throw new Error(`Invalid message status: ${value}`);
    }
    return new MessageStatusVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
