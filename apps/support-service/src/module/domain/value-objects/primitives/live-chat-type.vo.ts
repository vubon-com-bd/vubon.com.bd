import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { LIVE_CHAT_TRIGGER } from '@vubon/shared-constants/support';

const VALID = new Set<string>(Object.values(LIVE_CHAT_TRIGGER));

export class LiveChatTypeVO extends BaseTypeVO<string> {
  static create(value: string): LiveChatTypeVO {
    if (!VALID.has(value)) {
      throw new Error(`Invalid live chat type: ${value}`);
    }
    return new LiveChatTypeVO(value);
  }
  private constructor(value: string) {
    super(value);
  }
}
