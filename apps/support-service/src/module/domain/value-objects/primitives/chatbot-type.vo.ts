/**
 * ChatbotTypeVO — Chatbot engine type
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseTypeVO
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { CHATBOT_TYPE } from '@vubon/shared-constants/support';

export type ChatbotTypeValue =
  (typeof CHATBOT_TYPE)[keyof typeof CHATBOT_TYPE];

const TYPE_SET: ReadonlySet<string> = new Set(
  Object.values(CHATBOT_TYPE),
);

const AI_POWERED: ReadonlySet<string> = new Set<string>(['ai', 'ml', 'nlp']);

export class ChatbotTypeVO extends BaseTypeVO<ChatbotTypeValue> {
  private constructor(value: ChatbotTypeValue) {
    super(value);
  }

  protected static allowedValues(): ReadonlySet<string> {
    return TYPE_SET;
  }

  static create(raw: string): ChatbotTypeVO {
    const normalized = raw.trim().toLowerCase();
    if (!TYPE_SET.has(normalized)) {
      throw new ValidationError(
        `Invalid chatbot type: ${raw}`,
        'chatbotType',
      );
    }
    return new ChatbotTypeVO(normalized as ChatbotTypeValue);
  }

  isAiPowered(): boolean {
    return AI_POWERED.has(this.value);
  }
}
