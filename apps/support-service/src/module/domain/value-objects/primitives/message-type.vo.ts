/**
 * MessageTypeVO — Message content type
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseTypeVO
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { MESSAGE_TYPE } from '@vubon/shared-constants/support';

export type MessageTypeValue =
  (typeof MESSAGE_TYPE)[keyof typeof MESSAGE_TYPE];

const TYPE_SET: ReadonlySet<string> = new Set(Object.values(MESSAGE_TYPE));

const MEDIA_TYPES: ReadonlySet<string> = new Set<string>([
  'image' as string,
  'file' as string,
  'video' as string,
  'audio' as string,
]);

export class MessageTypeVO extends BaseTypeVO<MessageTypeValue> {
  private constructor(value: MessageTypeValue) {
    super(value);
  }

  protected static allowedValues(): ReadonlySet<string> {
    return TYPE_SET;
  }

  static create(raw: string): MessageTypeVO {
    const normalized = raw.trim().toLowerCase();
    if (!TYPE_SET.has(normalized)) {
      throw new ValidationError(
        `Invalid message type: ${raw}`,
        'messageType',
      );
    }
    return new MessageTypeVO(normalized as MessageTypeValue);
  }

  static text(): MessageTypeVO {
    return new MessageTypeVO('text' as MessageTypeValue);
  }

  isMedia(): boolean {
    return MEDIA_TYPES.has(this.value);
  }

  isText(): boolean {
    return this.value === 'text';
  }
}
