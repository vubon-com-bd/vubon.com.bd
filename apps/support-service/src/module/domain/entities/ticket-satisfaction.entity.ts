/**
 * TicketSatisfactionEntity — CSAT rating for a ticket
 * @module support-service/domain/entities
 *
 * Registry: extends BaseEntity<TicketSatisfactionIdVO>
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { TicketSatisfactionIdVO } from '../value-objects/primitives/ticket-satisfaction-id.vo';
import { SatisfactionScoreVO } from '../value-objects/primitives/satisfaction-score.vo';
import { SatisfactionCommentVO } from '../value-objects/primitives/satisfaction-comment.vo';
import { TicketIdVO } from '../value-objects/primitives/ticket-id.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface CreateTicketSatisfactionInput {
  readonly id: TicketSatisfactionIdVO;
  readonly ticketId: TicketIdVO;
  readonly score: SatisfactionScoreVO;
  readonly userId: UserIdVO;
  readonly comment?: SatisfactionCommentVO;
  readonly now: string;
}

export interface TicketSatisfactionSnapshot {
  readonly id: string;
  readonly ticketId: string;
  readonly score: number;
  readonly userId: string;
  readonly comment?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class TicketSatisfactionEntity extends BaseEntity<TicketSatisfactionIdVO> {
  private readonly _ticketId: TicketIdVO;
  private readonly _score: SatisfactionScoreVO;
  private readonly _userId: UserIdVO;
  private readonly _comment?: SatisfactionCommentVO;

  private constructor(
    id: TicketSatisfactionIdVO,
    ticketId: TicketIdVO,
    score: SatisfactionScoreVO,
    userId: UserIdVO,
    createdAt: string,
    updatedAt: string,
    comment?: SatisfactionCommentVO,
  ) {
    super(id, createdAt, updatedAt);
    this._ticketId = ticketId;
    this._score = score;
    this._userId = userId;
    this._comment = comment;
  }

  static create(input: CreateTicketSatisfactionInput): TicketSatisfactionEntity {
    if (!input.id || !input.ticketId || !input.userId) {
      throw new ValidationError(
        'TicketSatisfaction requires id, ticketId, userId',
        'ticketSatisfaction',
      );
    }
    if (input.score.isNegative && !input.comment) {
      throw new BusinessRuleError(
        'Negative ratings require a comment',
        'ticketSatisfaction.negative.requires.comment',
      );
    }
    const now = input.now;
    return new TicketSatisfactionEntity(
      input.id,
      input.ticketId,
      input.score,
      input.userId,
      now,
      now,
      input.comment,
    );
  }

  static rehydrate(snapshot: TicketSatisfactionSnapshot): TicketSatisfactionEntity {
    return new TicketSatisfactionEntity(
      TicketSatisfactionIdVO.create(snapshot.id),
      TicketIdVO.create(snapshot.ticketId),
      SatisfactionScoreVO.create(snapshot.score),
      UserIdVO.create(snapshot.userId),
      snapshot.createdAt,
      snapshot.updatedAt,
      snapshot.comment ? SatisfactionCommentVO.create(snapshot.comment) : undefined,
    );
  }

  get ticketId(): TicketIdVO {
    return this._ticketId;
  }

  get score(): SatisfactionScoreVO {
    return this._score;
  }

  get userId(): UserIdVO {
    return this._userId;
  }

  get comment(): SatisfactionCommentVO | undefined {
    return this._comment;
  }

  get isPositive(): boolean {
    return this._score.isPositive;
  }

  get isNegative(): boolean {
    return this._score.isNegative;
  }

  get hasComment(): boolean {
    return this._comment !== undefined && !this._comment.isEmpty;
  }

  toSnapshot(): TicketSatisfactionSnapshot {
    return {
      id: this.id.value,
      ticketId: this._ticketId.value,
      score: this._score.value,
      userId: this._userId.value,
      comment: this._comment?.value,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
