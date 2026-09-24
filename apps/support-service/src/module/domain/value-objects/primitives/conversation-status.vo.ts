import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';
import { CONVERSATION_STATUS } from '@vubon/shared-constants/support';

const VALID = new Set<string>(Object.values(CONVERSATION_STATUS));

export class ConversationStatusVO extends BaseStatusVO<string> {
  static create(value: string): ConversationStatusVO {
    if (!VALID.has(value)) {
      throw new Error(`Invalid conversation status: ${value}`);
    }
    return new ConversationStatusVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
