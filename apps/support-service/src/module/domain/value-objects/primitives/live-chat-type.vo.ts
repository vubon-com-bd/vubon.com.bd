/**
 * LiveChatTypeVO — Live chat channel type
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseTypeVO
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { CHATBOT_TYPE } from '@vubon/shared-constants/support';

export type LiveChatTypeValue =
  | 'human'
  | 'chatbot'
  | 'hybrid';

const TYPE_SET: ReadonlySet<string> = new Set(['human', 'chatbot', 'hybrid']);

export class LiveChatTypeVO extends BaseTypeVO<LiveChatTypeValue> {
  private constructor(value: LiveChatTypeValue) {
    super(value);
  }

  protected static allowedValues(): ReadonlySet<string> {
    return TYPE_SET;
  }

  static create(raw: string): LiveChatTypeVO {
    const normalized = raw.trim().toLowerCase();
    if (!TYPE_SET.has(normalized)) {
      throw new ValidationError(
        `Invalid live chat type: ${raw}`,
        'liveChatType',
      );
    }
    return new LiveChatTypeVO(normalized as LiveChatTypeValue);
  }

  static human(): LiveChatTypeVO {
    return new LiveChatTypeVO('human');
  }

  isBotInvolved(): boolean {
    return this.value === 'chatbot' || this.value === 'hybrid';
  }

  // Reference CHATBOT_TYPE to satisfy import contract
  static get knownChatbotTypes(): readonly string[] {
    return Object.values(CHATBOT_TYPE);
  }
}
