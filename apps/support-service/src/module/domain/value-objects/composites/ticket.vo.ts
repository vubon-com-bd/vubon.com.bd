import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { TicketIdVO } from '../primitives/ticket-id.vo';
import { TicketNumberVO } from '../primitives/ticket-number.vo';
import { TicketSubjectVO } from '../primitives/ticket-subject.vo';
import { TicketStatusVO } from '../primitives/ticket-status.vo';
import { TicketPriorityVO } from '../primitives/ticket-priority.vo';
import { TicketTypeVO } from '../primitives/ticket-type.vo';
import { TicketChannelVO } from '../primitives/ticket-channel.vo';
import { UserIdVO } from '../primitives/user-id.vo';

export interface TicketProps {
  readonly id: TicketIdVO;
  readonly number: TicketNumberVO;
  readonly subject: TicketSubjectVO;
  readonly status: TicketStatusVO;
  readonly priority: TicketPriorityVO;
  readonly type: TicketTypeVO;
  readonly channel: TicketChannelVO;
  readonly userId: UserIdVO;
}

export class TicketVO extends BaseVO<TicketProps> {
  private constructor(props: TicketProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: TicketProps): TicketVO {
    return new TicketVO(props);
  }

  get id(): TicketIdVO { return this.value.id; }
  get number(): TicketNumberVO { return this.value.number; }
  get subject(): TicketSubjectVO { return this.value.subject; }
  get status(): TicketStatusVO { return this.value.status; }
  get priority(): TicketPriorityVO { return this.value.priority; }
  get type(): TicketTypeVO { return this.value.type; }
  get channel(): TicketChannelVO { return this.value.channel; }
  get userId(): UserIdVO { return this.value.userId; }
}
