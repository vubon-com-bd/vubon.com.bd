/**
 * LiveChatStatusVO — Live chat session status
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseStatusVO
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { LIVE_CHAT_STATUS } from '@vubon/shared-constants/support';

export type LiveChatStatusValue =
  (typeof LIVE_CHAT_STATUS)[keyof typeof LIVE_CHAT_STATUS];

const STATUS_SET: ReadonlySet<string> = new Set(
  Object.values(LIVE_CHAT_STATUS),
);

const ACTIVE: ReadonlySet<string> = new Set<string>(['active', 'in_progress']);
const TERMINAL: ReadonlySet<string> = new Set<string>(['ended', 'closed']);

export class LiveChatStatusVO extends BaseStatusVO<LiveChatStatusValue> {
  private constructor(value: LiveChatStatusValue) {
    super(value);
  }

  protected static allowedValues(): ReadonlySet<string> {
    return STATUS_SET;
  }

  static create(raw: string): LiveChatStatusVO {
    const normalized = raw.trim().toLowerCase();
    if (!STATUS_SET.has(normalized)) {
      throw new ValidationError(
        `Invalid live chat status: ${raw}`,
        'liveChatStatus',
      );
    }
    return new LiveChatStatusVO(normalized as LiveChatStatusValue);
  }

  isActive(): boolean {
    return ACTIVE.has(this.value);
  }

  isTerminal(): boolean {
    return TERMINAL.has(this.value);
  }

  canAcceptMessages(): boolean {
    return !this.isTerminal();
  }
}
