/**
 * ReviewFeedbackCommand
 * @module support-service/application/commands/feedback
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { ReviewFeedbackRequestDTO } from '../../dtos/requests/feedback/review-feedback.dto';

export class ReviewFeedbackCommand extends BaseCommand {
  readonly type = 'support.feedback.review';

  constructor(public readonly payload: ReviewFeedbackRequestDTO) {
    super();
  }
}
