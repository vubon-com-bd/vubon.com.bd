import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';
import { LIVE_CHAT_STATUS } from '@vubon/shared-constants/support';

const VALID = new Set<string>(Object.values(LIVE_CHAT_STATUS));

export class LiveChatStatusVO extends BaseStatusVO<string> {
  static create(value: string): LiveChatStatusVO {
    if (!VALID.has(value)) {
      throw new Error(`Invalid live chat status: ${value}`);
    }
    return new LiveChatStatusVO(value);
  }
  private constructor(value: string) {
    super(value);
  }
}
