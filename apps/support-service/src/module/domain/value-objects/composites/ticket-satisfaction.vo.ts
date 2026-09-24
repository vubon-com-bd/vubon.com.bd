import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { TicketSatisfactionIdVO } from '../primitives/ticket-satisfaction-id.vo';
import { SatisfactionScoreVO } from '../primitives/satisfaction-score.vo';
import { SatisfactionCommentVO } from '../primitives/satisfaction-comment.vo';
import { TicketIdVO } from '../primitives/ticket-id.vo';

export interface TicketSatisfactionProps {
  readonly id: TicketSatisfactionIdVO;
  readonly ticketId: TicketIdVO;
  readonly score: SatisfactionScoreVO;
  readonly comment: SatisfactionCommentVO | null;
  readonly createdAt: Date;
}

export class TicketSatisfactionVO extends BaseVO<TicketSatisfactionProps> {
  private constructor(props: TicketSatisfactionProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: TicketSatisfactionProps): TicketSatisfactionVO {
    return new TicketSatisfactionVO(props);
  }

  get id(): TicketSatisfactionIdVO { return this.value.id; }
  get ticketId(): TicketIdVO { return this.value.ticketId; }
  get score(): SatisfactionScoreVO { return this.value.score; }
  get comment(): SatisfactionCommentVO | null { return this.value.comment; }
  get createdAt(): Date { return this.value.createdAt; }
}
