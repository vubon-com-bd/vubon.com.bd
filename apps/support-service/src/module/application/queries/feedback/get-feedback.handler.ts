/**
 * GetFeedbackHandler
 * @module support-service/application/queries/feedback
 */
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetFeedbackQuery } from './get-feedback.query';
import type { FeedbackResponseDTO } from '../../dtos/responses/feedback-response.dto';
import type { FeedbackServiceInterface } from '../../services/interfaces/feedback.service.interface';

export class GetFeedbackHandler extends BaseQueryHandler<
  GetFeedbackQuery,
  FeedbackResponseDTO
> {
  readonly queryType = 'support.feedback.get';

  constructor(private readonly feedbackService: FeedbackServiceInterface) {
    super();
  }

  async execute(query: GetFeedbackQuery): Promise<FeedbackResponseDTO> {
    return this.feedbackService.getById(query.feedbackId);
  }
}
