import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';
import { CHATBOT_STATUS } from '@vubon/shared-constants/support';

const VALID = new Set<string>(Object.values(CHATBOT_STATUS));

export class ChatbotStatusVO extends BaseStatusVO<string> {
  static create(value: string): ChatbotStatusVO {
    if (!VALID.has(value)) {
      throw new Error(`Invalid chatbot status: ${value}`);
    }
    return new ChatbotStatusVO(value);
  }
  private constructor(value: string) {
    super(value);
  }
}
