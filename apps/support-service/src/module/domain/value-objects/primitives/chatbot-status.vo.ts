/**
 * ChatbotStatusVO — Chatbot operational status
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseStatusVO
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { CHATBOT_STATUS } from '@vubon/shared-constants/support';

export type ChatbotStatusValue =
  (typeof CHATBOT_STATUS)[keyof typeof CHATBOT_STATUS];

const STATUS_SET: ReadonlySet<string> = new Set(
  Object.values(CHATBOT_STATUS),
);

const RUNNING: ReadonlySet<string> = new Set<string>(['active', 'online']);

export class ChatbotStatusVO extends BaseStatusVO<ChatbotStatusValue> {
  private constructor(value: ChatbotStatusValue) {
    super(value);
  }

  protected static allowedValues(): ReadonlySet<string> {
    return STATUS_SET;
  }

  static create(raw: string): ChatbotStatusVO {
    const normalized = raw.trim().toLowerCase();
    if (!STATUS_SET.has(normalized)) {
      throw new ValidationError(
        `Invalid chatbot status: ${raw}`,
        'chatbotStatus',
      );
    }
    return new ChatbotStatusVO(normalized as ChatbotStatusValue);
  }

  isOperational(): boolean {
    return RUNNING.has(this.value);
  }
}
