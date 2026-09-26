/**
 * ConversationTypeVO — Conversation channel type
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseTypeVO
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { CONVERSATION_TYPE } from '@vubon/shared-constants/support';

export type ConversationTypeValue =
  (typeof CONVERSATION_TYPE)[keyof typeof CONVERSATION_TYPE];

const TYPE_SET: ReadonlySet<string> = new Set(
  Object.values(CONVERSATION_TYPE),
);

const REALTIME_TYPES: ReadonlySet<string> = new Set<string>([
  'chat' as string,
  'live_chat' as string,
]);

export class ConversationTypeVO extends BaseTypeVO<ConversationTypeValue> {
  private constructor(value: ConversationTypeValue) {
    super(value);
  }

  protected static allowedValues(): ReadonlySet<string> {
    return TYPE_SET;
  }

  static create(raw: string): ConversationTypeVO {
    const normalized = raw.trim().toLowerCase();
    if (!TYPE_SET.has(normalized)) {
      throw new ValidationError(
        `Invalid conversation type: ${raw}`,
        'conversationType',
      );
    }
    return new ConversationTypeVO(normalized as ConversationTypeValue);
  }

  isRealtime(): boolean {
    return REALTIME_TYPES.has(this.value);
  }
}
