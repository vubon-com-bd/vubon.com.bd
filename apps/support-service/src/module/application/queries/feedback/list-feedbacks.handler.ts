/**
 * ListFeedbacksHandler
 * @module support-service/application/queries/feedback
 */
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListFeedbacksQuery } from './list-feedbacks.query';
import type { FeedbackListResponseDTO } from '../../dtos/responses/feedback-list-response.dto';
import type { FeedbackServiceInterface } from '../../services/interfaces/feedback.service.interface';

export class ListFeedbacksHandler extends BaseQueryHandler<
  ListFeedbacksQuery,
  FeedbackListResponseDTO
> {
  readonly queryType = 'support.feedback.list';

  constructor(private readonly feedbackService: FeedbackServiceInterface) {
    super();
  }

  async execute(query: ListFeedbacksQuery): Promise<FeedbackListResponseDTO> {
    return this.feedbackService.list(query.page, query.limit);
  }
}
