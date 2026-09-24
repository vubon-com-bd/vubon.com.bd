import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { TicketSatisfactionIdVO } from '../value-objects/primitives/ticket-satisfaction-id.vo';
import { SatisfactionScoreVO } from '../value-objects/primitives/satisfaction-score.vo';
import { SatisfactionCommentVO } from '../value-objects/primitives/satisfaction-comment.vo';
import { TicketIdVO } from '../value-objects/primitives/ticket-id.vo';

export interface TicketSatisfactionEntityProps {
  readonly ticketId: TicketIdVO;
  readonly score: SatisfactionScoreVO;
  readonly comment: SatisfactionCommentVO | null;
}

export class TicketSatisfactionEntity extends BaseEntity<TicketSatisfactionIdVO> {
  private readonly _ticketId: TicketIdVO;
  private readonly _score: SatisfactionScoreVO;
  private readonly _comment: SatisfactionCommentVO | null;

  private constructor(
    id: TicketSatisfactionIdVO,
    props: TicketSatisfactionEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._ticketId = props.ticketId;
    this._score = props.score;
    this._comment = props.comment;
  }

  static create(props: TicketSatisfactionEntityProps): TicketSatisfactionEntity {
    const now = new Date().toISOString();
    const id = TicketSatisfactionIdVO.create(crypto.randomUUID());
    return new TicketSatisfactionEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: TicketSatisfactionIdVO,
    props: TicketSatisfactionEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): TicketSatisfactionEntity {
    return new TicketSatisfactionEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get ticketId(): TicketIdVO { return this._ticketId; }
  get score(): SatisfactionScoreVO { return this._score; }
  get comment(): SatisfactionCommentVO | null { return this._comment; }
}
