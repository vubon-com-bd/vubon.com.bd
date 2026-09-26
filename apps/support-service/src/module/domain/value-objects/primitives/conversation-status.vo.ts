/**
 * ConversationStatusVO — Conversation lifecycle status
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseStatusVO
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { CONVERSATION_STATUS } from '@vubon/shared-constants/support';

export type ConversationStatusValue =
  (typeof CONVERSATION_STATUS)[keyof typeof CONVERSATION_STATUS];

const STATUS_SET: ReadonlySet<string> = new Set(
  Object.values(CONVERSATION_STATUS),
);

const TERMINAL: ReadonlySet<string> = new Set<string>([
  'closed' as string,
  'ended' as string,
]);

export class ConversationStatusVO extends BaseStatusVO<ConversationStatusValue> {
  private constructor(value: ConversationStatusValue) {
    super(value);
  }

  protected static allowedValues(): ReadonlySet<string> {
    return STATUS_SET;
  }

  static create(raw: string): ConversationStatusVO {
    const normalized = raw.trim().toLowerCase();
    if (!STATUS_SET.has(normalized)) {
      throw new ValidationError(
        `Invalid conversation status: ${raw}`,
        'conversationStatus',
      );
    }
    return new ConversationStatusVO(normalized as ConversationStatusValue);
  }

  isTerminal(): boolean {
    return TERMINAL.has(this.value);
  }

  canAcceptMessages(): boolean {
    return !this.isTerminal();
  }
}
