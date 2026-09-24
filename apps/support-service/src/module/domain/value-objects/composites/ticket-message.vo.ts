import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { MessageIdVO } from '../primitives/message-id.vo';
import { MessageContentVO } from '../primitives/message-content.vo';
import { MessageTypeVO } from '../primitives/message-type.vo';
import { MessageStatusVO } from '../primitives/message-status.vo';
import { UserIdVO } from '../primitives/user-id.vo';

export interface TicketMessageProps {
  readonly id: MessageIdVO;
  readonly senderId: UserIdVO;
  readonly content: MessageContentVO;
  readonly type: MessageTypeVO;
  readonly status: MessageStatusVO;
  readonly isInternal: boolean;
}

export class TicketMessageVO extends BaseVO<TicketMessageProps> {
  private constructor(props: TicketMessageProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: TicketMessageProps): TicketMessageVO {
    return new TicketMessageVO(props);
  }

  get id(): MessageIdVO { return this.value.id; }
  get senderId(): UserIdVO { return this.value.senderId; }
  get content(): MessageContentVO { return this.value.content; }
  get type(): MessageTypeVO { return this.value.type; }
  get status(): MessageStatusVO { return this.value.status; }
  get isInternal(): boolean { return this.value.isInternal; }
}
