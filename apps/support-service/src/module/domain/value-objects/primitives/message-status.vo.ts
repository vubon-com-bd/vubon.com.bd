/**
 * MessageStatusVO — Message delivery/read status
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseStatusVO
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { MESSAGE_STATUS } from '@vubon/shared-constants/support';

export type MessageStatusValue =
  (typeof MESSAGE_STATUS)[keyof typeof MESSAGE_STATUS];

const STATUS_SET: ReadonlySet<string> = new Set(
  Object.values(MESSAGE_STATUS),
);

export class MessageStatusVO extends BaseStatusVO<MessageStatusValue> {
  private constructor(value: MessageStatusValue) {
    super(value);
  }

  protected static allowedValues(): ReadonlySet<string> {
    return STATUS_SET;
  }

  static create(raw: string): MessageStatusVO {
    const normalized = raw.trim().toLowerCase();
    if (!STATUS_SET.has(normalized)) {
      throw new ValidationError(
        `Invalid message status: ${raw}`,
        'messageStatus',
      );
    }
    return new MessageStatusVO(normalized as MessageStatusValue);
  }

  isDelivered(): boolean {
    return (
      this.value === ('delivered' as MessageStatusValue) ||
      this.value === ('read' as MessageStatusValue)
    );
  }

  isRead(): boolean {
    return this.value === ('read' as MessageStatusValue);
  }

  isFailed(): boolean {
    return this.value === ('failed' as MessageStatusValue);
  }
}
