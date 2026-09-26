/**
 * TicketMessageVO — Composite view of a ticket message
 * @module support-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { MessageIdVO } from '../primitives/message-id.vo';
import { MessageContentVO } from '../primitives/message-content.vo';
import { MessageTypeVO } from '../primitives/message-type.vo';
import { MessageStatusVO } from '../primitives/message-status.vo';
import { UserIdVO } from '../primitives/user-id.vo';

export interface TicketMessageVOProps {
  readonly id: MessageIdVO;
  readonly content: MessageContentVO;
  readonly type: MessageTypeVO;
  readonly status: MessageStatusVO;
  readonly authorId: UserIdVO;
  readonly isInternal?: boolean;
}

export class TicketMessageVO extends BaseVO<Readonly<TicketMessageVOProps>> {
  private constructor(props: TicketMessageVOProps) {
    super(Object.freeze({ ...props, isInternal: props.isInternal ?? false }));
  }

  static create(props: TicketMessageVOProps): TicketMessageVO {
    if (!props.id || !props.content || !props.authorId) {
      throw new ValidationError(
        'TicketMessageVO requires id, content, authorId',
        'ticketMessage',
      );
    }
    return new TicketMessageVO(props);
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

  get authorId(): UserIdVO {
    return this.value.authorId;
  }

  get isInternal(): boolean {
    return this.value.isInternal === true;
  }

  get isMedia(): boolean {
    return this.value.type.isMedia();
  }

  get isDelivered(): boolean {
    return this.value.status.isDelivered();
  }
}
