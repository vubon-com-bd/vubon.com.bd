/**
 * TicketSatisfactionVO — Composite view of a satisfaction survey result
 * @module support-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TicketSatisfactionIdVO } from '../primitives/ticket-satisfaction-id.vo';
import { SatisfactionScoreVO } from '../primitives/satisfaction-score.vo';
import { SatisfactionCommentVO } from '../primitives/satisfaction-comment.vo';
import { UserIdVO } from '../primitives/user-id.vo';

export interface TicketSatisfactionVOProps {
  readonly id: TicketSatisfactionIdVO;
  readonly score: SatisfactionScoreVO;
  readonly comment?: SatisfactionCommentVO;
  readonly submittedBy: UserIdVO;
}

export class TicketSatisfactionVO extends BaseVO<Readonly<TicketSatisfactionVOProps>> {
  private constructor(props: TicketSatisfactionVOProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: TicketSatisfactionVOProps): TicketSatisfactionVO {
    if (!props.id || !props.score || !props.submittedBy) {
      throw new ValidationError(
        'TicketSatisfactionVO requires id, score, submittedBy',
        'ticketSatisfaction',
      );
    }
    return new TicketSatisfactionVO(props);
  }

  get id(): TicketSatisfactionIdVO {
    return this.value.id;
  }

  get score(): SatisfactionScoreVO {
    return this.value.score;
  }

  get comment(): SatisfactionCommentVO | undefined {
    return this.value.comment;
  }

  get isPositive(): boolean {
    return this.value.score.isPositive;
  }

  get isNegative(): boolean {
    return this.value.score.isNegative;
  }

  get hasComment(): boolean {
    return (
      this.value.comment !== undefined &&
      !this.value.comment.isEmpty
    );
  }
}
