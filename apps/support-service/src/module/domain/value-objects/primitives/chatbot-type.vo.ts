import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { CHATBOT_TYPE } from '@vubon/shared-constants/support';

const VALID = new Set<string>(Object.values(CHATBOT_TYPE));

export class ChatbotTypeVO extends BaseTypeVO<string> {
  static create(value: string): ChatbotTypeVO {
    if (!VALID.has(value)) {
      throw new Error(`Invalid chatbot type: ${value}`);
    }
    return new ChatbotTypeVO(value);
  }
  private constructor(value: string) {
    super(value);
  }
}
