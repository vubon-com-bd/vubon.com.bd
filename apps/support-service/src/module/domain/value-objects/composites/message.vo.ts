/**
 * MessageVO — Generic message composite
 * @module support-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { MessageIdVO } from '../primitives/message-id.vo';
import { MessageContentVO } from '../primitives/message-content.vo';
import { MessageTypeVO } from '../primitives/message-type.vo';
import { MessageStatusVO } from '../primitives/message-status.vo';

export interface MessageVOProps {
  readonly id: MessageIdVO;
  readonly content: MessageContentVO;
  readonly type: MessageTypeVO;
  readonly status?: MessageStatusVO;
}

export class MessageVO extends BaseVO<Readonly<MessageVOProps>> {
  private constructor(props: MessageVOProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: MessageVOProps): MessageVO {
    if (!props.id || !props.content || !props.type) {
      throw new ValidationError(
        'MessageVO requires id, content, type',
        'message',
      );
    }
    return new MessageVO(props);
  }

  get id(): MessageIdVO {
    return this.value.id;
  }

  get content(): MessageContentVO {
    return this.value.content;
  }

  get type(): MessageTypeVO {
    return this.value.type;
  }

  get isText(): boolean {
    return this.value.type.isText();
  }

  get isMedia(): boolean {
    return this.value.type.isMedia();
  }

  get sanitized(): string {
    return this.value.content.sanitized;
  }
}
