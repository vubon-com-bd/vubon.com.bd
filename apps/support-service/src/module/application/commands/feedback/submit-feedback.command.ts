/**
 * SubmitFeedbackCommand
 * @module support-service/application/commands/feedback
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { SubmitFeedbackRequestDTO } from '../../dtos/requests/feedback/submit-feedback.dto';

export class SubmitFeedbackCommand extends BaseCommand {
  readonly type = 'support.feedback.submit';

  constructor(public readonly payload: SubmitFeedbackRequestDTO) {
    super();
  }
}
